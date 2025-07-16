import { createRoot } from "solid-js";
import { createStore } from "solid-js/store";
import { describe, expect, it } from "vitest";
import { initialState, type State } from "./state";

describe("State", () => {
	it("has correct initial state shape", () => {
		expect(initialState).toEqual({
			isLoading: true,
			user: null,
			role: null,
			organizationId: null,
			permissions: [],
			featureFlags: [],
		});
	});

	it("initial state has correct values", () => {
		// Verify each property has correct initial value
		expect(initialState.isLoading).toBe(true);
		expect(initialState.user).toBe(null);
		expect(initialState.role).toBe(null);
		expect(initialState.organizationId).toBe(null);
		expect(initialState.permissions).toEqual([]);
		expect(initialState.featureFlags).toEqual([]);
	});

	it("works correctly with solid-js store", () => {
		createRoot((dispose) => {
			const [state, setState] = createStore<State>({
				isLoading: true,
				user: null,
				role: null,
				organizationId: null,
				permissions: [],
				featureFlags: [],
			});

			// Initial state
			expect(state.isLoading).toBe(true);
			expect(state.user).toBe(null);

			// Update state
			setState({
				isLoading: false,
				user: { id: "123", email: "test@example.com" } as any,
				role: "admin",
				permissions: ["read", "write"],
				featureFlags: ["feature1"],
			});

			// Verify updates
			expect(state.isLoading).toBe(false);
			expect(state.user).toEqual({ id: "123", email: "test@example.com" });
			expect(state.role).toBe("admin");
			expect(state.permissions).toEqual(["read", "write"]);
			expect(state.featureFlags).toEqual(["feature1"]);

			dispose();
		});
	});

	it("partial state updates work correctly", () => {
		createRoot((dispose) => {
			const [state, setState] = createStore<State>({
				isLoading: true,
				user: null,
				role: null,
				organizationId: null,
				permissions: [],
				featureFlags: [],
			});

			// Partial update
			setState({ isLoading: false });

			// Only isLoading should change
			expect(state.isLoading).toBe(false);
			expect(state.user).toBe(null);
			expect(state.permissions).toEqual([]);

			// Update user
			setState({ user: { id: "123", email: "test@example.com" } as any });

			// Previous updates preserved
			expect(state.isLoading).toBe(false);
			expect(state.user).toEqual({ id: "123", email: "test@example.com" });

			dispose();
		});
	});

	it("arrays in state can be updated", () => {
		createRoot((dispose) => {
			const [state, setState] = createStore<State>(initialState);

			// Update permissions array
			setState({ permissions: ["read"] });
			expect(state.permissions).toEqual(["read"]);

			// Replace with new array
			setState({ permissions: ["read", "write", "delete"] });
			expect(state.permissions).toEqual(["read", "write", "delete"]);

			// Empty array
			setState({ permissions: [] });
			expect(state.permissions).toEqual([]);

			dispose();
		});
	});

	it("state can be modified", () => {
		createRoot((dispose) => {
			const [state, setState] = createStore<State>(initialState);

			// Initial value
			expect(state.isLoading).toBe(true);

			// Update state
			setState({ isLoading: false });

			// Verify update
			expect(state.isLoading).toBe(false);

			dispose();
		});
	});
});
