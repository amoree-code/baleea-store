import { defineArrayMember, defineField, defineType } from "sanity";

export const offer = defineType({
  name: "offer",
  title: "عرض",
  type: "document",
  fields: [
    defineField({ name: "title", title: "اسم العرض", description: "مثلاً: بكج تساقط الشعر", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", title: "رابط الصفحة", type: "slug", options: { source: "title" }, validation: (r) => r.required() }),
    defineField({
      name: "products",
      title: "المنتجات",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: [{ type: "product" }] })],
      validation: (r) => r.min(1),
    }),
    defineField({ name: "price", title: "سعر البكج (دينار)", type: "number", validation: (r) => r.min(0).integer() }),
    defineField({ name: "description", title: "الوصف", type: "text", rows: 3 }),
    defineField({ name: "active", title: "العرض شغّال", type: "boolean", initialValue: true }),
  ],
});
