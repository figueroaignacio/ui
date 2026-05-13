ALTER TABLE "doc_chunks" ALTER COLUMN "embedding" SET DATA TYPE vector(768);--> statement-breakpoint
ALTER TABLE "doc_chunks" ADD COLUMN "content_hash" text;