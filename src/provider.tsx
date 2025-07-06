import {
	createClient,
	getClaims,
	LoginRequiredError,
	type OnRefreshResponse,
} from "@workos-inc/authkit-js";
import { createEffect, createSignal, type JSX, onCleanup } from "solid-js";
import { createStore, reconcile } from "solid-js/store";
import { AuthKitContext } from "./context";
import { initialState, type State } from "./state";
import type { Client, CreateClientOptions } from "./types";

interface AuthKitProviderProps extends CreateClientOptions {
	clientId: string;
	children: JSX.Element;
}

export function AuthKitProvider(props: AuthKitProviderProps) {
	const [client, setClient] = createSignal<Client>(NOOP_CLIENT);
	const [state, setState] = createStore<State>(initialState);

	const handleRefresh = (response: OnRefreshResponse) => {
		const { user, accessToken, organizationId } = response;
		const {
			role = null,
			permissions = [],
			feature_flags = [],
		} = getClaims(accessToken);

		setState(
			reconcile({
				...state,
				user,
				organizationId: organizationId ?? null,
				role,
				permissions,
				featureFlags: feature_flags,
			}),
		);

		props.onRefresh?.(response);
	};

	createEffect(() => {
		let timeoutId: NodeJS.Timeout;

		const initialize = () => {
			timeoutId = setTimeout(() => {
				createClient(props.clientId, {
					apiHostname: props.apiHostname,
					port: props.port,
					https: props.https,
					redirectUri: props.redirectUri,
					devMode: props.devMode,
					onRedirectCallback: props.onRedirectCallback,
					onRefresh: handleRefresh,
					onRefreshFailure: props.onRefreshFailure,
					refreshBufferInterval: props.refreshBufferInterval,
				}).then(async (authkitClient) => {
					console.log("authkitClient", authkitClient);
					const user = authkitClient.getUser();
					console.log("user", user);
					setClient({
						getAccessToken: authkitClient.getAccessToken.bind(authkitClient),
						getUser: authkitClient.getUser.bind(authkitClient),
						signIn: authkitClient.signIn.bind(authkitClient),
						signUp: authkitClient.signUp.bind(authkitClient),
						signOut: authkitClient.signOut.bind(authkitClient),
						switchToOrganization:
							authkitClient.switchToOrganization.bind(authkitClient),
					});
					setState({ isLoading: false, user });
				});
			});
		};

		setClient(NOOP_CLIENT);
		setState(reconcile(initialState));
		initialize();

		onCleanup(() => {
			clearTimeout(timeoutId);
		});
	});

	const contextValue = () => ({
		...client(),
		...state,
	});

	return (
		<AuthKitContext.Provider value={contextValue()}>
			{props.children}
		</AuthKitContext.Provider>
	);
}

const NOOP_CLIENT: Client = {
	signIn: async () => {},
	signUp: async () => {},
	getUser: () => null,
	getAccessToken: () => Promise.reject(new LoginRequiredError()),
	switchToOrganization: () => Promise.resolve(),
	signOut: async () => {},
};
