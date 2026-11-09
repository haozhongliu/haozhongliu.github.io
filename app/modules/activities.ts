export type Activity = {
  title: string;
  // Only activities with a slug get a detail page and a link.
  slug?: string;
  images?: { src: string; alt: string }[];
  paragraphs?: string[];
};

export const activities: Activity[] = [
  {
    slug: "uist-2026",
    title: "Full-Paper Oral Presentation at UIST 2026",
    images: [
      { src: "/uist.jpg", alt: "UIST 2026" },
      { src: "/uist1.jpg", alt: "UIST 1" },
      { src: "/uist2.jpg", alt: "UIST 1" },
      { src: "/uist3.jpg", alt: "UIST 1" },
      { src: "/uist4.jpg", alt: "UIST 1" },
    ],
    paragraphs: ["I presented our paper ArtAnno at UIST'26 with Prof. Yifang Wang in Detroit, Michigan."],
  },
  {
    slug: "chinavis-2026",
    title: "Full-Paper Oral Presentation at ChinaVis 2026",
    images: [
      { src: "/chinavis.jpg", alt: "ChinaVis 2026" },
      { src: "/chinavis1.jpg", alt: "ChinaVis 2026" },
      { src: "/chinavis2.jpg", alt: "ChinaVis 2026" },
      { src: "/chinavis3.jpg", alt: "ChinaVis 2026" },
    ],
    paragraphs: ["I presented our paper CHCVis at CHinaVis'26 in Guiyang."],
  },
  {
    title: "Delegate, 8th Zhejiang University Student Congress",
  },
];

export const activitiesWithPage = activities.filter(
  (activity): activity is Activity & { slug: string } => Boolean(activity.slug),
);

export function getActivity(slug: string) {
  return activitiesWithPage.find((activity) => activity.slug === slug);
}
