CREATE TABLE "videos" (
	"id" text PRIMARY KEY NOT NULL,
	"created_time" timestamp DEFAULT now(),
	"url" text NOT NULL,
	"user_id" text NOT NULL,
	"product_id" text,
	"hook_text" text
);
