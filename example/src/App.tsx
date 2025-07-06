import { useAuth } from "@workos-inc/authkit-solidjs";
import { createSignal, Show } from "solid-js";
import "./App.css";

function App() {
	const auth = useAuth();
	const [_organizationId, setOrganizationId] = createSignal("");

	const handleSignIn = async () => {
		await auth.signIn();
	};

	const handleSignUp = async () => {
		await auth.signUp();
	};

	const handleSignOut = async () => {
		auth.signOut();
	};

	const handleSwitchOrganization = async () => {
		const orgId = auth.organizationId;
		if (orgId) {
			await auth.switchToOrganization({ organizationId: orgId });
		}
	};

	const getAccessToken = async () => {
		try {
			const token = await auth.getAccessToken();
			console.log("Access Token:", token);
			alert("Access token logged to console");
		} catch (error) {
			console.error("Error getting access token:", error);
			alert("Error getting access token. Check console.");
		}
	};

	return (
		<div class="container">
			<h1>AuthKit SolidJS Example</h1>

			<Show
				when={!auth.isLoading}
				fallback={<div class="loading">Loading...</div>}
			>
				<Show
					when={auth.user}
					fallback={
						<div class="auth-section">
							<h2>Not Authenticated</h2>
							<div class="button-group">
								<button onClick={handleSignIn}>Sign In</button>
								<button onClick={handleSignUp}>Sign Up</button>
							</div>
						</div>
					}
				>
					<div class="auth-section">
						<h2>Authenticated</h2>
						<div class="user-info">
							<p>
								<strong>Email:</strong> {auth.user?.email}
							</p>
							<p>
								<strong>User ID:</strong> {auth.user?.id}
							</p>
							<Show when={auth.organizationId}>
								<p>
									<strong>Organization ID:</strong> {auth.organizationId}
								</p>
							</Show>
							<Show when={auth.role}>
								<p>
									<strong>Role:</strong> {auth.role}
								</p>
							</Show>
							<Show when={auth.permissions.length > 0}>
								<p>
									<strong>Permissions:</strong> {auth.permissions.join(", ")}
								</p>
							</Show>
							<Show when={auth.featureFlags.length > 0}>
								<p>
									<strong>Feature Flags:</strong> {auth.featureFlags.join(", ")}
								</p>
							</Show>
						</div>

						<div class="actions">
							<button onClick={getAccessToken}>Get Access Token</button>
							<button onClick={handleSignOut}>Sign Out</button>
						</div>

						<div class="org-switch">
							<h3>Switch Organization</h3>
							<input
								type="text"
								placeholder="Organization ID"
								value={auth.organizationId || undefined}
								onInput={(e) => setOrganizationId(e.currentTarget.value)}
							/>
							<button onClick={handleSwitchOrganization}>Switch</button>
						</div>
					</div>
				</Show>
			</Show>
		</div>
	);
}

export default App;
