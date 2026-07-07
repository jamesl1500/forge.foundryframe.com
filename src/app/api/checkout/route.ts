import { redirect } from "next/navigation";
import Stripe from "stripe";
import { getCategoryBySlug, getTierBySlug } from "@/lib/shop-data";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const tier = searchParams.get("tier");

  if (!category || !tier) {
    return Response.json({ error: "Missing category or tier query parameter" }, { status: 400 });
  }

  const categoryData = getCategoryBySlug(category);
  const tierData = getTierBySlug(category, tier);

  if (!categoryData || !tierData) {
    return Response.json({ error: "Unknown category or tier" }, { status: 404 });
  }

  if (!tierData.priceId.trim()) {
    return Response.json(
      {
        error: "Tier is not configured for checkout yet",
        key: `${category}:${tier}`,
      },
      { status: 400 }
    );
  }

  const secretKey = process.env.STRIPE_SECRET_KEY;
  const appUrl = process.env.NEXT_PUBLIC_APP_URL;

  if (!secretKey) {
    throw new Error("Missing required environment variable: STRIPE_SECRET_KEY");
  }

  if (!appUrl) {
    throw new Error("Missing required environment variable: NEXT_PUBLIC_APP_URL");
  }

  const stripe = new Stripe(secretKey);

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [{ price: tierData.priceId, quantity: 1 }],
    success_url: `${appUrl}/shop/${category}/${tier}?paid=1`,
    cancel_url: `${appUrl}/shop/${category}/${tier}`,
    metadata: { category, tier },
    customer_email: undefined,
    billing_address_collection: "auto",
  });

  if (!session.url) {
    return Response.json({ error: "Stripe did not return a checkout URL" }, { status: 502 });
  }

  redirect(session.url);
}