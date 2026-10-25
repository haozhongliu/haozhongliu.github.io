export type SocialLink = {
  label: string;
  url: string;
  iconSrc: string;
};

export const aboutHighlightTerms = [
  "Haozhong Liu",
  "Computer Engineering",
  "Zhejiang University (ZJU)",
  "University of Illinois Urbana-Champaign (UIUC)",
  "Human-Computer Interaction (HCI)",
  "Human-Agent Collaboration",
  "AI-mediated Decision-making",
  "Visualization",
  "VAI Group",
  "Prof. Wei Chen",
  "Dr. Wei Zhang",
  "June 2028",
  "continue my research in the United States",
  "traveling",
  "poetry",
  "music",
] as const;

export const aboutModule = {
  id: "about",
  index: "01",
  title: "About",
  paragraphs: [
    "Hi, I’m Haozhong Liu :)",
    "I am a junior undergraduate in Computer Engineering, pursuing dual bachelor’s degrees at the [University of Illinois Urbana-Champaign (UIUC)](https://illinois.edu/) and [Zhejiang University (ZJU)](https://www.zju.edu.cn/english/), [ZJUI](https://zjui.intl.zju.edu.cn/en) Class of 2028. ",
    "My interests include Human-Computer Interaction (HCI), Human-Agent Collaboration, AI-mediated Decision-making, and Visualization. I am particularly interested in how interactive design can support understanding, design, and creative thinking. I am currently working in the [VAI Group](https://zjuvai.cn/) in [the State Key Lab of CAD&CG](http://fit.zju.edu.cn/fitenglish/2019/0815/c36390a1484193/page.htm) at ZJU, advised by [Prof. Wei Chen](http://www.cad.zju.edu.cn/home/chenwei/) and [Dr. Wei Zhang](https://zwstart.github.io/). I am also open to collaborations and new research opportunities! I expect to graduate in June 2028 and plan to continue my research in the United States. Please feel free to reach out if you think there may be a good research fit!",
    "Outside research, I enjoy traveling, poetry, and music. My CV: [PDF](/pdfs/Haozhong%20Liu%20CV.pdf).",
    "Email: [hl123@illinois.edu](mailto:hl123@illinois.edu) ",
    
  ],
  image: {
    src: "/me.png",
    alt: "Portrait of Haozhong Liu (Kayl)",
  },
  socialLinks: [
    { label: "Email", url: "mailto:hl123@illinois.edu", iconSrc: "/social-icons/email.png" },
    { label: "LinkedIn", url: "https://www.linkedin.com/in/haozhong-liu-991887435/", iconSrc: "/social-icons/li.png" },
    { label: "Google Scholar", url: "https://scholar.google.com/citations?user=dgUE404AAAAJ&hl=en&oi=ao", iconSrc: "/social-icons/gs.png" },
    //{ label: "GitHub", url: "https://github.com/haozhongliu", iconSrc: "/social-icons/gh.png" },
    { label: "CV", url: "/pdfs/Haozhong%20Liu%20CV.pdf", iconSrc: "/social-icons/cv.png" },
  ] satisfies readonly SocialLink[],
} as const;
