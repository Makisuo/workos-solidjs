import { solidPlugin } from "esbuild-plugin-solid";
import { defineConfig } from "tsdown";

export default defineConfig({
	entry: ["src/index.ts"],
	format: ["esm"],
	dts: true,
	sourcemap: true,
	clean: true,
	external: ["solid-js", "solid-js/store"],
	plugins: [solidPlugin()],
});
