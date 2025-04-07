import { relations } from "drizzle-orm";
import { integer, pgTable, text } from "drizzle-orm/pg-core";
import { challengeProgress } from "./challengeProgress";

export const userProfile = pgTable("user_profile", {
  userId: text("user_id").primaryKey().notNull(),
  userName: text("user_name").notNull().default("User"),
  profileImageSrc: text("profile_image_src").default("/default_avatar.png"),
  activeUnitId: integer("active_unit_id")
});

export const userProfileRelations = relations(userProfile, ({ many }) => ({
  quizCompletions: many(challengeProgress),
}));