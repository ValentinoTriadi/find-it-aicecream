import { relations } from "drizzle-orm";
import { integer, pgEnum, pgTable, serial, text } from "drizzle-orm/pg-core";
import { units } from "./units";
import { challenges } from "./challenges";

export const lessonTypeEnum = pgEnum("lesson_type", ["QUIZ", "VIDEO"]);

export const lessons = pgTable("lessons", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  unitId: integer("unit_id")
    .references(() => units.id, {
      onDelete: "cascade",
    })
    .notNull(),
  lessonType: lessonTypeEnum("lesson_type").notNull(),
  videoUrl: text("video_url"),
  order: integer("order").notNull(),
});

export const lessonsRelations = relations(lessons, ({ one, many }) => ({
  unit: one(units, {
    fields: [lessons.unitId],
    references: [units.id],
  }),
  challenges: many(challenges),
}));