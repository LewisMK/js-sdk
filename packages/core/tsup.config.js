import { defineConfig } from "tsup";
// import { polyfillNode } from "esbuild-plugin-polyfill-node";
import plugin from "node-stdlib-browser/helpers/esbuild/plugin";
import stdLibBrowser from "node-stdlib-browser";
// import shim from "node-stdlib-browser/helpers/esbuild/shim";

export default defineConfig((options) => ({
  // shims: true,
  entry: ["src/index.ts"],
  splitting: false,
  minify: !options.watch,
  format: ["cjs", "esm"],
  target: "es2020",
  sourcemap: true,
  clean: !options.watch,
  dts: true,
  noExternal: ["bs58", "@noble/ed25519", "@enzoferey/ethers-error-parser"],
  esbuildPlugins: [
    plugin(stdLibBrowser),
    // polyfillNode({
    //   polyfills: {
    //     buffer: true,
    //     // crypto: true,
    //   },
    // }),
  ],
  esbuildOptions(options, context) {
    options.define.Buffer = "Buffer";
    options.define.process = "process";
    options.define.global = "global";
    options.inject = [
      require.resolve("node-stdlib-browser/helpers/esbuild/shim"),
    ];
  },
  tsconfig: "tsconfig.build.json",
}));
