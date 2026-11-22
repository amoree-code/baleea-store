import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

// Sanity webhook → invalidate every cached read tagged with the changed document's type.
// SANITY_REVALIDATE_SECRET lives only in env vars (Vercel / .env.local), never in the repo.
export async function POST(req: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (!secret) return NextResponse.json({ message: "Revalidation is not configured" }, { status: 500 });

  try {
    const { isValidSignature, body } = await parseBody<{ _type?: string }>(req, secret);
    if (!isValidSignature) return NextResponse.json({ message: "Invalid signature" }, { status: 401 });
    if (!body?._type) return NextResponse.json({ message: "Missing _type" }, { status: 400 });

    // expire: 0 — the next visitor gets the new content, not one more stale render (Next docs: webhooks).
    revalidateTag(body._type, { expire: 0 });
    return NextResponse.json({ revalidated: body._type });
  } catch (err) {
    console.error("[revalidate]", err);
    return NextResponse.json({ message: "Bad request" }, { status: 400 });
  }
}
