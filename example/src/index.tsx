import { AuthKitProvider } from "@workos-inc/authkit-solidjs";
import { render } from "solid-js/web";
import App from "./App";

const root = document.getElementById("root");

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
	throw new Error(
		"Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?",
	);
}

render(
	() => (
		<AuthKitProvider
			clientId={
				import.meta.env.VITE_WORKOS_CLIENT_ID ||
				"client_01HGZR2CV5G9VPBYK6XFA8YG17"
			}
			redirectUri={
				import.meta.env.VITE_WORKOS_REDIRECT_URI ||
				"http://localhost:3000/callback"
			}
		>
			<App />
		</AuthKitProvider>
	),
	root!,
);
