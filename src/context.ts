import { createContext } from "solid-js";
import { initialState, type State } from "./state";
import type { Client } from "./types";

export interface ContextValue extends Client, State {}

export const AuthKitContext = createContext<ContextValue>(
	initialState as ContextValue,
);
