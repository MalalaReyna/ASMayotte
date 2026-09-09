// src/mocks/server/init.ts
let isStarted = false;

export async function ensureServerMocking() {
  if (isStarted) return;

  if (process.env.NEXT_RUNTIME !== "nodejs") return;
  if (process.env.NODE_ENV !== "development") return;

  const { server } = await import("@/mocks/server");

  server.listen({
    onUnhandledRequest: "bypass",
  });

  isStarted = true;

  console.log("[MSW] Server started");
}
