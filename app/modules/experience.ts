export type ExperienceBlockId = "activities" | "honors";

export type ExperienceItem = {
  title: string;
  description?: string;
};

export type ExperienceBlock = {
  id: ExperienceBlockId;
  label: string;
  kicker: string;
  title: string;
  items: ExperienceItem[];
};

export const experienceModule = {
  id: "experience",
  index: "03",
  title: "Experience",
  blocks: [
    {
      id: "honors",
      label: "Honors",
      kicker: "Achievements",
      title: "Honors",
      items: [
        {
          title: "Undergraduate Academic Star Program, Zhejiang University",
          description: "Received RMB 20,000 ($2800) in individual research funding. ",
        },
        {
          title: "Key Innovation Project, Zhejiang University",
          description: "Received RMB 8,000 ($1100) in individual research funding. ",
        },
        {
          title: "Undergraduate Honors, Zhejiang University (2024–2025)",
          description: "Recognized for Academic Excellence, Innovation & Entrepreneurship, and Student Service.",
        },
        {
          title: "Second Scholarship, Zhejiang University (2024–2025)",
          description: "Awarded for outstanding academic performance and overall achievement.",
        },
        {
          title: "National Gold Award, China International College Students’ Innovation Competition (2025)",
          description: "Awarded for the BioElectro project, an AI-assisted mental health screening system based on connective-tissue bioelectrical signals.",
        },
        {
          title: "First Prize, 8th World Robot Contest (WRCC)",
          description: "Awarded first prize in the “Jiugong” category at the World Robot Contest.",
        },
        {
          title: "Champion, 37th Odyssey of the Mind World Finals",
          description: "Won the championship in \"The Story of Fishing\" at the 37th Odyssey of the Mind World Finals.",
        },
        {
          title: "Champion, 2025 UIUC Rhetoric Essay Contest" 
        },
      ],
    },
    {
      id: "activities",
      label: "Activities",
      kicker: "Activities",
      title: "Activities",
      items: [
        {
          title: "Oral Presentation at ChinaVis 2026",
        },
        {
          title: "Oral Presentation at UIST 2026 (Upcoming)",
        },
        {
          title: "Delegate, 8th Zhejiang University Student Congress",
        },
      ],
    },
  ] satisfies readonly ExperienceBlock[],
} as const;
