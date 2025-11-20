import Link from "next/link";
import React from "react";

type Props = {
  id: string;
  title: string;
  excerpt?: string;
  slug: string;
};

export const StoryCard: React.FC<Props> = ({ title, excerpt, slug }) => {
  return (
    <article className="bg-white rounded-lg shadow p-5">
      <h3 className="text-lg font-semibold mb-2">
        <Link href={`/stories/${slug}`}>{title}</Link>
      </h3>
      <p className="text-sm text-gray-600">{excerpt}</p>
    </article>
  );
};