CREATE TABLE `data_passwords` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`category` text NOT NULL,
	`username` text NOT NULL,
	`email` text NOT NULL,
	`password` text NOT NULL,
	`pin` text NOT NULL,
	`delete_at` text
);
--> statement-breakpoint
ALTER TABLE `password` ADD `email` text;