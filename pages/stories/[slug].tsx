import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import { supabase } from "../../lib/supabaseClient";
import { Layout } from "../../components/Layout";
import React from "react";
import { marked } from "marked";

type Story = {
  id: string;
  title: string;
  slug: string;
  body_markdown?: string | null;
  rendered_html?: string | null;
  author_id?: string | null;
};

export default function StoryPage({ story }: { story: Story | null }) {
  if (!story) {
    return (
      <Layout>
        <p>Story not found.</p>
      </Layout>
    );
  }

  return (
    <Layout>
      <Head>
        <title>{story.title} — 1427 Authors Hub</title>
        <meta name="description" content={(story.body_markdown ?? "").slice(0, 150)} />
      </Head>

      <article className="prose max-w-none">
        <h1>{story.title}</h1>
        <div className="mt-4">
          {/* rendered_html is generated at build-time in getStaticProps using marked.
              WARNING: Marked produces HTML that must be sanitized if you accept untrusted author input.
              Consider adding DOMPurify (isomorphic-dompurify + jsdom) to sanitize server-side. */}
          <div dangerouslySetInnerHTML={{ __html: story.rendered_html || "" }} />
        </div>
        <section id="comments" className="mt-12">
          <h2 className="text-lg font-semibold">Comments</h2>
          <p className="text-sm text-gray-600">Commenting UI will be added to the API routes and client later.</p>
        </section>
      </article>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await supabase.from("stories").select("slug").eq("status", "published").limit(100);

  const paths = (data ?? []).map((s: any) => ({ params: { slug: s.slug } }));

  return {
    paths,
    fallback: "blocking"
  };
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const slug = ctx.params?.slug as string | undefined;
  const { data } = await supabase.from("stories").select("id,title,slug,body_markdown,author_id").eq("slug", slug).single();

  if (!data) {
    return { props: { story: null }, revalidate: 60 };
  }

  const rendered_html = data.body_markdown ? marked.parse(data.body_markdown) : "";

  const story: Story = {
    id: data.id,
    title: data.title,
    slug: data.slug,
    body_markdown: data.body_markdown,
    rendered_html,
    author_id: data.author_id
  };

  return {
    props: {
      story
    },
    revalidate: 60
  };
};