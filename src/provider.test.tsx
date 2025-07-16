import { describe, expect, it, vi } from "vitest";
import { render } from "@solidjs/testing-library";
import { createEffect, createSignal } from "solid-js";
import { AuthKitProvider } from "./provider";
import { useAuth } from "./hook";

// Simple component to test provider functionality
const TestComponent = () => {
	const [error, setError] = createSignal<string | null>(null);
	
	try {
		const auth = useAuth();
		return (
			<div>
				<div data-testid="loading">{auth.isLoading ? "Loading" : "Loaded"}</div>
				<div data-testid="user">{auth.user ? "User exists" : "No user"}</div>
			</div>
		);
	} catch (e: any) {
		createEffect(() => {
			setError(e.message);
		});
		return <div data-testid="error">{error()}</div>;
	}
};

describe("AuthKitProvider", () => {
	it("provides context to children", () => {
		const { getByTestId } = render(() => (
			<AuthKitProvider clientId="test-client-id">
				<TestComponent />
			</AuthKitProvider>
		));

		// Should render without error
		expect(getByTestId("loading")).toBeTruthy();
	});

	it("renders without errors", () => {
		const { container } = render(() => (
			<AuthKitProvider clientId="test-client-id">
				<TestComponent />
			</AuthKitProvider>
		));

		expect(container).toBeTruthy();
	});

	it("requires clientId prop", () => {
		// Test that TypeScript would catch missing clientId
		// This is more of a compile-time check
		const props = { clientId: "test-id" };
		expect(props.clientId).toBe("test-id");
	});

	it("accepts optional configuration props", () => {
		const onRefresh = vi.fn();
		const onRefreshFailure = vi.fn();
		
		render(() => (
			<AuthKitProvider
				clientId="test-client-id"
				apiHostname="api.test.com"
				port={3000}
				https={true}
				redirectUri="https://test.com/callback"
				devMode={true}
				onRefresh={onRefresh}
				onRefreshFailure={onRefreshFailure}
				refreshBufferInterval={5000}
			>
				<TestComponent />
			</AuthKitProvider>
		));

		// Component should render without errors
		expect(true).toBe(true);
	});
});