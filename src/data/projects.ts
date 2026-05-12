export type ProjectI18n = { en: string; ru: string };

export type Project = {
  id: string;
  num: string;
  title: ProjectI18n;
  tag: ProjectI18n;
  desc: ProjectI18n;
  year: number;
  accent: string;
  glyph: string;
  url: string;
  status: ProjectI18n;
  platforms: string;
  stack: string;
};

export const projects: Project[] = [
  {
    id: "meditations",
    num: "I",
    title: { en: "Meditations Reader", ru: "Чтение Марка Аврелия" },
    tag: { en: "Reading app", ru: "Приложение" },
    desc: {
      en: "A focused reader for the Meditations of Marcus Aurelius — chapter-by-chapter, with daily passage and bookmarks.",
      ru: "Приложение для чтения «Размышлений» Марка Аврелия — в разных переводах.",
    },
    year: 2025,
    accent: "#8b1e1e",
    glyph: "M·A",
    url: "https://markus-app.vercel.app/",
    status: { en: "Shipping", ru: "Готово" },
    platforms: "Android, Web",
    stack: "React Native",
  },
  {
    id: "stoics",
    num: "II",
    title: { en: "Stoic Quotes", ru: "Цитаты стоиков" },
    tag: { en: "Mobile app", ru: "Приложение" },
    desc: {
      en: "Daily quote from the great stoics — Aurelius, Seneca, Epictetus. Shuffle, save, share.",
      ru: "Ежедневная цитата от стоиков — Марка Аврелия, Сенеки, Эпиктета.",
    },
    year: 2024,
    accent: "#c9a961",
    glyph: "STOA",
    url: "https://stoic-app-xi.vercel.app/",
    status: { en: "Shipping", ru: "Готово" },
    platforms: "Android, Web",
    stack: "React Native",
  },
  {
    id: "prayers",
    num: "III",
    title: { en: "Antique Prayers", ru: "Античные молитвы" },
    tag: { en: "Reading app", ru: "Приложение" },
    desc: {
      en: "A collection of prayers from antiquity — Greek, Roman — arranged for daily contemplation.",
      ru: "Собрание античых молитв — греческих, римских — исследование и практика молитв.",
    },
    year: 2026,
    accent: "#5d6b3a",
    glyph: "✧",
    url: "https://antique-prayers-web.vercel.app/",
    status: { en: "In progress", ru: "В работе" },
    platforms: "Web",
    stack: "Next.js",
  },
  {
    id: "aurelius",
    num: "IV",
    title: { en: "Aurelius Archive", ru: "Архив Марка Аврелия" },
    tag: { en: "Web archive", ru: "Веб-архив" },
    desc: {
      en: "Every surviving text of Marcus Aurelius gathered in one place — Meditations, letters, speeches.",
      ru: "Все сохранившиеся тексты Марка Аврелия — Размышления, письма, речи.",
    },
    year: 2026,
    accent: "#6b4a2a",
    glyph: "AVR",
    url: "https://readaurelius.org",
    status: { en: "In progress", ru: "В работе" },
    platforms: "Web",
    stack: "Astro",
  },
];

export type WorkshopItem = { title: ProjectI18n; when: string };

export const workshop: WorkshopItem[] = [
  { title: { en: "A pocket Plutarch", ru: "Карманный Плутарх" }, when: "2026·I" },
  { title: { en: "Greek/Latin parallel reader", ru: "Греко-латинский параллельный чтец" }, when: "2026·II" },
  { title: { en: "Liturgy of the hours, simplified", ru: "Литургия часов, упрощённая" }, when: "2026·III" },
];
