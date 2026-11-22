// Builds scripts/seed/seed.ndjson from docs/baleea-content.md (hand-transcribed below).
// Deterministic _ids → re-running the import with --replace is idempotent.
// Prices are null (not published by the store); status defaults to "available" until the owner corrects it.
import { writeFileSync } from "node:fs";

const ref = (id) => ({ _type: "reference", _ref: id });
const refs = (ids) => ids.map((id, i) => ({ ...ref(id), _key: `k${i}` }));
const slug = (s) => ({ _type: "slug", current: s });

const brands = [
  ["balea", "Balea"], ["balea-vital", "Balea Vital"], ["balea-beauty-expert", "Balea Beauty Expert"],
  ["balea-natural-beauty", "Balea Natural Beauty"], ["isana", "ISANA"], ["alverde", "Alverde"],
].map(([s, name]) => ({ _id: `brand-${s}`, _type: "brand", name, slug: slug(s) }));

const concerns = [
  ["acne", "حب الشباب", "تنظيف عميق وتقشير بالساليسيليك"],
  ["pigmentation", "التصبغات والبقع", "فيتامين سي ونياسيناميد"],
  ["anti-aging", "التجاعيد", "Q10 وترطيب يشد البشرة"],
  ["sensitive", "البشرة الحساسة", "بدون عطور ولا بارابين"],
  ["hair-loss", "تساقط الشعر", "كافيين وتقوية الجذور"],
  ["damaged-hair", "الشعر الجاف والتالف", "ترطيب ونعومة بدون سيليكون"],
].map(([s, title, hint], i) => ({ _id: `concern-${s}`, _type: "concern", title, hint, slug: slug(s), order: i }));

const P = (o) => ({
  _type: "product",
  status: "available",
  isNew: false,
  ...o,
  _id: `product-${o.slug}`,
  slug: slug(o.slug),
  brand: ref(`brand-${o.brand}`),
  concerns: refs((o.concerns ?? []).map((c) => `concern-${c}`)),
});

