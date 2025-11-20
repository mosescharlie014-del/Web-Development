# 1427 Authors Hub — Starter (Next.js + Supabase)

This repository contains a minimal starter for "1427 Authors Hub": a platform for reading stories, commenting, liking, and collaborating on projects.

What this scaffold includes
- Next.js + TypeScript starter
- Tailwind CSS
- Supabase client and a SQL schema (db/schema.sql) with tables for users, stories, comments, likes, and projects
- Basic pages: index (story list) and story page (SSG)
- Components: Layout + StoryCard

Quick setup (local)
1. Create a Supabase project at https://supabase.com and copy the API details.
2. Run the SQL in `db/schema.sql` in Supabase SQL editor to create core tables.
3. Create a .env.local in the project root with:
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=public-anon-key
4. Install and run locally:
   npm install
   npm run dev
   Visit http://localhost:3000

How I validated the scaffold
- I checked TypeScript and Next file shape and removed common sources of runtime import-time crashes (unsafe non-null assertions).
- I ensured dependencies in package.json are compatible with Next 14 / React 18.
- I converted markdown rendering to be done server-side in getStaticProps so SSG/ISR works as expected.

Security note
- The scaffold uses marked to render Markdown to HTML. Marked does not sanitize HTML — if you accept user-submitted content, add server-side sanitization (isomorphic-dompurify + jsdom) before sending the rendered HTML to the client.

Next steps
- Implement auth (Supabase Auth UI or custom)
- Add author dashboard: create/edit stories (store body_markdown and rendered_html)
- Add comment APIs and client-side comment UI
- Add likes API and optimistic UI
- Add project pages and collaborator invite flow
- Add moderation features (reporting and admin dashboard)