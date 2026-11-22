// Ingredient notes from the owner's own captions (docs/baleea-content.md §5).
// Moves to Sanity once she writes more of them.
export type GuideEntry = {
  slug: string;
  title: string;
  latin: string;
  body: string;
  goodFor: string[];
  caution?: string;
  concern?: string;
  query: string;
};

export const guide: GuideEntry[] = [
  {
    slug: "salicylic-acid",
    title: "حمض الساليسيليك",
    latin: "Salicylic Acid (BHA)",
    body: "يدخل عميق بالمسام ويذوّب الدهون الزايدة، ممتاز للرؤوس السوداء، ويقلل الالتهابات والحبوب.",
    goodFor: ["البشرة الدهنية", "الرؤوس السوداء", "الحبوب"],
    caution: "ابدي بيه مرة باليوم، وإذا البشرة جفت قللي الاستخدام.",
    concern: "acne",
    query: "ساليسيليك",
  },
  {
    slug: "sunscreen",
    title: "واقي الشمس",
    latin: "SPF / LSF",
    body: "يحمي من الحروق والتصبغات والتجاعيد اللي تسببها الشمس.",
    goodFor: ["كل أنواع البشرة", "التصبغات", "الوقاية من التجاعيد"],
    caution: "جدديه كل ساعتين إذا أنتِ بالشمس.",
    concern: "pigmentation",
    query: "واقي شمس",
  },
  {
    slug: "vitamin-c",
    title: "فيتامين سي",
    latin: "Vitamin C",
    body: "مضاد أكسدة، يحفز الكولاجين ويفتح التصبغات.",
    goodFor: ["البهتان", "التصبغات", "توحيد اللون"],
    caution: "استخدميه الصبح وبعده واقي شمس.",
    concern: "pigmentation",
    query: "فيتامين سي",
  },
  {
    slug: "retinol",
    title: "الريتينول",
    latin: "Retinol",
    body: "يسرّع تجديد الخلايا ويقلل الخطوط، بس لازم تستخدمينه بالتدريج.",
    goodFor: ["الخطوط الدقيقة", "الملمس", "آثار الحبوب"],
    caution: "بالليل فقط، مرتين بالأسبوع بالبداية، ومو للحوامل.",
    concern: "anti-aging",
    query: "ريتينول",
  },
];
