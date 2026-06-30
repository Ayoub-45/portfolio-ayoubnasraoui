import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "workflow_steps" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"step" varchar NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"badge" varchar NOT NULL,
  	"image_id" integer NOT NULL,
  	"order" numeric NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "workflow_steps_id" integer;
  ALTER TABLE "workflow_steps" ADD CONSTRAINT "workflow_steps_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "workflow_steps_image_idx" ON "workflow_steps" USING btree ("image_id");
  CREATE INDEX "workflow_steps_updated_at_idx" ON "workflow_steps" USING btree ("updated_at");
  CREATE INDEX "workflow_steps_created_at_idx" ON "workflow_steps" USING btree ("created_at");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_workflow_steps_fk" FOREIGN KEY ("workflow_steps_id") REFERENCES "public"."workflow_steps"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_workflow_steps_id_idx" ON "payload_locked_documents_rels" USING btree ("workflow_steps_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "workflow_steps" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "workflow_steps" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_workflow_steps_fk";
  
  DROP INDEX "payload_locked_documents_rels_workflow_steps_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "workflow_steps_id";`)
}
