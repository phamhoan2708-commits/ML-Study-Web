import { eq, and, isNull } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, chapters, lessons, progress, cheatSheets } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    // Ensure updateSet has at least one key for onDuplicateKeyUpdate
    if (Object.keys(updateSet).length === 0) {
      updateSet.updatedAt = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

export async function getChapters() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(chapters).orderBy(chapters.order);
}

export async function getChapterById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(chapters).where(eq(chapters.id, id)).limit(1);
  return result[0];
}

export async function getLessonsByChapterId(chapterId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(lessons).where(eq(lessons.chapterId, chapterId)).orderBy(lessons.order);
}

export async function getLessons() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(lessons).orderBy(lessons.chapterId, lessons.order);
}

export async function getLessonById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(lessons).where(eq(lessons.id, id)).limit(1);
  return result[0];
}

export async function getCheatSheets() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(cheatSheets).orderBy(cheatSheets.category);
}

export async function getCheatSheetsByCategory(category: string) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(cheatSheets).where(eq(cheatSheets.category, category));
}

export async function getUserProgress(userId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(progress).where(eq(progress.userId, userId));
}

export async function getChapterProgress(userId: number, chapterId: number) {
  const db = await getDb();
  if (!db) return [];
  return db
    .select()
    .from(progress)
    .where(and(eq(progress.userId, userId), eq(progress.chapterId, chapterId)));
}

export async function markLessonComplete(userId: number, chapterId: number, lessonId: number) {
  const db = await getDb();
  if (!db) return;
  
  const existing = await db
    .select()
    .from(progress)
    .where(
      and(
        eq(progress.userId, userId),
        eq(progress.chapterId, chapterId),
        eq(progress.lessonId, lessonId)
      )
    )
    .limit(1);

  if (existing.length > 0) {
    await db
      .update(progress)
      .set({ completed: 1, completedAt: new Date() })
      .where(eq(progress.id, existing[0]!.id));
  } else {
    await db.insert(progress).values({
      userId,
      chapterId,
      lessonId,
      completed: 1,
      completedAt: new Date(),
    });
  }
}

export async function markChapterComplete(userId: number, chapterId: number) {
  const db = await getDb();
  if (!db) return;
  
  const existing = await db
    .select()
    .from(progress)
    .where(
      and(
        eq(progress.userId, userId),
        eq(progress.chapterId, chapterId),
        isNull(progress.lessonId)
      )
    )
    .limit(1);

  if (existing.length > 0) {
    await db
      .update(progress)
      .set({ completed: 1, completedAt: new Date() })
      .where(eq(progress.id, existing[0]!.id));
  } else {
    await db.insert(progress).values({
      userId,
      chapterId,
      lessonId: null,
      completed: 1,
      completedAt: new Date(),
    });
  }
}
