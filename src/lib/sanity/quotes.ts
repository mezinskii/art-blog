import { sanityClient } from "./client";

export type QuoteLang = "ru" | "en" | "tr";

export type SiteQuote = {
  id: string;
  text: string;
  lang: QuoteLang;
  authorId?: string;
  authorName: string;
  workTitle?: string;
  ref?: string;
};

type SanityQuoteResponse = {
  _id: string;
  quoteId?: string;
  text: string;
  language: QuoteLang;
  section?: string;
  chapter?: string;
  letter?: number;
  source?: { ref?: string; title?: string };
  authorId?: string;
  author?: { name?: { ru?: string; en?: string; tr?: string; original?: string } };
  work?: { title?: { ru?: string; en?: string; tr?: string; original?: string } };
};

const ALL_QUOTES_QUERY = `
*[_type == "quote"] | order(_createdAt desc) {
  _id,
  quoteId,
  text,
  language,
  section,
  chapter,
  letter,
  source,
  "authorId": author->authorId,
  "author": author->{ name },
  "work": work->{ title }
}
`;

const FALLBACK: SiteQuote[] = [
  {
    id: "fallback-1",
    text: "Where life is possible, there it is possible to live well.",
    lang: "en",
    authorName: "Marcus Aurelius",
    workTitle: "Meditations",
    ref: "V.16",
  },
  {
    id: "fallback-2",
    text: "Где можно жить, там можно жить и хорошо.",
    lang: "ru",
    authorName: "Марк Аврелий",
    workTitle: "Размышления",
    ref: "V.16",
  },
  {
    id: "fallback-3",
    text: "Men are disturbed not by things, but by their opinions of them.",
    lang: "en",
    authorName: "Epictetus",
    workTitle: "Enchiridion",
    ref: "5",
  },
  {
    id: "fallback-4",
    text: "Не вещи тревожат людей, а мнения о вещах.",
    lang: "ru",
    authorName: "Эпиктет",
    workTitle: "Энхиридион",
    ref: "5",
  },
];

function pickName(name?: { ru?: string; en?: string; tr?: string; original?: string }, lang?: QuoteLang) {
  if (!name) return "";
  if (lang && name[lang]) return name[lang]!;
  return name.en ?? name.ru ?? name.original ?? name.tr ?? "";
}

function buildRef(q: SanityQuoteResponse): string | undefined {
  if (q.source?.ref) return q.source.ref;
  const parts: string[] = [];
  if (q.section) parts.push(q.section);
  if (q.chapter) parts.push(q.chapter);
  if (typeof q.letter === "number") parts.push(String(q.letter));
  return parts.length ? parts.join(".") : undefined;
}

let cache: { ru: SiteQuote[]; en: SiteQuote[] } | null = null;

export async function getQuotesByLang(): Promise<{ ru: SiteQuote[]; en: SiteQuote[] }> {
  if (cache) return cache;

  const projectId = import.meta.env.SANITY_PROJECT_ID;
  if (!projectId) {
    cache = bucketize(FALLBACK);
    return cache;
  }

  try {
    const data = await sanityClient.fetch<SanityQuoteResponse[]>(ALL_QUOTES_QUERY);
    const mapped: SiteQuote[] = data.map((q) => ({
      id: q.quoteId ?? q._id,
      text: q.text,
      lang: q.language,
      authorId: q.authorId,
      authorName: pickName(q.author?.name, q.language),
      workTitle: q.work?.title ? pickName(q.work.title, q.language) : q.source?.title,
      ref: buildRef(q),
    }));
    cache = bucketize(mapped.length ? mapped : FALLBACK);
    return cache;
  } catch (err) {
    console.warn("[sanity] failed to fetch quotes, using fallback:", err);
    cache = bucketize(FALLBACK);
    return cache;
  }
}

// Round-robin interleave by author so the rotation cycles through different
// voices (Aurelius → Seneca → Epictetus → …) instead of the most recent
// author dominating the start of the feed.
function interleaveByAuthor(quotes: SiteQuote[]): SiteQuote[] {
  const buckets = new Map<string, SiteQuote[]>();
  for (const q of quotes) {
    const key = q.authorId ?? q.authorName ?? "unknown";
    if (!buckets.has(key)) buckets.set(key, []);
    buckets.get(key)!.push(q);
  }
  const lanes = Array.from(buckets.values());
  const out: SiteQuote[] = [];
  let drained = 0;
  let i = 0;
  while (drained < lanes.length) {
    drained = 0;
    for (const lane of lanes) {
      if (i < lane.length) out.push(lane[i]);
      else drained++;
    }
    i++;
  }
  return out;
}

function bucketize(quotes: SiteQuote[]) {
  const ru = interleaveByAuthor(quotes.filter((q) => q.lang === "ru"));
  const en = interleaveByAuthor(quotes.filter((q) => q.lang === "en"));
  return {
    ru: ru.length ? ru : FALLBACK.filter((q) => q.lang === "ru"),
    en: en.length ? en : FALLBACK.filter((q) => q.lang === "en"),
  };
}
