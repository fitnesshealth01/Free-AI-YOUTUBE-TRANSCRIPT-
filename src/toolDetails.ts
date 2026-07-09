export const DEDICATED_TOOL_DETAILS: Record<string, {
  tagline: string;
  badge: string;
  features: string[];
  howItWorks: string;
  faqs: { q: string; a: string }[];
}> = {
  transcript: {
    tagline: "Generate flawless punctuated transcripts with interactive clickable timestamps.",
    badge: "100% Accurate",
    features: [
      "Clickable Timestamps: Click any line to sync and play the video from that exact moment.",
      "Smart Paragraph Punctuation: Automatically segments speech into readable, grammatically correct sections.",
      "Multi-Format Export: Export your raw transcript in Plain Text, SRT Subtitles, or structured JSON formats.",
      "Search and Filter: Instantly locate terms, keywords, and topics across the entire video timeline."
    ],
    howItWorks: "Our client-side AI parsing algorithm processes public video subtitle metadata and automatically reconstructs spacing, capitalizations, and timestamps fully in-browser, bypassing heavy server queues.",
    faqs: [
      { q: "Is there a limit on video length?", a: "No! You can transcribe videos of any length, from 30-second Shorts to 10-hour deep dives." },
      { q: "Can I download SRT subtitles for editing?", a: "Absolutely! Just click 'Export' and select the SRT format to download standard subtitle tracks ready for Premiere or DaVinci." },
      { q: "Does this require sign-up?", a: "No, this tool is 100% free with no account creation or subscription required." }
    ]
  },
  summary: {
    tagline: "Get short, detailed, and executive takeaways from any video instantly.",
    badge: "Executive Quality",
    features: [
      "Short Synopsis: A quick 2-sentence elevator pitch summarizing the video's core concept.",
      "Detailed Summary: A structured deep dive breaking down every major section and main argument.",
      "Executive Takeaway: High-level summary designed specifically for busy professionals.",
      "Bullet Takeaways: Interactive list of key highlights, stats, and major quotes."
    ],
    howItWorks: "Our engine parses the video transcripts, compiles thematic segments, and generates structured, multi-tier summaries index locally, saving you hours of playback time.",
    faqs: [
      { q: "How detailed are the summaries?", a: "You can toggle between short, detailed, and executive summary lengths depending on your needs." },
      { q: "Can I copy the takeaways?", a: "Yes! There are dedicated copy buttons for each section of the summary." },
      { q: "Does it work on podcasts?", a: "Yes, it works exceptionally well on podcasts, interviews, and long-form panel discussions." }
    ]
  },
  blog: {
    tagline: "Convert any YouTube video into a fully formatted, SEO-ready article.",
    badge: "SEO Engineered",
    features: [
      "Dynamic Table of Contents: Automatically builds a clickable index based on main topics.",
      "SEO H2 & H3 Headers: Properly structured heading hierarchy optimized for Google ranking.",
      "Integrated FAQs: Generates common search queries and answers related to the video content.",
      "Structured Markdown: Perfectly formatted markdown with code snippets, quotes, and italics."
    ],
    howItWorks: "Our AI analyzes narrative arcs and translates spoken words into highly readable editorial prose, complete with paragraph styling, key takeaways, and conclusions.",
    faqs: [
      { q: "Is the output article plagiarized?", a: "No. The generator writes completely unique, brand-new phrasing based on the concepts mentioned in the video." },
      { q: "Can I publish this on Medium or WordPress?", a: "Yes! The output is exported in standard Markdown, which is natively supported by Medium, Dev.to, and WordPress." },
      { q: "Does it format code snippets?", a: "Yes, for tech videos, code blocks are properly enclosed in markdown code blocks with syntax styling." }
    ]
  },
  social: {
    tagline: "Generate viral, high-retention content for X, LinkedIn, Instagram, and Facebook.",
    badge: "Virality Boost",
    features: [
      "X/Twitter Threads: 5-part engagement threads designed to trigger the algorithm.",
      "LinkedIn Authority Posts: Professional summaries with bold call-to-actions and tags.",
      "Instagram Bullet Hooks: Eye-catching carousel text drafts to hook readers.",
      "Facebook Outreach Posts: Casual story-driven captions optimized for sharing."
    ],
    howItWorks: "The content model extracts the core emotional hooks and data-driven stats from the video, repurposing them into templates structured for maximum scroll-stopping engagement.",
    faqs: [
      { q: "Does it include hashtags?", a: "Yes, relevant, trending hashtags are automatically generated for each platform." },
      { q: "Can I customize the tone?", a: "Yes, the social hub formats content according to the natural style of each platform." },
      { q: "Is this tool safe from social shadowbans?", a: "Absolutely. Content is organic and structured naturally to ensure high platform engagement." }
    ]
  },
  chapters: {
    tagline: "Generate perfectly structured video chapters, milestones, and timeline tags.",
    badge: "Creator Friendly",
    features: [
      "Copyable Timeline Tags: Direct copy formats that can be pasted straight into YouTube descriptions.",
      "Milestone Titles: Engaging, curiosity-inducing section headers instead of generic ones.",
      "Precise Offsets: Accurate millisecond timestamps aligning with logical video transition points.",
      "Visual Pacing Map: Graphic summary of video pacing and structural milestones."
    ],
    howItWorks: "Our chapter engine scans for long silence transitions, visual slides, slide shifts, and narrative cues to segment the video into perfect logical parts.",
    faqs: [
      { q: "Can I paste this directly into YouTube?", a: "Yes! The copy format is standard YouTube chapter format (e.g., '01:23 Introduction'). Paste it into your description to activate chapters." },
      { q: "Will this help with Google SEO?", a: "Definitely. YouTube chapters are indexed by Google Search and show up as 'Key Moments' in search results." },
      { q: "Can I adjust the chapter density?", a: "Yes, chapters align dynamically with the natural pacing of the video." }
    ]
  },
  seo: {
    tagline: "Optimize your video metadata, search keywords, hashtags, and description drafts.",
    badge: "Rankings Boost",
    features: [
      "Optimized Titles: High-CTR video title variations utilizing psychological curiosity hooks.",
      "Comprehensive Descriptions: Structured descriptions including social links and chapters layout.",
      "High-Volume Tags: Curated lists of high, medium, and low competition keywords.",
      "Clickability Score: Instant evaluation of metadata keyword density and search potential."
    ],
    howItWorks: "The toolkit indexes high-frequency search terms from the transcript and benchmarks them against common creator keyword models to give you ready-to-paste SEO structures.",
    faqs: [
      { q: "How many tags are generated?", a: "It generates up to 30 high-ranking tags, categorized by search volume." },
      { q: "Does it generate description templates?", a: "Yes, it creates a fully structured boilerplate including sections for links and tags." },
      { q: "Will this double my search traffic?", a: "While traffic depends on content quality, using these keywords significantly increases indexing probability." }
    ]
  },
  quotes: {
    tagline: "Extract inspirational, educational, and shareable quotes automatically.",
    badge: "Insight Extractor",
    features: [
      "Key Assertions: Core logical claims made by the speaker formatted as high-impact statements.",
      "Inspirational Quotes: Beautiful, shareable expressions of wisdom and insight.",
      "Memes & Jokes: Humorous or casual remarks extracted directly from natural speech.",
      "Context References: Exact timestamp links showing the context of each quote."
    ],
    howItWorks: "By scanning syntax density, semantic pauses, and rhetorical stress patterns in the transcribings, the model highlights quotes that carry the highest emotional or intellectual weight.",
    faqs: [
      { q: "Can I export quotes as images?", a: "Currently you can copy quotes; we suggest combining them with our social hub for graphics templates." },
      { q: "Are the quote timestamps clickable?", a: "Yes! Click the timestamp to hear the speaker deliver that exact quote." },
      { q: "Does it filter out filler words?", a: "Yes, filler words like 'uh' and 'um' are automatically pruned for clean, beautiful quotes." }
    ]
  },
  translation: {
    tagline: "Translate transcripts into 10+ global languages seamlessly with zero delay.",
    badge: "Global Reach",
    features: [
      "Multi-Language Engine: High-fidelity translations into Spanish, French, Japanese, and more.",
      "Preserved Timestamps: Language offsets remain perfectly aligned with video playback.",
      "SEO Localization: Subtitle outputs ready to be uploaded to YouTube CC dashboard.",
      "Interactive Parallel View: Compare original and translated text side-by-side."
    ],
    howItWorks: "Our localization engine maps the semantic meanings of phrases (not just literal words) into target language sets, ensuring professional-grade translation without awkward syntax.",
    faqs: [
      { q: "Is the translation literal?", a: "No, it employs context-aware phrase mapping to preserve natural idioms and conversational tones." },
      { q: "Can I download translated SRTs?", a: "Yes! Toggle your language, select the export button, and download the localized subtitle file." },
      { q: "Will this help reach international audiences?", a: "Absolutely. Multi-language subtitles are the #1 way to double your global viewer base on YouTube." }
    ]
  },
  knowledge_graph: {
    tagline: "Visualize key concepts, subtopics, and relationships in a dynamic mind map.",
    badge: "Interactive Graph",
    features: [
      "Dynamic Mind Map: Beautiful canvas visualizing parent-child topic relationships.",
      "Interactive Nodes: Click any concept node to reveal detailed summaries and definitions.",
      "Thematic Clustering: Color-coded categories grouping similar ideas and technical terms.",
      "Perfect Study Companion: Ideal for visual learners wanting a structural layout of the video."
    ],
    howItWorks: "We run a semantic noun-phrase clustering pass over the content index, building an interactive force-directed mapping of connected concepts and definitions.",
    faqs: [
      { q: "Can I download the graph image?", a: "Yes, the nodes are fully interactive and responsive to container adjustments." },
      { q: "Does it work on complex technical topics?", a: "It is designed specifically for complex educational content, coding tutorials, and science lectures." },
      { q: "Can I expand and collapse nodes?", a: "Yes! Interactive node toggling is supported natively on the canvas." }
    ]
  },
  faq: {
    tagline: "Automatically generate frequently asked questions and model answers.",
    badge: "User Engagement",
    features: [
      "Match-Answering Engine: Generates highly accurate answers using exact transcript references.",
      "Schema-Ready Markup: Ready to be structured for Google rich search result carousels.",
      "Curiosity Q&As: Questions optimized to satisfy common user inquiries in search engines.",
      "Clickable Indices: Rapid navigation across generated Q&A listings."
    ],
    howItWorks: "The algorithm isolates central query points that viewers might ask after watching, pairing them with comprehensive summaries drawn directly from video evidence.",
    faqs: [
      { q: "Can I use these for school/study?", a: "Yes! These make excellent study review guides or website FAQ sections." },
      { q: "Does this help website SEO?", a: "Yes, implementing FAQ schema markup is highly effective for getting featured answers on Google search pages." },
      { q: "Are the answers fully accurate?", a: "Yes, answers are strictly grounded in the actual facts stated inside the video." }
    ]
  },
  study: {
    tagline: "Generate notes, flashcards, and an interactive quiz from any video.",
    badge: "Ultimate Learning",
    features: [
      "Interactive Flashcards: Double-sided memory cards to test key terminology.",
      "Custom Multi-Choice Quizzes: Automatically graded quizzes matching video details.",
      "Polished Notes Outline: Academic-style notes structured for quick revision.",
      "Real-Time Grading: Instant feedback with answers verification indicators."
    ],
    howItWorks: "The study engine compiles technical definitions and facts, converting them into active-recall questions, flashcard decks, and revision modules fully client-side.",
    faqs: [
      { q: "Can I repeat the quizzes?", a: "Yes! Reset and retake quizzes as many times as you like." },
      { q: "How many flashcards are created?", a: "A custom deck of high-utility flashcards is compiled for each video topic." },
      { q: "Does this work on university lectures?", a: "Perfect for lectures! It turns hours of recording into a structured study workstation instantly." }
    ]
  },
  action_items: {
    tagline: "Instantly build checkable task lists and priority frameworks.",
    badge: "Productivity",
    features: [
      "Checkable Checklist: Interactive to-do lists tracking your learning actions.",
      "Eisenhower Priority Matrix: Groups tasks into Urgent, Important, and Backlog.",
      "Time-Bounded Steps: Estimates duration required for each actionable step.",
      "Direct Progress Tracker: Visual completion bar showing checked tasks progress."
    ],
    howItWorks: "The parser extracts instructions, recommendations, and commands made in the video, restructuring them into a professional productivity tracker.",
    faqs: [
      { q: "Can I save my checked items?", a: "Progress is preserved live in your active browser session." },
      { q: "How does it decide priority?", a: "It benchmarks stated urgency cues (e.g., 'must-do', 'important') to place items in the priority quadrants." },
      { q: "Is this useful for tutorials?", a: "Extremely useful! It translates software or project tutorials into clear actionable checklists." }
    ]
  },
  shorts_clipper: {
    tagline: "Identify virality hotspots, hook matrices, and vertical short scripts.",
    badge: "Virality Engine",
    features: [
      "Virality Score Rating: Highlights segment times with high emotional interest and CTR potential.",
      "Hook Angle Multiplier: Generates Curiosity, Controversy, Stat-driven, and Action-driven hooks.",
      "9:16 Script Outlines: Standard teleprompter scripts styled for vertical formatting.",
      "Visual Storyboard Directions: Recommends cuts, pacing, and visual sound cues for editing."
    ],
    howItWorks: "By evaluating semantic energy surges and topical densities, the model identifies standard highlights, pairing them with viral copywriting hooks.",
    faqs: [
      { q: "Do these work on TikTok?", a: "Yes! Hook angles are customized for TikTok, Shorts, and Instagram Reels retention algorithms." },
      { q: "Are there watermarks on scripts?", a: "Absolutely not. All scripts, hook assets, and storyboards are 100% free with no watermarks." },
      { q: "How do I use the hooks?", a: "Copy-paste them into your video subtitles or descriptions to boost retention within the first 3 seconds." }
    ]
  },
  thumbnail_grabber: {
    tagline: "Extract MaxRes/HD thumbnails and run real-time contrast and composition analysis.",
    badge: "CTR Booster",
    features: [
      "MaxRes HD Extractions: Download standard thumbnail resolutions up to 1080p directly.",
      "Eye-Tracking Heatmap: Simulates audience visual focus clusters using ambient overlay shadows.",
      "Contrast Scoreboard: Evaluates text readability and focal balance compositions.",
      "Simulated A/B Split-Testing: Predicts CTR potential against standard industry competitors."
    ],
    howItWorks: "The tool fetches public YouTube thumbnail indices directly and runs a client-side contrast, lighting, and composition model, overlaying eye-tracking heatmaps dynamically.",
    faqs: [
      { q: "What is a good CTR rating?", a: "An overall score of 80+ indicates strong contrast and high clickability potential." },
      { q: "Can I input custom video links?", a: "Yes! Paste any YouTube video URL into the thumbnail sandbox to extract its images." },
      { q: "How is the heatmap calculated?", a: "It simulates a visual attention saliency map based on color contrast, faces, and text elements." }
    ]
  },
  script_writer: {
    tagline: "Write professional YouTube scripts with visual cue guides, custom hook structures, and pacing hints.",
    badge: "Director Studio",
    features: [
      "Multi-Section Script: Dynamic scripts featuring Hook, Introduction, Core Chapters, and Outro.",
      "Visual Storyboard Cue: Suggests precise camera angles, slides, and transitions.",
      "Audio & SFX Recommendations: Recommends specific background audio tones and sound effects.",
      "Live Scrolling Teleprompter: Fully functional teleprompter with speed control to rehearse.",
    ],
    howItWorks: "Our script generator restructures topical arguments into highly engaging, pacing-optimized scripts tailored for spoken-word delivery.",
    faqs: [
      { q: "Can I adjust the script duration?", a: "Yes! You can toggle target durations from 30-second shorts to 10-minute deep dives." },
      { q: "Does the teleprompter scroll automatically?", a: "Yes, click 'Start Prompter' to rehearse reading with smooth scrolling text." },
      { q: "Can I copy the raw script?", a: "Yes, there is a one-click button to copy the entire production script to your clipboard." }
    ]
  }
};
