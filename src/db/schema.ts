import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const password = sqliteTable("password", {
  id: int().primaryKey({ autoIncrement: true }),
  category: text().notNull(),
  username: text().notNull(),
  email: text().notNull(),
  password: text().notNull(),
  pin: text().notNull(),
  delete_at: text(),
});

export const category = sqliteTable("category", {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull().unique(),
});

export const users_credential = sqliteTable("users_credential", {
  id: int().primaryKey({ autoIncrement: true }),
  username: text().notNull(),
  password: text().notNull(),
});

export const isFirstTime = sqliteTable("isFirstTime", {
  id: int().primaryKey({ autoIncrement: true }),
  isFirstTime: text().notNull(),
});
