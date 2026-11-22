// Arabic-aware text normalization for catalog search.
// "كريم البشره" must find "كريم البشرة"; "اسانا" must find "إيسانا".

const TASHKEEL = /[ؐ-ًؚ-ٰٟۖ-ۭ]/g;
const TATWEEL = /ـ/g;

export function normalizeArabic(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "") // Latin accents: "Pflegespülung" ~ "pflegespulung"
    .replace(TASHKEEL, "")
    .replace(TATWEEL, "")
    .replace(/[أإآٱ]/g, "ا")
    .replace(/ة/g, "ه")
    .replace(/ى/g, "ي")
    .replace(/ؤ/g, "و")
    .replace(/ئ/g, "ي")
    .replace(/[٠-٩]/g, (d) => String(d.charCodeAt(0) - 0x0660))
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

// Words shoppers type in Arabic for ingredients and terms printed in Latin on the label.
const ALIASES: [string, string][] = [
  ["فيتامين سي", "vitamin c"],
  ["فيتامين c", "vitamin c"],
  ["كيو 10", "q10"],
  ["كيو10", "q10"],
  ["هيالورونيك", "hyaluron"],
  ["هيالورون", "hyaluron"],
  ["ساليسيليك", "salicyl"],
  ["ريتينول", "retinol"],
  ["نياسيناميد", "niacinamid"],
  ["كافيين", "coffein"],
  ["واقي شمس", "lsf"],
  ["واقي الشمس", "lsf"],
  ["باليا", "balea"],
  ["اسانا", "isana"],
  ["الفيردي", "alverde"],
];

const NORMALIZED_ALIASES = ALIASES.map(([ar, latin]) => [normalizeArabic(ar), latin] as const);

/**
 * The query variants to search with: the normalized query itself, plus the Latin term
 * for any Arabic alias it contains. Results for all variants are merged by the caller.
 */
export function searchVariants(query: string): string[] {
  const q = normalizeArabic(query);
  if (!q) return [];
  const extra = NORMALIZED_ALIASES.filter(([ar]) => q.includes(ar)).map(([, latin]) => latin);
  return [q, ...new Set(extra)];
}
