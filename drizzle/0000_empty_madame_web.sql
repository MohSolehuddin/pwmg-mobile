CREATE TABLE `users_table` (`id` INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, `name` TEXT NOT NULL, `age` INTEGER NOT NULL, `email` TEXT NOT NULL );

CREATE UNIQUE INDEX `users_table_email_unique` ON `users_table` (`email`);
