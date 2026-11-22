import type { StructureResolver } from "sanity/structure";

// Products first: it's what the owner edits most, from her phone.
export const structure: StructureResolver = (S) =>
  S.list()
    .title("المحتوى")
    .items([
      S.documentTypeListItem("product").title("المنتجات"),
      S.listItem()
        .title("خلص حالياً")
        .child(S.documentList().title("خلص حالياً").filter('_type == "product" && status == "soldout"')),
      S.divider(),
      S.documentTypeListItem("offer").title("العروض"),
      S.documentTypeListItem("concern").title("المشاكل"),
      S.documentTypeListItem("brand").title("البراندات"),
      S.divider(),
      S.documentTypeListItem("review").title("آراء الزبائن"),
      S.documentTypeListItem("faq").title("الأسئلة المتكررة"),
    ]);
