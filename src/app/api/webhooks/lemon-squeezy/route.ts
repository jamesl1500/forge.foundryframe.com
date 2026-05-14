import { fulfillOrder, verifyLemonSignature } from "@/lib/lemon";

export const runtime = "nodejs";

type LemonWebhookPayload = {
  meta?: {
    event_name?: string;
    custom_data?: {
      category?: string;
      tier?: string;
    };
  };
  data?: {
    id?: string;
    attributes?: {
      user_email?: string;
      customer_email?: string;
    };
  };
};

export async function POST(request: Request) {
  const signature = request.headers.get("x-signature");
  const rawBody = await request.text();

  if (!verifyLemonSignature(rawBody, signature)) {
    return Response.json({ error: "Invalid webhook signature" }, { status: 401 });
  }

  let payload: LemonWebhookPayload;

  try {
    payload = JSON.parse(rawBody) as LemonWebhookPayload;
  } catch {
    return Response.json({ error: "Invalid JSON payload" }, { status: 400 });
  }

  const eventName = payload.meta?.event_name;

  if (eventName !== "order_created") {
    return Response.json({ ok: true, ignored: eventName ?? "unknown" });
  }

  const categorySlug = payload.meta?.custom_data?.category;
  const tierSlug = payload.meta?.custom_data?.tier;
  const orderId = payload.data?.id;
  const email = payload.data?.attributes?.user_email ?? payload.data?.attributes?.customer_email;

  if (!categorySlug || !tierSlug || !orderId || !email) {
    return Response.json(
      {
        error: "Missing required fulfillment fields",
        details: {
          categorySlug: Boolean(categorySlug),
          tierSlug: Boolean(tierSlug),
          orderId: Boolean(orderId),
          email: Boolean(email),
        },
      },
      { status: 400 }
    );
  }

  try {
    await fulfillOrder({
      categorySlug,
      tierSlug,
      orderId,
      email,
    });
  } catch (error) {
    console.error("[webhook] fulfillment failed", error);
    return Response.json({ error: "Fulfillment failed" }, { status: 500 });
  }

  return Response.json({ ok: true });
}