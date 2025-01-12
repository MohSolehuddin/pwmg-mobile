CREATE TABLE `password` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`category` text NOT NULL,
	`username` text NOT NULL,
	`password` text NOT NULL,
	`pin` text NOT NULL,
	`delete_at` text NOT NULL
);
