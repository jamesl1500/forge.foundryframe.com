This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Lemon Squeezy Integration

This project includes a Lemon Squeezy checkout + webhook scaffold so users can buy a tier and receive delivery automatically.

### 1. Configure Environment Variables

Copy `.env.example` to `.env.local` and set values:

- `NEXT_PUBLIC_APP_URL`: Public site URL (e.g. `https://forge.foundryframe.com`)
- `LEMON_API_KEY`: Lemon Squeezy API key
- `LEMON_STORE_ID`: Lemon Squeezy store ID
- `LEMON_WEBHOOK_SECRET`: Signing secret from Lemon webhook settings
- `LEMON_DELIVERY_MAP_JSON`: Maps `category:tier` to delivery details

Optional:

- `RESEND_API_KEY` + `RESEND_FROM_EMAIL` for delivery emails
- `GITHUB_TOKEN` + `GITHUB_ORG` (+ optional `GITHUB_TEAM_ID`) for GitHub org invites

### 2. Create Products and Variants in Lemon Squeezy

Create one Lemon variant per tier you want to sell, then add each variant ID directly to `variantId` in `src/lib/shop-data.ts`.

Delivery settings remain in `LEMON_DELIVERY_MAP_JSON` using key format `"categorySlug:tierSlug"`.

Example:

```json
{
	"landing-pages:spark": {
		"deliveryType": "download",
		"deliveryValue": "https://example.com/downloads/landing-spark.zip"
	},
	"saas-foundations:scale": {
		"deliveryType": "github",
		"deliveryValue": "forge-private-repo"
	}
}
```

### 3. Configure the Lemon Webhook

In Lemon Squeezy, set webhook URL to:

- `/api/webhooks/lemon-squeezy`

The endpoint verifies `x-signature` and currently handles `order_created` events.

### 4. Fulfillment Behavior

Fulfillment logic lives in `src/lib/lemon.ts`:

- `deliveryType="download"`: sends download URL email (if Resend configured)
- `deliveryType="github"`: invites buyer email to GitHub org (if GitHub env vars configured), then emails confirmation

### 5. Checkout Flow

Buy buttons call:

- `/api/checkout?category=<slug>&tier=<slug>`

This route creates a Lemon checkout and redirects the buyer to Lemon-hosted checkout.
