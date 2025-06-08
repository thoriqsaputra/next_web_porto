// server.ts
import type { ServerBuild } from "@remix-run/server-runtime";
import { createRequestHandler, logDevReady } from "@remix-run/server-runtime";
import { resolve } from "node:path";
import * as build from "./build/server/index"; // This will be the compiled Remix build
import { type Serve } from "bun";

if (Bun.env.NODE_ENV === "development") {
  logDevReady(build as unknown as ServerBuild);
}

const remixHandler = createRequestHandler(
  build as unknown as ServerBuild,
  Bun.env.NODE_ENV
);

export default {
  port: Bun.env.PORT || 3000,
  async fetch(request: Request) {
    // Handle static files first
    let { pathname } = new URL(request.url);
    // Adjust this path if your public directory is named differently
    let filePath = resolve(__dirname, "./public", `.${pathname}`);
    let file = Bun.file(filePath);

    if (await file.exists()) {
      return new Response(file);
    }

    // If it's not a static file, send it to the Remix request handler
    return remixHandler(request);
  },
} satisfies Serve;