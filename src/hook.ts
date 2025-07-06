import { useContext } from "solid-js";
import { AuthKitContext } from "./context";
import { initialState } from "./state";

export function useAuth() {
	const context = useContext(AuthKitContext);

	if (context === initialState) {
		throw new Error("useAuth must be used within an AuthKitProvider");
	}

	return context;
}
