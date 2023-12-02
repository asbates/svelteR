import esbuild from "esbuild";
import sveltePlugin from "esbuild-svelte";
import GlobalsPlugin from "esbuild-plugin-globals";

esbuild
  .build({
    entryPoints: ["index.js"],
    bundle: true,
    outfile: "../inst/svelteR.js",
    plugins: [
      sveltePlugin({
        compilerOptions: { hydratable: true },
      }),
      GlobalsPlugin({
        Shiny: "window.Shiny",
      }),
    ],
    logLevel: "info",
  })
  .catch(() => process.exit(1));
