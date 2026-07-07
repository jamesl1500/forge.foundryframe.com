import Stripe from "stripe";
import { fulfillOrder } from "@/lib/stripe";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const signature = request.headers.get("stripe-signature");
  const rawBody = await request.text();

  const secretKey = process.env.STRIPE_SECRET_KEY;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!secretKey || !webhookSecret) {
    console.error("[webhook] STRIPE_SECRET_KEY or STRIPE_WEBHOOK_SECRET is not configured");
    return Response.json({ error: "Stripe not configured" }, { status: 500 });
  }

  if (!signature) {
    return Response.json({ error: "Missing stripe-signature header" }, { status: 401 });
  }

  const stripe = new Stripe(secretKey);

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
  } catch {
    return Response.json({ error: "Invalid webhook signature" }, { status: 401 });
  }

  if (event.type !== "checkout.session.completed") {
    return Response.json({ ok: true, ignored: event.type });
  }

  const session = event.data.object as Stripe.Checkout.Session;
  const category = session.metadata?.category;
  const tier = session.metadata?.tier;
  const email = session.customer_details?.email;
  const orderId = session.id;

  if (!category || !tier || !email) {
    return Response.json(
      {
        error: "Missing required fulfillment fields",
        details: {
          category: Boolean(category),
          tier: Boolean(tier),
          email: Boolean(email),
        },
      },
      { status: 400 }
    );
  }

  try {
    await fulfillOrder({ categorySlug: category, tierSlug: tier, orderId, email });
  } catch (error) {
    console.error("[webhook] fulfillment failed", error);
    return Response.json({ error: "Fulfillment failed" }, { status: 500 });
  }

  return Response.json({ ok: true });
}
