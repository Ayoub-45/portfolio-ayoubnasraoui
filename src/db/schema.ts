import { 
  pgTable, 
  uuid, 
  text, 
  boolean, 
  timestamp, 
  jsonb 
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm/relations';

// 1. Profile Table (Global Singleton)
export const profile = pgTable('profile', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  tagline: text('tagline').notNull(),
  bio: text('bio').notNull(),
  location: text('location'),
  degree: text('degree'),
  email: text('email').notNull(),
  linkedin: text('linkedin'),
  github: text('github'),
  status: text('status'),
  languages: jsonb('languages').$type<{ lang: string; level: string }[]>().default([]),
  interests: text('interests').array(),
  softSkills: text('soft_skills').array(),
  updatedAt: timestamp('updated_at').defaultNow().$onUpdate(() => new Date()),
});

// 2. Experiences Table
export const experiences = pgTable('experiences', {
  id: uuid('id').defaultRandom().primaryKey(),
  title: text('title').notNull(),
  company: text('company').notNull(),
  date: text('date').notNull(), // e.g. "Jan 2026 – Present"
  description: text('description'),
  bullets: text('bullets').array().notNull(), // Stores historical job bullet metrics
  tags: text('tags').array(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// 3. Projects Table
export const projects = pgTable('projects', {
  id: uuid('id').defaultRandom().primaryKey(),
  title: text('title').notNull(),
  description: text('description').array().notNull(),
  features: text('features').array().notNull(),
  stack: text('stack').array().notNull(),
  link: text('link'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// 4. Skills Table
export const skills = pgTable('skills', {
  id: uuid('id').defaultRandom().primaryKey(),
  label: text('label').notNull(), // e.g., "Cloud & DevOps"
  isSoft: boolean('is_soft').default(false).notNull(),
  items: text('items').array().notNull(), // e.g., ["AWS", "Docker", "Kubernetes"]
});

// 5. Blog Table
export const blog = pgTable('blog', {
  id: uuid('id').defaultRandom().primaryKey(),
  title: text('title').notNull(),
  slug: text('slug').notNull().unique(),
  category: text('category').notNull(), // New: maps directly to post.category
  excerpt: text('excerpt').notNull(),   // New: maps directly to post.excerpt
  publishDate: timestamp('publish_date').defaultNow().notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// 2. Relational Content Table (Replaces the loose JSONB block)
// This models your Payload custom array of textarea entries cleanly
export const blogContent = pgTable('blog_content', {
  id: uuid('id').defaultRandom().primaryKey(),
  blogId: uuid('blog_id').references(() => blog.id, { onDelete: 'cascade' }).notNull(),
  paragraph: text('paragraph').notNull(), // Stores long-form text blocks sequentially
});

// 3. Relational Tags Table
export const blogTags = pgTable('blog_tags', {
  id: uuid('id').defaultRandom().primaryKey(),
  blogId: uuid('blog_id').references(() => blog.id, { onDelete: 'cascade' }).notNull(),
  tag: text('tag').notNull(),
});

// 4. Drizzle Relations definitions
// This makes querying with include maps (e.g., db.query.blog.findMany({ with: { content: true, tags: true } })) seamless!
export const blogRelations = relations(blog, ({ many }) => ({
  content: many(blogContent),
  tags: many(blogTags),
}));

export const blogContentRelations = relations(blogContent, ({ one }) => ({
  blog: one(blog, {
    fields: [blogContent.blogId],
    references: [blog.id],
  }),
}));

export const blogTagsRelations = relations(blogTags, ({ one }) => ({
  blog: one(blog, {
    fields: [blogTags.blogId],
    references: [blog.id],
  }),
}));