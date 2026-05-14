import { redirect } from "next/navigation";
import { getCategoryBySlug, getTierBySlug } from "@/lib/shop-data";

export const runtime = "nodejs";

function getRequiredEnv(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

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

  if (!tierData.variantId.trim()) {
    return Response.json(
      {
        error: "Tier is not configured for checkout yet",
        key: `${category}:${tier}`,
      },
      { status: 400 }
    );
  }

  const storeId = getRequiredEnv("LEMONSQUEEZY_STORE_ID");
  const apiKey = getRequiredEnv("LEMONSQUEEZY_API_KEY");
  const appUrl = getRequiredEnv("NEXT_PUBLIC_APP_URL");

  const payload = {
    data: {
      type: "checkouts",
      attributes: {
        checkout_data: {
          custom: {
            category,
            tier,
          },
        },
        product_options: {
          redirect_url: `${appUrl}/shop/${category}/${tier}?paid=1`,
        },
      },
      relationships: {
        store: {
          data: {
            type: "stores",
            id: storeId,
          },
        },
        variant: {
          data: {
            type: "variants",
            id: tierData.variantId,
          },
        },
      },
    },
  };

  const response = await fetch("https://api.lemonsqueezy.com/v1/checkouts", {
    method: "POST",
    headers: {
      Accept: "application/vnd.api+json",
      "Content-Type": "application/vnd.api+json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const body = await response.text();
    return Response.json(
      {
        error: "Unable to create Lemon Squeezy checkout",
        detail: body,
      },
      { status: 502 }
    );
  }

  const json = (await response.json()) as {
    data?: {
      attributes?: {
        url?: string;
      };
    };
  };

  const checkoutUrl = json.data?.attributes?.url;

  if (!checkoutUrl) {
    return Response.json({ error: "Lemon Squeezy did not return a checkout URL" }, { status: 502 });
  }

  redirect(checkoutUrl);
}