export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    if (process.env.NODE_ENV !== "development") return;

    const { server } = await import("@/mocks/server");

    server.listen({
      onUnhandledRequest: "bypass",
    });

    console.log("[MSW] Server started in instrumentation");
  }
}
