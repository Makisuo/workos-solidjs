import { render } from "@solidjs/testing-library";
import { createSignal, Show } from "solid-js";
import { describe, expect, it } from "vitest";
import { useAuth } from "./hook";
import { AuthKitProvider } from "./provider";

// Component that uses all auth methods
const FullTestComponent = () => {
	const auth = useAuth();
	const [message, setMessage] = createSignal("");

	const testMethods = async () => {
		// Test all methods exist
		if (typeof auth.signIn !== "function") setMessage("signIn not found");
		if (typeof auth.signUp !== "function") setMessage("signUp not found");
		if (typeof auth.signOut !== "function") setMessage("signOut not found");
		if (typeof auth.getUser !== "function") setMessage("getUser not found");
		if (typeof auth.getAccessToken !== "function")
			setMessage("getAccessToken not found");
		if (typeof auth.switchToOrganization !== "function")
			setMessage("switchToOrganization not found");

		// Test getUser returns expected type
		const user = auth.getUser();
		if (user !== null && typeof user !== "object") {
			setMessage("getUser returned unexpected type");
		}
	};

	testMethods();

	return (
		<div>
			<Show
				when={auth.isLoading}
				fallback={<div data-testid="ready">Ready</div>}
			>
				<div data-testid="loading">Loading</div>
			</Show>
			<div data-testid="message">{message()}</div>
			<div data-testid="permissions-count">{auth.permissions.length}</div>
			<div data-testid="flags-count">{auth.featureFlags.length}</div>
		</div>
	);
};

describe("Integration tests", () => {
	it("provides all auth methods through useAuth", () => {
		const { getByTestId } = render(() => (
			<AuthKitProvider clientId="test-client-id">
				<FullTestComponent />
			</AuthKitProvider>
		));

		// Check no error messages
		expect(getByTestId("message").textContent).toBe("");
	});

	it("provides reactive state properties", () => {
		const { getByTestId } = render(() => (
			<AuthKitProvider clientId="test-client-id">
				<FullTestComponent />
			</AuthKitProvider>
		));

		// Check state properties are accessible
		expect(getByTestId("permissions-count").textContent).toBe("0");
		expect(getByTestId("flags-count").textContent).toBe("0");
	});

	it("multiple components can use useAuth", () => {
		const Component1 = () => {
			const auth = useAuth();
			return <div data-testid="comp1-loading">{auth.isLoading.toString()}</div>;
		};

		const Component2 = () => {
			const auth = useAuth();
			return <div data-testid="comp2-loading">{auth.isLoading.toString()}</div>;
		};

		const { getByTestId } = render(() => (
			<AuthKitProvider clientId="test-client-id">
				<Component1 />
				<Component2 />
			</AuthKitProvider>
		));

		// Both components should receive state
		expect(getByTestId("comp1-loading")).toBeTruthy();
		expect(getByTestId("comp2-loading")).toBeTruthy();

		// They should have the same value
		expect(getByTestId("comp1-loading").textContent).toBe(
			getByTestId("comp2-loading").textContent,
		);
	});
});
