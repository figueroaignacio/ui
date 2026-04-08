CREATE TABLE "components" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"slug" text NOT NULL,
	"code" text NOT NULL,
	"registry_dependencies" jsonb DEFAULT '[]'::jsonb,
	"type" text DEFAULT 'ui',
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "components_slug_unique" UNIQUE("slug")
);
