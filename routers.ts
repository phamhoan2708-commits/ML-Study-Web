import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { z } from "zod";
import {
  getChapters,
  getChapterById,
  getLessons,
  getLessonsByChapterId,
  getLessonById,
  getUserProgress,
  getChapterProgress,
  markLessonComplete,
  markChapterComplete,
  getCheatSheets,
  getCheatSheetsByCategory,
} from "./db";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  chapters: router({
    list: publicProcedure.query(async () => {
      return getChapters();
    }),
    getById: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        return getChapterById(input.id);
      }),
  }),

  lessons: router({
    list: publicProcedure.query(async () => {
      return getLessons();
    }),
    getByChapterId: publicProcedure
      .input(z.object({ chapterId: z.number() }))
      .query(async ({ input }) => {
        return getLessonsByChapterId(input.chapterId);
      }),
    getById: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        return getLessonById(input.id);
      }),
  }),

  progress: router({
    getUserProgress: protectedProcedure.query(async ({ ctx }) => {
      return getUserProgress(ctx.user.id);
    }),
    getChapterProgress: protectedProcedure
      .input(z.object({ chapterId: z.number() }))
      .query(async ({ ctx, input }) => {
        return getChapterProgress(ctx.user.id, input.chapterId);
      }),
    markLessonComplete: protectedProcedure
      .input(z.object({ chapterId: z.number(), lessonId: z.number() }))
      .mutation(async ({ ctx, input }) => {
        await markLessonComplete(ctx.user.id, input.chapterId, input.lessonId);
        return { success: true };
      }),
    markChapterComplete: protectedProcedure
      .input(z.object({ chapterId: z.number() }))
      .mutation(async ({ ctx, input }) => {
        await markChapterComplete(ctx.user.id, input.chapterId);
        return { success: true };
      }),
  }),

  cheatSheets: router({
    list: publicProcedure.query(async () => {
      return getCheatSheets();
    }),
    getByCategory: publicProcedure
      .input(z.object({ category: z.string() }))
      .query(async ({ input }) => {
        return getCheatSheetsByCategory(input.category);
      }),
  }),
});

export type AppRouter = typeof appRouter;
