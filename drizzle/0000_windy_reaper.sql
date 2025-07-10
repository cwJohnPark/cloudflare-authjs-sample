CREATE TABLE `users` (
	`id` text PRIMARY KEY DEFAULT '' NOT NULL,
	`name` text DEFAULT 'null',
	`email` text DEFAULT 'null',
	`emailVerified` integer DEFAULT 'null',
	`image` text DEFAULT 'null'
);
