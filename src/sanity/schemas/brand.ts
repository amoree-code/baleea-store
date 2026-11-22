import { defineField, defineType } from "sanity";

export const brand = defineType({
  name: "brand",
  title: "براند",
  type: "document",
  fields: [
    defineField({ name: "name", title: "الاسم", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", title: "رابط الصفحة", type: "slug", options: { source: "name" }, validation: (r) => r.required() }),
    defineField({ name: "about", title: "نبذة", type: "text", rows: 3 }),
  ],
});
