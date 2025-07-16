import { describe, expect, it } from "vitest";
import { createRoot } from "solid-js";
import { useAuth } from "./hook";

describe("useAuth hook", () => {
	it("throws error when used outside AuthKitProvider", () => {
		expect(() => {
			createRoot(() => {
				useAuth();
			});
		}).toThrow("useAuth must be used within an AuthKitProvider");
	});
});