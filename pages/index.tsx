import { GetStaticProps } from "next";
import Head from "next/head";
import { supabase } from "../lib/supabaseClient";
import { Layout } from "../components/Layout";
import { StoryCard } from "../components/StoryCard";
import React from "react";

type Story = {
  id: string;
  title: string;
  slug: string;
  excerpt?: string | null;
};

export default function Home({ stories }: { stories: Story[] }) {
  return (
    <Layout>
      <Head>
        <title>1427 Authors Hub — Stories</title>
        <meta name="description" content="Read and collaborate on stories at 1427 Authors Hub" />
      </Head>
      <h1 className="text-2xl font-bold mb-4">Latest stories</h1>

      <div className="grid gap-4 sm:grid-cols-2">
        {stories.map((s) => (
          <StoryCard key={s.id} title={s.title} excerpt={s.excerpt ?? ""} slug={s.slug} id={s.id} />
        ))}
      </div>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const { data, error } = await supabase
    .from("stories")
    .select("id, title, slug, excerpt")
    .eq("status", "published")
    .order("created_at", { ascending: false })
    .limit(20);

  const stories = (data ?? []) as Story[];

  return {
    props: {
      stories
    },
    revalidate: 30
  };
};