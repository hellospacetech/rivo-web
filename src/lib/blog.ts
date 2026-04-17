export interface BlogPost {
  slug: string;
  category: string;
  readTime: string;
  date: string;
  titleKey: string;
  descKey: string;
  contentKeys: string[];
  gradient?: string;
  bg?: string;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "risk-profiles/how-to-pick-yours",
    category: "Risk profiles",
    readTime: "6 min read",
    date: "2026-04-10",
    titleKey: "post1Title",
    descKey: "post1Desc",
    contentKeys: [
      "post1Intro",
      "post1Section1Title",
      "post1Section1Body",
      "post1Section2Title",
      "post1Section2Body",
      "post1Section3Title",
      "post1Section3Body",
      "post1Conclusion",
    ],
    gradient: "linear-gradient(180deg, #b2d5ff 0%, #dfd1ff 100%)",
  },
  {
    slug: "markets/reading-fed-signals",
    category: "Markets",
    readTime: "9 min read",
    date: "2026-04-03",
    titleKey: "post2Title",
    descKey: "post2Desc",
    contentKeys: [
      "post2Intro",
      "post2Section1Title",
      "post2Section1Body",
      "post2Section2Title",
      "post2Section2Body",
      "post2Section3Title",
      "post2Section3Body",
      "post2Conclusion",
    ],
    bg: "#e4f222",
  },
];

export function getPostBySlug(slug: string) {
  return BLOG_POSTS.find((p) => p.slug === slug);
}
