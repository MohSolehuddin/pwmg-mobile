PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_password` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`category` text NOT NULL,
	`username` text NOT NULL,
	`email` text NOT NULL,
	`password` text NOT NULL,
	`pin` text NOT NULL,
	`delete_at` text
);
--> statement-breakpoint
INSERT INTO `__new_password`("id", "category", "username", "email", "password", "pin", "delete_at") SELECT "id", "category", "username", "email", "password", "pin", "delete_at" FROM `password`;--> statement-breakpoint
DROP TABLE `password`;--> statement-breakpoint
ALTER TABLE `__new_password` RENAME TO `password`;--> statement-breakpoint
PRAGMA foreign_keys=ON;