const products = [
  P({ slug: "balea-vitamin-c-serum", brand: "balea", category: "skin", nameLatin: "Vitamin C Serum", nameAr: "سيروم فيتامين سي",
      summary: "سيروم لإشراق البشرة وتوحيد لونها.", concerns: ["pigmentation"], keyIngredients: ["فيتامين سي"] }),
  P({ slug: "balea-vitamin-c-dunkle-flecken-aufheller", brand: "balea", category: "skin", nameLatin: "Vitamin C Dunkle Flecken Aufheller",
      nameAr: "مفتّح البقع الداكنة بفيتامين سي", summary: "يفتّح البقع الداكنة بفيتامين سي والنياسيناميد، والنتيجة تبين بعد 4 أسابيع.",
      concerns: ["pigmentation"], keyIngredients: ["فيتامين سي", "نياسيناميد"] }),
  P({ slug: "balea-q10-anti-falten-serum", brand: "balea", category: "skin", nameLatin: "Q10 Anti-Falten Serum", nameAr: "سيروم Q10 ضد التجاعيد",
      summary: "ضد التجاعيد ويشد البشرة.", concerns: ["anti-aging"], keyIngredients: ["Q10"] }),
  P({ slug: "balea-q10-anti-falten-augencreme", brand: "balea", category: "skin", nameLatin: "Q10 Anti-Falten Augencreme", nameAr: "كريم عين Q10 ضد التجاعيد",
      summary: "ضد التجاعيد حول العين ويشد البشرة.", concerns: ["anti-aging"], keyIngredients: ["Q10"] }),
  P({ slug: "balea-q10-anti-falten-tagescreme-lsf-15", brand: "balea", category: "skin", nameLatin: "Q10 Anti-Falten Tagescreme LSF 15",
      nameAr: "كريم نهاري Q10 مع واقي SPF15", summary: "كريم نهاري ضد التجاعيد بحماية من الشمس.", concerns: ["anti-aging"], keyIngredients: ["Q10"] }),
  P({ slug: "balea-q10-anti-falten-nachtcreme", brand: "balea", category: "skin", nameLatin: "Q10 Anti-Falten Nachtcreme", nameAr: "كريم ليلي Q10 ضد التجاعيد",
      summary: "كريم ليلي ضد التجاعيد يشد البشرة.", concerns: ["anti-aging"], keyIngredients: ["Q10"] }),
  P({ slug: "balea-vital-tagescreme", brand: "balea-vital", category: "skin", nameLatin: "Tagescreme", nameAr: "كريم نهاري فايتل",
      summary: "يحارب التجاعيد والخطوط الدقيقة، ترطيب مكثف ويشد البشرة.", concerns: ["anti-aging"] }),
  P({ slug: "balea-vital-nachtcreme", brand: "balea-vital", category: "skin", nameLatin: "Nachtcreme", nameAr: "كريم ليلي فايتل",
      summary: "يحارب التجاعيد والخطوط الدقيقة، ترطيب مكثف ويشد البشرة.", concerns: ["anti-aging"] }),
  P({ slug: "balea-ultra-sensitive-waschgel", brand: "balea", category: "skin", nameLatin: "Ultra Sensitive Waschgel", nameAr: "غسول البشرة الحساسة جداً",
      summary: "يهدّي البشرة ويحافظ على توازنها، للاستخدام اليومي، ومناسب للبشرة الجافة والمتهيجة.",
      concerns: ["sensitive"], freeFrom: ["fragrance", "parabens", "dyes"],
      reelUrl: "https://www.instagram.com/baleea__/reel/DY0Qkvfsn6s/" }),
  P({ slug: "balea-beauty-expert-peeling-cleanser", brand: "balea-beauty-expert", category: "skin", nameLatin: "Peeling Cleanser", nameAr: "غسول مقشّر",
      summary: "تقشير كيميائي خفيف بأحماض طبيعية تشيل الجلد الميت بلطف، للاستخدام اليومي، ومعتمد جلدياً.", concerns: ["acne"] }),
  P({ slug: "balea-hautrein-3in1", brand: "balea", category: "skin", nameLatin: "Hautrein 3in1", nameAr: "غسول وتقشير وماسك 3 بـ 1",
      summary: "تنظيف وتقشير وماسك بالطين الوردي، ضد الحبوب والرؤوس السوداء.", concerns: ["acne"],
      keyIngredients: ["حمض الساليسيليك", "زنك", "طين وردي"] }),
  P({ slug: "isana-haartonikum-coffein", brand: "isana", category: "hair", nameLatin: "Haartonikum Coffein", nameAr: "تونك الكافيين للشعر",
      summary: "يقوي الجذور ويقلل التساقط ويحفز النمو والكثافة.", howToUse: "يومياً على فروة الراس، بدون غسل.",
      concerns: ["hair-loss"], keyIngredients: ["كافيين"], reelUrl: "https://www.instagram.com/baleea__/reel/DY0RpONM0iE/" }),
  P({ slug: "balea-natural-beauty-avocado-mango", brand: "balea-natural-beauty", category: "hair", nameLatin: "Avocado & Mango", size: "400 ml",
      nameAr: "شامبو أفوكادو ومانجو", summary: "للشعر التالف، 90% مكونات طبيعية، نباتي.", concerns: ["damaged-hair"], freeFrom: ["sulfates", "silicones"] }),
  P({ slug: "balea-natural-beauty-vanille-kakao", brand: "balea-natural-beauty", category: "hair", nameLatin: "Vanille & Kakao",
      nameAr: "فانيلا وكاكاو للشعر الجاف", summary: "يفك التشابك ويعطي نعومة ولمعان، ممتاز للشعر الجاف بالشتاء.",
      concerns: ["damaged-hair"], freeFrom: ["silicones", "sulfates", "microplastics"] }),
  P({ slug: "alverde-kokosoel", brand: "alverde", category: "hair", nameLatin: "Kokosöl", nameAr: "زيت جوز الهند",
      summary: "يرطب البشرة والشعر، ينعّم ويقلل الجفاف.", concerns: ["damaged-hair"] }),
  P({ slug: "balea-deo-creme-natron", brand: "balea", category: "body", nameLatin: "Deo Creme Natron 48h", size: "50 ml",
      nameAr: "كريم مزيل عرق ببيكربونات الصوديوم", summary: "حماية 48 ساعة.", freeFrom: ["alcohol", "aluminium", "parabens", "paraffin"] }),
];

const faqs = [
  ["المنتجات أصلية؟", "نعم، كل المنتجات أصلية 100% ومستوردة من ألمانيا للعراق."],
  ["توصلون للمحافظات؟", "نعم، عدنا توصيل لكل مناطق بغداد وكل محافظات العراق."],
  ["شلون أطلب؟", "اختاري المنتجات اللي تريدينها ودزّي الطلب على الواتساب، ونرجعلج بالتأكيد ووقت التوصيل."],
].map(([question, answer], i) => ({ _id: `faq-${i + 1}`, _type: "faq", question, answer, order: i }));

const docs = [...brands, ...concerns, ...products, ...faqs];
writeFileSync(new URL("./seed.ndjson", import.meta.url), docs.map((d) => JSON.stringify(d)).join("\n") + "\n");
console.log(`seed.ndjson: ${brands.length} brands, ${concerns.length} concerns, ${products.length} products, ${faqs.length} faqs`);
