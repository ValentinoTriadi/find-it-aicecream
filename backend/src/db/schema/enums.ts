import { pgEnum } from "drizzle-orm/pg-core";

export const lessonTypeEnum = pgEnum("lesson_type", ["QUIZ", "VIDEO"]);