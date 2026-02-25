const esbuild = require("esbuild");

const baseConfig = {
    bundle: true,
    external: ["vscode"],
    platform: "node",
    sourcemap: true,
};

// Bundle the client
esbuild.build({
    ...baseConfig,
    entryPoints: ["client/src/extension.ts"],
    outfile: "client/out/extension.js",
}).catch(() => process.exit(1));

// Bundle the server
esbuild.build({
    ...baseConfig,
    entryPoints: ["server/src/server.ts"],
    outfile: "server/out/server.js",
}).catch(() => process.exit(1));