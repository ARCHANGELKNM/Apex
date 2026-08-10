import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql", // Change to "mysql" or "sqlite" if needed
  schema: "./src/db/schema.js", // Changed extension from .js to .ts
  out: "./drizzle", // Where migrations will be saved
  dbCredentials: {
    url: process.env.DATABASE_URL, // Your database connection string
  },
});
