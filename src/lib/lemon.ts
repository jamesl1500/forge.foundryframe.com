import crypto from "node:crypto";
import { getTierBySlug } from "@/lib/shop-data";

export type DeliveryType = "download" | "github";

export type DeliveryConfig = {
  deliveryType: DeliveryType;
  deliveryValue: string;
};

type DeliveryMap = Record<string, DeliveryConfig>;

function isDeliveryType(value: string): value is DeliveryType {
  return value === "download" || value === "github";
}

function parseDeliveryMap(): DeliveryMap {
  const raw = process.env.LEMON_DELIVERY_MAP_JSON;

  if (!raw) {
    return {};
  }

  try {
    const parsed = JSON.parse(raw) as Record<string, unknown>;
    const entries = Object.entries(parsed);
    const result: DeliveryMap = {};

    for (const [key, value] of entries) {
      if (typeof value !== "object" || value === null) {
        continue;
      }

      const record = value as Record<string, unknown>;
      const deliveryType = record.deliveryType;
      const deliveryValue = record.deliveryValue;

      if (typeof deliveryType !== "string" || !isDeliveryType(deliveryType)) {
        continue;
      }

      if (typeof deliveryValue !== "string" || !deliveryValue.trim()) {
        continue;
      }

      result[key] = {
        deliveryType,
        deliveryValue: deliveryValue.trim(),
      };
    }

    return result;
  } catch {
    return {};
  }
}

export function productKey(categorySlug: string, tierSlug: string): string {
  return `${categorySlug}:${tierSlug}`;
}

export function getDeliveryConfig(categorySlug: string, tierSlug: string): DeliveryConfig | null {
  const map = parseDeliveryMap();
  return map[productKey(categorySlug, tierSlug)] ?? null;
}

export function verifyLemonSignature(rawBody: string, signature: string | null): boolean {
  const secret = process.env.LEMON_WEBHOOK_SECRET;

  if (!secret || !signature) {
    return false;
  }

  const digest = crypto.createHmac("sha256", secret).update(rawBody).digest("hex");

  try {
    return crypto.timingSafeEqual(Buffer.from(digest), Buffer.from(signature));
  } catch {
    return false;
  }
}

async function sendDeliveryEmail({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}): Promise<void> {
  const resendApiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.RESEND_FROM_EMAIL;

  if (!resendApiKey || !fromEmail) {
    console.info("[fulfillment] Email skipped: RESEND_API_KEY or RESEND_FROM_EMAIL is not configured");
    return;
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: fromEmail,
      to,
      subject,
      html,
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Resend request failed (${response.status}): ${body}`);
  }
}

async function inviteToGitHubOrg(email: string, teamSlug: string): Promise<void> {
  const token = process.env.GITHUB_TOKEN;
  const org = process.env.GITHUB_ORG;
  const fallbackTeamId = process.env.GITHUB_TEAM_ID;

  if (!token || !org) {
    console.info("[fulfillment] GitHub invite skipped: GITHUB_TOKEN or GITHUB_ORG is not configured");
    return;
  }

  // Resolve the team slug to a numeric ID (required by the org invitations API).
  let resolvedTeamId: number | undefined;

  if (teamSlug) {
    const teamRes = await fetch(`https://api.github.com/orgs/${org}/teams/${teamSlug}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
      },
    });

    if (teamRes.ok) {
      const teamData = await teamRes.json() as { id?: number };
      if (typeof teamData.id === "number") {
        resolvedTeamId = teamData.id;
      }
    } else {
      console.warn(`[fulfillment] Could not resolve GitHub team slug "${teamSlug}" — falling back to GITHUB_TEAM_ID`);
    }
  }

  if (resolvedTeamId === undefined && fallbackTeamId) {
    resolvedTeamId = Number(fallbackTeamId);
  }

  const response = await fetch(`https://api.github.com/orgs/${org}/invitations`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
      "Content-Type": "application/json",
      "X-GitHub-Api-Version": "2022-11-28",
    },
    body: JSON.stringify({
      email,
      ...(resolvedTeamId !== undefined ? { team_ids: [resolvedTeamId] } : {}),
      role: "direct_member",
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`GitHub invitation (team: ${teamSlug}) failed (${response.status}): ${body}`);
  }
}

export async function fulfillOrder(params: {
  categorySlug: string;
  tierSlug: string;
  orderId: string;
  email: string;
}): Promise<void> {
  const { categorySlug, tierSlug, orderId, email } = params;
  const config = getDeliveryConfig(categorySlug, tierSlug);

  if (!config) {
    console.warn("[fulfillment] No product config found", { categorySlug, tierSlug, orderId });
    return;
  }

  if (config.deliveryType === "download") {
    await sendDeliveryEmail({
      to: email,
      subject: "Your FORGE purchase is ready",
      html: `<p>Thanks for your purchase.</p><p>Your download: <a href=\"${config.deliveryValue}\">${config.deliveryValue}</a></p><p>Order ID: ${orderId}</p>`,
    });
    return;
  }

  // Resolve the repo name and team slug from tier data; fall back to deliveryValue for backward compatibility.
  const tier = getTierBySlug(categorySlug, tierSlug);
  const repoName = tier?.githubRepo?.trim() || config.deliveryValue;
  const teamSlug = tier?.githubTeamSlug?.trim() ?? "";

  await inviteToGitHubOrg(email, teamSlug);

  await sendDeliveryEmail({
    to: email,
    subject: "Your FORGE GitHub access has been sent",
    html: `<p>Thanks for your purchase.</p><p>We sent a GitHub organization invite granting access to the <code>${repoName}</code> repository. Please check your GitHub notifications and email.</p><p>Order ID: ${orderId}</p>`,
  });
}