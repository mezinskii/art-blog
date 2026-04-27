import { defineCollection, z } from "astro:content";
import { getCollection } from "astro:content";

const blog = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z
      .string()
      .or(z.date())
      .transform((val) => new Date(val)),
    updatedDate: z
      .string()
      .optional()
      .transform((str) => (str ? new Date(str) : undefined)),
    heroImage: z.string().optional(),
    lang: z.string().optional(),
    author: z.string().optional(),
    avatar: z.string().optional(),
    section: z.string().optional(),
    tag: z.string().optional(),
    minutes: z.number().optional(),
    accent: z.string().optional(),
  }),
});

export const collections = { blog };

export async function getBlogPosts() {
  const posts = await getCollection("blog");

  return posts.map((post) => {
    const blog_slug = post.slug.split("/")[0];
    return {
      ...post,
      blog_slug,
    };
  });
}

const PALETTE = ["#8b1e1e", "#c9a961", "#5d6b3a", "#6b4a2a", "#3a5d6b", "#1a1612"];

export function postAccent(post: { data: { accent?: string } }, idx: number) {
  return post.data.accent ?? PALETTE[idx % PALETTE.length];
}

export function postMinutes(post: { data: { minutes?: number; description?: string } }) {
  if (post.data.minutes) return post.data.minutes;
  const wc = (post.data.description ?? "").split(/\s+/).length;
  return Math.max(4, Math.round(wc / 30) + 5);
}

export function postSection(post: { data: { section?: string; lang?: string } }) {
  if (post.data.section) return post.data.section;
  return post.data.lang === "ru" ? "Журнал" : "Journal";
}

export function postTag(post: { data: { tag?: string; lang?: string } }) {
  if (post.data.tag) return post.data.tag;
  return post.data.lang === "ru" ? "Эссе" : "Essay";
}
