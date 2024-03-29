import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import {
  SITE_TITLE_RU,
  SITE_TITLE_EN,
  SITE_DESCRIPTION_EN,
  SITE_DESCRIPTION_RU,
} from "../consts";

// const { lang } = Astro.props;

export async function GET(context) {
  const posts = await getCollection("blog");
  //const TITLE = lang === "ru" ? SITE_TITLE_RU : SITE_TITLE_EN;
  // const DESCRIPTION = lang === "ru" ? SITE_DESCRIPTION_RU : SITE_DESCRIPTION_EN;
  return rss({
    title: SITE_TITLE_EN,
    description: SITE_DESCRIPTION_EN,
    site: context.site,
    items: posts.map((post) => ({
      ...post.data,
      link: `/blog/${post.slug}/`,
    })),
  });
}
