import { defineConfig } from "vitest/config";
import solidPlugin from "vite-plugin-solid";

export default defineConfig({
	plugins: [solidPlugin()],
	test: {
		environment: "jsdom",
		globals: false,
		isolate: false,
		mockReset: true,
		clearMocks: true,
	},
	resolve: {
		conditions: ["development", "browser"],
	},
});