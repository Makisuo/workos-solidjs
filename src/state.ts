import type { User } from "@workos-inc/authkit-js";

export interface State {
	isLoading: boolean;
	user: User | null;
	role: string | null;
	organizationId: string | null;
	permissions: string[];
	featureFlags: string[];
}

export const initialState: State = {
	isLoading: true,
	user: null,
	role: null,
	organizationId: null,
	permissions: [],
	featureFlags: [],
};
