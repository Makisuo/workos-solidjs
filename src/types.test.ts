import { describe, expect, it } from "vitest";
import type { Client, CreateClientOptions } from "./types";

describe("Types", () => {
	it("Client type has all required methods", () => {
		const mockClient: Client = {
			signIn: async () => {},
			signUp: async () => {},
			signOut: async () => {},
			getUser: () => null,
			getAccessToken: async () => "token",
			switchToOrganization: async () => {},
		};

		// Type checking - this test ensures compilation with correct types
		expect(mockClient).toBeDefined();
		expect(typeof mockClient.signIn).toBe("function");
		expect(typeof mockClient.signUp).toBe("function");
		expect(typeof mockClient.signOut).toBe("function");
		expect(typeof mockClient.getUser).toBe("function");
		expect(typeof mockClient.getAccessToken).toBe("function");
		expect(typeof mockClient.switchToOrganization).toBe("function");
	});

	it("CreateClientOptions type allows all optional properties", () => {
		const options: CreateClientOptions = {
			apiHostname: "api.example.com",
			port: 3000,
			https: true,
			redirectUri: "https://example.com/callback",
			devMode: true,
			onRedirectCallback: () => {},
			onRefresh: () => {},
			onRefreshFailure: () => {},
			refreshBufferInterval: 5000,
		};

		// Type checking
		expect(options).toBeDefined();
		expect(options.apiHostname).toBe("api.example.com");
		expect(options.port).toBe(3000);
		expect(options.https).toBe(true);
	});

	it("CreateClientOptions can be empty", () => {
		const options: CreateClientOptions = {};
		
		// All properties are optional
		expect(options).toBeDefined();
		expect(Object.keys(options).length).toBe(0);
	});
});