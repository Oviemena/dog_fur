DO $$ BEGIN
 CREATE TYPE "public"."is_approved" AS ENUM('null', 'rejected', 'processing', 'approved');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "adoptions" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer,
	"dog_id" integer,
	"profession" text NOT NULL,
	"work_status" text NOT NULL,
	"is_approved" "is_approved" DEFAULT 'null',
	"location_address" text NOT NULL,
	"adoption_reason" text NOT NULL,
	"payment_token" text,
	"scheduled_date" timestamp,
	"created_at" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "dogs" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"breed" text NOT NULL,
	"age" integer NOT NULL,
	"behaviour" text,
	"image_url" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "donations" (
	"id" serial PRIMARY KEY NOT NULL,
	"amount" text,
	"user_id" integer,
	"dog_id" integer,
	"created_at" timestamp,
	"is_anonymous" boolean
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "profile_info" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer,
	"metadata" jsonb
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text,
	"email" text,
	"password" text,
	"role" text,
	"created_at" timestamp,
	"updated_at" timestamp
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "profile_info" ADD CONSTRAINT "profile_info_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
