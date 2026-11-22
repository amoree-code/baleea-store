import { defineField, defineType } from "sanity";

export const review = defineType({
  name: "review",
  title: "رأي زبونة",
  type: "document",
  fields: [
    defineField({ name: "image", title: "الصورة", type: "image", validation: (r) => r.required() }),
    defineField({ name: "quote", title: "شنو گالت", type: "text", rows: 3 }),
    defineField({ name: "product", title: "المنتج", type: "reference", to: [{ type: "product" }] }),
    defineField({
      name: "consent",
      title: "الزبونة وافقت ننشر الصورة",
      description: "بدون موافقة ما تطلع بالموقع",
      type: "boolean",
      initialValue: false,
      validation: (r) => r.required(),
    }),
  ],
});
