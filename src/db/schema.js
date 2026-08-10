import { pgTable, text, timestamp, uuid, boolean } from 'drizzle-orm/pg-core';

// 1. WORKSPACES (The Folders)
export const workspaces = pgTable('workspaces', {
  id: uuid('id').defaultRandom().primaryKey(),
  title: text('title').notNull(),
  type: text('type').notNull(), // "HOMEWORK", "PAST_PAPER"
  userId: text('user_id').notNull(), // Kinde ID
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// 2. MESSAGES (The Chat History)
export const messages = pgTable('messages', {
  id: uuid('id').defaultRandom().primaryKey(),
  role: text('role').notNull(), // "user" or "assistant"
  content: text('content').notNull(),
  workspaceId: uuid('workspace_id').references(() => workspaces.id, { onDelete: 'cascade' }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const tasks = pgTable('tasks', {
  id: uuid('id').defaultRandom().primaryKey(),
  title: text('title').notNull(),
  dueDate: timestamp('due_date').notNull(),
  completed: boolean('completed').default(false).notNull(),
  workspaceId: uuid('workspace_id').references(() => workspaces.id, { onDelete: 'cascade' }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
