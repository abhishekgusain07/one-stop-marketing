CREATE TABLE "hooks" (
	"id" text PRIMARY KEY NOT NULL,
	"created_time" timestamp DEFAULT now(),
	"content" text NOT NULL,
	"product_id" text NOT NULL,
	"user_id" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "products" (
	"id" text PRIMARY KEY NOT NULL,
	"created_time" timestamp DEFAULT now(),
	"name" text NOT NULL,
	"description" text NOT NULL,
	"user_id" text NOT NULL
);
