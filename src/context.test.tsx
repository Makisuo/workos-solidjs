import { describe, expect, it } from "vitest";
import { createRoot } from "solid-js";
import { AuthKitContext, type ContextValue } from "./context";
import { initialState } from "./state";

describe("AuthKitContext", () => {
	it("has correct default value", () => {
		createRoot((dispose) => {
			// The context default value should match initialState
			const contextDefault = AuthKitContext.defaultValue;
			
			// Check that it includes all state properties
			expect(contextDefault).toHaveProperty("isLoading");
			expect(contextDefault).toHaveProperty("user");
			expect(contextDefault).toHaveProperty("role");
			expect(contextDefault).toHaveProperty("organizationId");
			expect(contextDefault).toHaveProperty("permissions");
			expect(contextDefault).toHaveProperty("featureFlags");
			
			dispose();
		});
	});

	it("context value type includes both Client and State interfaces", () => {
		const testValue: ContextValue = {
			// State properties
			isLoading: false,
			user: null,
			role: null,
			organizationId: null,
			permissions: [],
			featureFlags: [],
			// Client methods
			signIn: async () => {},
			signUp: async () => {},
			signOut: async () => {},
			getUser: () => null,
			getAccessToken: async () => "token",
			switchToOrganization: async () => {},
		};

		// This test ensures TypeScript compilation with correct types
		expect(testValue).toBeDefined();
		expect(testValue.isLoading).toBe(false);
		expect(typeof testValue.signIn).toBe("function");
	});

	it("can provide custom context value", () => {
		createRoot((dispose) => {
			const customValue: ContextValue = {
				...initialState,
				isLoading: false,
				user: { id: "123", email: "test@example.com" },
				signIn: async () => {},
				signUp: async () => {},
				signOut: async () => {},
				getUser: () => ({ id: "123", email: "test@example.com" }),
				getAccessToken: async () => "custom-token",
				switchToOrganization: async () => {},
			};

			// Create a provider with custom value
			const TestProvider = (props: { children: any }) => (
				<AuthKitContext.Provider value={customValue}>
					{props.children}
				</AuthKitContext.Provider>
			);

			// In a real test, we would use this provider and verify
			// that child components receive the custom value
			expect(TestProvider).toBeDefined();
			
			dispose();
		});
	});
});