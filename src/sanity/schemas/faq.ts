import { defineField, defineType } from "sanity";

export const faq = defineType({
  name: "faq",
  title: "سؤال متكرر",
  type: "document",
  fields: [
    defineField({ name: "question", title: "السؤال", type: "string", validation: (r) => r.required() }),
    defineField({ name: "answer", title: "الجواب", type: "text", rows: 4, validation: (r) => r.required() }),
    defineField({ name: "order", title: "الترتيب", type: "number", initialValue: 0 }),
  ],
});
