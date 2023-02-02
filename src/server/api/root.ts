import { createTRPCRouter } from "./trpc";
import { stockRouter } from "./routers/stock";
import { drugRouter } from "./routers/drug";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  stock:stockRouter,
  drug: drugRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
