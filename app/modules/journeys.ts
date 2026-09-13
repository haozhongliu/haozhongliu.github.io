export const writingHighlightTerms = [
  "modern poetry",
  "One Night in March",
  "editorial and media work",
  "head of the Writing Department",
  "Branding and Communications Center",
  "ZJU-UIUC Institute",
  "Student Union's Publicity and New Media Center",
  "Vision Film",
  "over 90",
  "campus debate team",
] as const;

export type JourneysBlockId = "writing" | "traveling" | "music";

export type JourneysBlock = {
  id: JourneysBlockId;
  label: string;
  kicker: string;
  title: string;
  content: string;
};

export const journeysModule = {
  id: "journeys",
  index: "04",
  title: "Notes",
  blocks: [
    {
      id: "writing",
      label: "Writing",
      kicker: "Personal Practice",
      title: "Writing",
      content:
        "I have a deep interest in modern poetry and have compiled a personal collection of poems, with some published. I also ran a poetry blog, One Night in March (“三月某晚”). To me, poetry expresses subtle emotions through metaphor and language.\n\nI have been actively involved in editorial and media work. I currently serve as the head of the Writing Department at the Branding and Communications Center of the ZJU-UIUC Institute, and previously worked with the Student Union's Publicity and New Media Center, where I planned and wrote dozens of articles and media posts.\n\nI also co-created a blog called Vision Film (“视界胶卷”), focused on photography and essays, which has been updated weekly for over 110 consecutive weeks.\n\nI'm a member of the campus debate team. Also, I have kept a diary for nearly seven years. Writing for me is both a way of observing the world and of understanding myself.",
    },
    {
      id: "traveling",
      label: "Traveling",
      kicker: "Places and Moments",
      title: "Traveling",
      content:
        "A personal map of places that shaped how I see the world.",
    },
    //{
    //  id: "music",
    //  label: "Music",
    //  kicker: "Listening and Making",
    //  title: "Music",
    //  content:
    //    "Use this area for playlists, favorite albums, and your own music projects.",
    //},
  ] satisfies readonly JourneysBlock[],
} as const;
