/// app/db/schema.ts

import { relations } from 'drizzle-orm';
import { boolean, integer, jsonb, pgSchema, pgTable, serial, text, timestamp, pgEnum } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
    id: serial('id').primaryKey(),
    username: text("name"),
    email: text("email"),
    password: text("password"),
    role: text("role").$type<"admin" | "customer">(),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").$onUpdate(() => new Date()),
});

export const usersRelations = relations(users, ({ one }) => ({
    profileInfo: one(profileInfo),
}));

export const profileInfo = pgTable('profile_info', {
    id: serial('id').primaryKey(),
    userId: integer('user_id').references(() => users.id),
    metadata: jsonb('metadata'),
});

export const usersDonationsRelations = relations(users, ({ many }) => ({
    donations: many(donations),
}));

export const donations = pgTable('donations', {
    id: serial('id').primaryKey(),
    amount: text('amount'),
    userId: integer('user_id'),
    dogId: integer('dog_id'),
    createdAt: timestamp("created_at").defaultNow(),
    isAnonymous: boolean('is_anonymous'),
});


export const isApproved = pgEnum('is_approved', ['null', 'rejected', 'processing', 'approved']);

export const usersAdoptionsRelations = relations(users, ({ many }) => ({
    adoptions: many(adoptions),
}));

export const adoptions = pgTable('adoptions', {
    id: serial('id').primaryKey(),
    userId: integer('user_id'),
    dogId: integer('dog_id'),
    profession: text("profession").notNull(),
    workStatus: text("work_status").notNull(),
    approvalStatus: isApproved('is_approved').default('null'),
    locationAddress: text("location_address").notNull(),
    adoptionReason: text("adoption_reason").notNull(),
    paymentToken: text("payment_token"),
    scheduledAdoptionDate: timestamp('scheduled_date'),
    createdAt: timestamp("created_at").defaultNow(),
});




export const dogs = pgTable('dogs', {
    id: serial('id').primaryKey().notNull(),
    name: text('name').notNull(),
    breed: text('breed').notNull(),
    age: integer("age").notNull(),
    behaviour: text("behaviour"),
    imageUrl: text('image_url'),
    color: text('color')
})


export type InsertUsers = typeof users.$inferInsert
export type SelectUsers = typeof users.$inferSelect
export type InsertAdoptions = typeof adoptions.$inferInsert
export type SelectAdoptions = typeof adoptions.$inferSelect
export type InsertDogs = typeof dogs.$inferInsert
export type SelectDogs = typeof dogs.$inferSelect
export type InsertDonations = typeof donations.$inferInsert
export type SelectDonations = typeof donations.$inferSelect