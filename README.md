# AuthKit SolidJS

A SolidJS SDK for WorkOS AuthKit, providing authentication and session management for SolidJS applications.

## Installation

```bash
npm install @workos-inc/authkit-solidjs
# or
yarn add @workos-inc/authkit-solidjs
# or
bun add @workos-inc/authkit-solidjs
```

## Usage

### Wrap your app with AuthKitProvider

```tsx
import { render } from 'solid-js/web';
import { AuthKitProvider } from '@workos-inc/authkit-solidjs';
import App from './App';

render(
  () => (
    <AuthKitProvider
      clientId="your_client_id"
      redirectUri="http://localhost:3000/callback"
    >
      <App />
    </AuthKitProvider>
  ),
  document.getElementById('root')!
);
```

### Use the useAuth hook

```tsx
import { Show } from 'solid-js';
import { useAuth } from '@workos-inc/authkit-solidjs';

function Profile() {
  const auth = useAuth();

  return (
    <Show
      when={!auth.isLoading}
      fallback={<div>Loading...</div>}
    >
      <Show
        when={auth.user}
        fallback={
          <div>
            <button onClick={() => auth.signIn()}>Sign In</button>
            <button onClick={() => auth.signUp()}>Sign Up</button>
          </div>
        }
      >
        <div>
          <p>Welcome, {auth.user?.email}!</p>
          <button onClick={() => auth.signOut()}>Sign Out</button>
        </div>
      </Show>
    </Show>
  );
}
```

## API Reference

### AuthKitProvider

The `AuthKitProvider` component wraps your application and provides authentication context.

#### Props

- `clientId` (required): Your WorkOS client ID
- `redirectUri` (optional): The redirect URI for OAuth flows
- `apiHostname` (optional): Custom API hostname
- `devMode` (optional): Enable development mode
- `onRefresh` (optional): Callback when tokens are refreshed
- `onRefreshFailure` (optional): Callback when token refresh fails

### useAuth

The `useAuth` hook provides access to authentication state and methods.

#### Returns

- `isLoading`: Whether the authentication state is being initialized
- `user`: The authenticated user object or null
- `organizationId`: The current organization ID or null
- `role`: The user's role or null
- `permissions`: Array of user permissions
- `featureFlags`: Array of enabled feature flags
- `signIn()`: Initiate sign in flow
- `signUp()`: Initiate sign up flow
- `signOut()`: Sign out the current user
- `getAccessToken()`: Get the current access token
- `switchToOrganization(organizationId)`: Switch to a different organization

## Example

See the `/example` directory for a complete working example.

To run the example:

```bash
cd example
bun install
bun run dev
```

## Development

```bash
# Install dependencies
bun install

# Build the library
bun run build

# Run type checking
bun run typecheck

# Format code
bun run format
```

## License

MIT