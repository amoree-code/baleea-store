import { defineField, defineType } from "sanity";

export const concern = defineType({
  name: "concern",
  title: "مشكلة",
  type: "document",
  fields: [
    defineField({ name: "title", title: "العنوان", description: "مثلاً: حب الشباب", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", title: "رابط الصفحة", type: "slug", validation: (r) => r.required() }),
    defineField({ name: "hint", title: "سطر قصير تحت العنوان", type: "string" }),
    defineField({ name: "intro", title: "مقدمة الصفحة", type: "text", rows: 4 }),
    defineField({ name: "order", title: "الترتيب", type: "number", initialValue: 0 }),
  ],
  orderings: [{ title: "الترتيب", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
});
