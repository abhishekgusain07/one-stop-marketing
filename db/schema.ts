import { relations } from "drizzle-orm";
import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: text("id").primaryKey(),
  createdTime: timestamp("created_time").defaultNow(),
  email: text("email").unique(),
  firstName: text("first_name"),
  lastName: text("last_name"),
  gender: text("gender"),
  profileImageUrl: text("profile_image_url"),
  userId: text("user_id").unique(),
  subscription: text("subscription"),
  credits: text("credits"),
});


export const subscriptions = pgTable("subscriptions", {
  id: text("id").primaryKey(),
  createdTime: timestamp("created_time").defaultNow(),
  subscriptionId: text("subscription_id"),
  stripeUserId: text("stripe_user_id"),
  status: text("status"),
  startDate: text("start_date"),
  endDate: text("end_date"),
  planId: text("plan_id"),
  defaultPaymentMethodId: text("default_payment_method_id"),
  email: text("email"),
  userId: text("user_id"),
});

export const subscriptionPlans = pgTable("subscriptions_plans", {
  id: text("id").primaryKey(),
  createdTime: timestamp("created_time").defaultNow(),
  planId: text("plan_id"),
  name: text("name"),
  description: text("description"),
  amount: text("amount"),
  currency: text("currency"),
  interval: text("interval"),
});

export const invoices = pgTable("invoices", {
  id: text("id").primaryKey(),
  createdTime: timestamp("created_time").defaultNow(),
  invoiceId: text("invoice_id"),
  subscriptionId: text("subscription_id"),
  amountPaid: text("amount_paid"),
  amountDue: text("amount_due"),
  currency: text("currency"),
  status: text("status"),
  email: text("email"),
  userId: text("user_id"),
});


export const products = pgTable("products", {
  id: text("id").primaryKey(),
  createdTime: timestamp("created_time").defaultNow(),
  name: text("name").notNull(), 
  description: text("description").notNull(), 
  userId: text("user_id").notNull(), 
});

export const productsRelations = relations(products, ({ one, many }) => ({
  user: one(users, {
    fields: [products.userId],
    references: [users.id],
  }),
  hooks: many(hooks),
}));

export const hooks = pgTable("hooks", {
  id: text("id").primaryKey(),
  createdTime: timestamp("created_time").defaultNow(),
  content: text("content").notNull(), 
  productId: text("product_id").notNull(),
  userId: text("user_id").notNull(), 
});



export const hooksRelations = relations(hooks, ({ one }) => ({
  product: one(products, {
    fields: [hooks.productId],
    references: [products.id],
  }),
  user: one(users, {
    fields: [hooks.userId],
    references: [users.id],
  }),
}));

export const videos = pgTable("videos", {
  id: text("id").primaryKey(),
  createdTime: timestamp("created_time").defaultNow(),
  url: text("url").notNull(),
  userId: text("user_id").notNull(),
  productId: text("product_id"),
  hookText: text("hook_text"),
});

export const videosRelations = relations(videos, ({ one }) => ({
  user: one(users, {
    fields: [videos.userId],
    references: [users.id],
  }),
  product: one(products, {
    fields: [videos.productId],
    references: [products.id],
  }),
}));