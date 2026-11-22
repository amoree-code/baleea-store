import { defineArrayMember, defineField, defineType } from "sanity";
import { categoryOptions, freeFromOptions, statusOptions } from "./options";

export const product = defineType({
  name: "product",
  title: "منتج",
  type: "document",
  groups: [
    { name: "main", title: "الأساسي", default: true },
    { name: "details", title: "التفاصيل" },
    { name: "media", title: "الصور" },
  ],
  fields: [
    defineField({ name: "nameAr", title: "الاسم بالعربي", type: "string", group: "main", validation: (r) => r.required() }),
    defineField({
      name: "nameLatin",
      title: "الاسم مثل ما مكتوب عالعلبة",
      description: "مثلاً: Vitamin C Dunkle Flecken Aufheller",
      type: "string",
      group: "main",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      title: "رابط الصفحة",
      description: "اضغطي Generate، ما يحتاج تكتبينه",
      type: "slug",
      group: "main",
      options: { source: "nameLatin", maxLength: 80 },
      validation: (r) => r.required(),
    }),
    defineField({ name: "brand", title: "البراند", type: "reference", to: [{ type: "brand" }], group: "main", validation: (r) => r.required() }),
    defineField({
      name: "category",
      title: "القسم",
      type: "string",
      group: "main",
      options: { list: categoryOptions, layout: "radio", direction: "horizontal" },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "status",
      title: "الحالة",
      type: "string",
      group: "main",
      options: { list: statusOptions, layout: "radio", direction: "horizontal" },
      initialValue: "available",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "price",
      title: "السعر (دينار)",
      description: "اتركيه فارغ إذا تريدين يطلع «اسألي عن السعر»",
      type: "number",
      group: "main",
      validation: (r) => r.min(0).integer(),
    }),
    defineField({
      name: "compareAtPrice",
      title: "السعر قبل الخصم",
      description: "بس إذا المنتج عليه خصم",
      type: "number",
      group: "main",
      validation: (r) =>
        r.min(0).integer().custom((value, ctx) => {
          const price = (ctx.document as { price?: number } | undefined)?.price;
          if (value == null || price == null) return true;
          return value > price || "لازم يكون أكبر من السعر الحالي";
        }),
    }),
    defineField({ name: "size", title: "الحجم", description: "مثلاً: 50 ml", type: "string", group: "main" }),
    defineField({ name: "isNew", title: "وصل جديد", type: "boolean", group: "main", initialValue: false }),
    defineField({
      name: "concerns",
      title: "يفيد لـ",
      type: "array",
      group: "details",
      of: [defineArrayMember({ type: "reference", to: [{ type: "concern" }] })],
    }),
    defineField({ name: "summary", title: "وصف قصير", type: "text", rows: 3, group: "details" }),
    defineField({ name: "benefits", title: "الفوائد", type: "array", group: "details", of: [defineArrayMember({ type: "string" })] }),
    defineField({ name: "howToUse", title: "طريقة الاستخدام", type: "text", rows: 4, group: "details" }),
    defineField({ name: "keyIngredients", title: "المكونات المهمة", type: "array", group: "details", of: [defineArrayMember({ type: "string" })] }),
    defineField({
      name: "freeFrom",
      title: "خالي من",
      type: "array",
      group: "details",
      of: [defineArrayMember({ type: "string" })],
      options: { list: freeFromOptions },
    }),
    defineField({
      name: "images",
      title: "الصور",
      description: "أول صورة هي اللي تطلع بالكتالوج",
      type: "array",
      group: "media",
      of: [
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: [defineField({ name: "alt", title: "وصف الصورة", type: "string" })],
        }),
      ],
    }),
    defineField({ name: "reelUrl", title: "رابط الريل بالانستغرام", type: "url", group: "media" }),
  ],
  orderings: [
    { title: "الأحدث", name: "createdDesc", by: [{ field: "_createdAt", direction: "desc" }] },
    { title: "الاسم", name: "nameAsc", by: [{ field: "nameAr", direction: "asc" }] },
  ],
  preview: {
    select: { title: "nameAr", subtitle: "nameLatin", brand: "brand.name", media: "images.0", status: "status", price: "price" },
    prepare({ title, subtitle, brand, media, status, price }) {
      const s = statusOptions.find((o) => o.value === status)?.title ?? "";
      const p = typeof price === "number" ? `${price.toLocaleString("en-US")} د.ع` : "بدون سعر";
      return { title, subtitle: `${brand ?? ""} ${subtitle ?? ""} — ${s} — ${p}`, media };
    },
  },
});
