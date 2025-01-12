import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const usersTable = sqliteTable("users_table", {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  age: int().notNull(),
  email: text().notNull().unique(),
});

export const password = sqliteTable("password", {
  id: int().primaryKey({ autoIncrement: true }),
  category: text().notNull(),
  username: text().notNull(),
  password: text().notNull(),
  pin: text().notNull(),
  delete_at: text().notNull(),
});
