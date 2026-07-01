import { useCallback, useMemo, useSyncExternalStore } from "react";
import { chapters, cheatSheets, lessons } from "./curriculum";

type Progress = {
  id: number;
  userId: number;
  chapterId: number;
  lessonId: number | null;
  completed: number;
  completedAt?: Date;
};

let progress: Progress[] = [];
let progressId = 1;
const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function useVersion() {
  return useSyncExternalStore(subscribe, () => String(progressId), () => String(progressId));
}

function query<T>(getData: () => T) {
  useVersion();
  return { data: getData(), isLoading: false };
}

function mutation<TInput>(run: (input: TInput) => void, onSuccess?: () => void | Promise<void>) {
  return {
    mutate(input: TInput) {
      run(input);
      emit();
      void onSuccess?.();
    },
  };
}

export const trpc = {
  useUtils() {
    return useMemo(
      () => ({
        progress: {
          getChapterProgress: { invalidate: async () => undefined },
          getUserProgress: { invalidate: async () => undefined },
        },
      }),
      []
    );
  },
  chapters: {
    list: {
      useQuery: () => query(() => chapters),
    },
    getById: {
      useQuery: ({ id }: { id: number }) => query(() => chapters.find((chapter) => chapter.id === id)),
    },
  },
  lessons: {
    list: {
      useQuery: () => query(() => lessons),
    },
    getByChapterId: {
      useQuery: ({ chapterId }: { chapterId: number }) => query(() => lessons.filter((lesson) => lesson.chapterId === chapterId)),
    },
    getById: {
      useQuery: ({ id }: { id: number }) => query(() => lessons.find((lesson) => lesson.id === id)),
    },
  },
  progress: {
    getUserProgress: {
      useQuery: (_input?: undefined, _options?: { enabled?: boolean }) => query(() => progress),
    },
    getChapterProgress: {
      useQuery: ({ chapterId }: { chapterId: number }, _options?: { enabled?: boolean }) =>
        query(() => progress.filter((item) => item.chapterId === chapterId)),
    },
    markLessonComplete: {
      useMutation: ({ onSuccess }: { onSuccess?: () => void | Promise<void> } = {}) => {
        const run = useCallback(({ chapterId, lessonId }: { chapterId: number; lessonId: number }) => {
          const existing = progress.find((item) => item.chapterId === chapterId && item.lessonId === lessonId);
          if (existing) {
            existing.completed = 1;
            existing.completedAt = new Date();
            return;
          }

          progress = [
            ...progress,
            {
              id: progressId++,
              userId: 1,
              chapterId,
              lessonId,
              completed: 1,
              completedAt: new Date(),
            },
          ];
        }, []);

        return mutation(run, onSuccess);
      },
    },
    markChapterComplete: {
      useMutation: () => mutation(({ chapterId }: { chapterId: number }) => {
        progress = [
          ...progress,
          {
            id: progressId++,
            userId: 1,
            chapterId,
            lessonId: null,
            completed: 1,
            completedAt: new Date(),
          },
        ];
      }),
    },
  },
  cheatSheets: {
    list: {
      useQuery: () => query(() => cheatSheets),
    },
    getByCategory: {
      useQuery: ({ category }: { category: string }) => query(() => cheatSheets.filter((sheet) => sheet.category === category)),
    },
  },
};
