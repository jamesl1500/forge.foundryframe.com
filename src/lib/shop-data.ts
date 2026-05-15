export type Tier = {
  slug: string;
  variantId: string;
  name: string;
  price: string;
  tagline: string;
  bestFor: string;
  includes: string[];
  deliverables: string[];
  timeline: string;
  support: string;
  license: string;
  githubRepo: string;
  githubTeamSlug: string;
};

export type Category = {
  slug: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  tiers: [Tier, Tier, Tier];
  comparison: Array<{
    label: string;
    values: [string, string, string];
  }>;
};

export const shopCategories: Category[] = [
  {
    slug: "landing-pages",
    number: "01",
    title: "Landing Page Kits",
    subtitle: "Conversion first",
    description:
      "High-impact, campaign-ready landing systems for product launches, waitlists, and pre-sales.",
    tiers: [
      {
        slug: "spark",
        variantId: "1651895",
        name: "Spark",
        price: "$79",
        tagline: "Single-page launch momentum",
        bestFor: "MVP announcements and waitlists",
        includes: ["Hero + offer sections", "Lead capture form", "Social proof blocks", "SEO baseline"],
        deliverables: ["One polished landing page", "Conversion-oriented section blocks", "Mobile-first responsive layout"],
        timeline: "Same-day setup",
        support: "7 days",
        license: "Single project",
        githubRepo: "landing-page-spark",
        githubTeamSlug: "customers-landingpagekits-spark",
      },
      {
        slug: "launch",
        variantId: "1657304",
        name: "Launch",
        price: "$149",
        tagline: "A complete conversion funnel",
        bestFor: "Pre-sale and validation campaigns",
        includes: ["Multi-section funnel", "Pricing + FAQ modules", "A/B ready CTAs", "Analytics events scaffold"],
        deliverables: ["Funnel-aware section architecture", "Pricing variants", "Conversion event map"],
        timeline: "1-2 days",
        support: "14 days",
        license: "Single product",
        githubRepo: "landing-page-launch",
        githubTeamSlug: "customers-landingpagekits-launch",
      },
      {
        slug: "scale",
        variantId: "",
        name: "Scale",
        price: "$249",
        tagline: "Growth-ready marketing system",
        bestFor: "Teams running traffic and paid campaigns",
        includes: ["Variant page templates", "Reusable block library", "Email capture integrations", "Performance tuned patterns"],
        deliverables: ["Reusable component library", "Campaign variant starter pages", "Performance checklist"],
        timeline: "2-3 days",
        support: "30 days",
        license: "Multi-campaign",
        githubRepo: "landing-page-scale",
        githubTeamSlug: "customers-landingpagekits-scale",
      },
    ],
    comparison: [
      { label: "Pages", values: ["1", "1-2", "2-4"] },
      { label: "CTA Variants", values: ["Basic", "Advanced", "Advanced + tested"] },
      { label: "Analytics Scaffold", values: ["Basic", "Event-ready", "Full event map"] },
      { label: "Section Blocks", values: ["Core", "Expanded", "Library"] },
      { label: "Support", values: ["7 days", "14 days", "30 days"] },
    ],
  },
  {
    slug: "portfolio-sites",
    number: "02",
    title: "Portfolio Website Kits",
    subtitle: "Show your work",
    description:
      "Showcase your projects, process, and personal brand with polished, developer-friendly portfolio stacks.",
    tiers: [
      {
        slug: "core",
        variantId: "",
        name: "Core",
        price: "$69",
        tagline: "Clean online presence",
        bestFor: "Freelancers and career pivots",
        includes: ["Home + about + projects", "Contact form UI", "Dark/light styling options", "Simple CMS hooks"],
        deliverables: ["Portfolio home + project list", "About page template", "Contact section"],
        timeline: "Same-day setup",
        support: "7 days",
        license: "Single project",
        githubRepo: "portfolio-core",
        githubTeamSlug: "customers-portfoliowebsitekits-core",
      },
      {
        slug: "pro",
        variantId: "",
        name: "Pro",
        price: "$129",
        tagline: "Story-led portfolio",
        bestFor: "Designers, devs, and creators with case studies",
        includes: ["Case study templates", "Services section", "Testimonials module", "SEO metadata patterns"],
        deliverables: ["Case study page templates", "Service showcase modules", "SEO baseline setup"],
        timeline: "1-2 days",
        support: "14 days",
        license: "Single brand",
        githubRepo: "portfolio-pro",
        githubTeamSlug: "customers-portfoliowebsitekits-pro",
      },
      {
        slug: "studio",
        variantId: "",
        name: "Studio",
        price: "$229",
        tagline: "Agency-grade portfolio system",
        bestFor: "Studios and productized service teams",
        includes: ["Team and capability pages", "Project filtering", "Blog-ready structure", "Reusable section primitives"],
        deliverables: ["Team and capability system", "Filterable project grid", "Content-ready architecture"],
        timeline: "2-3 days",
        support: "30 days",
        license: "Studio use",
        githubRepo: "portfolio-studio",
        githubTeamSlug: "customers-portfoliowebsitekits-studio",
      },
    ],
    comparison: [
      { label: "Page Templates", values: ["3", "5", "7+"] },
      { label: "Case Studies", values: ["-", "Included", "Advanced"] },
      { label: "Team Pages", values: ["-", "-", "Included"] },
      { label: "Project Filtering", values: ["Basic", "Basic", "Advanced"] },
      { label: "Support", values: ["7 days", "14 days", "30 days"] },
    ],
  },
  {
    slug: "blog-platforms",
    number: "03",
    title: "Blog Website Kits",
    subtitle: "Content engines",
    description:
      "Publishing-focused foundations optimized for authority building, search growth, and newsletter conversion.",
    tiers: [
      {
        slug: "writer",
        variantId: "",
        name: "Writer",
        price: "$89",
        tagline: "Minimal publishing setup",
        bestFor: "Personal writing and niche blogs",
        includes: ["Post index + article template", "Tag/category layout", "Author profile blocks", "RSS + sitemap setup"],
        deliverables: ["Blog index", "Article page", "Core metadata setup"],
        timeline: "Same-day setup",
        support: "7 days",
        license: "Single site",
        githubRepo: "blog-writer",
        githubTeamSlug: "customers-blogwebsitekits-writer",
      },
      {
        slug: "publisher",
        variantId: "",
        name: "Publisher",
        price: "$159",
        tagline: "Built for consistent publishing",
        bestFor: "Content teams and newsletters",
        includes: ["Featured post logic", "Inline CTA components", "Related content modules", "Newsletter form sections"],
        deliverables: ["Featured + category system", "Newsletter integration points", "Reusable callout components"],
        timeline: "1-2 days",
        support: "14 days",
        license: "Single publication",
        githubRepo: "blog-publisher",
        githubTeamSlug: "customers-blogwebsitekits-publisher",
      },
      {
        slug: "authority",
        variantId: "",
        name: "Authority",
        price: "$269",
        tagline: "SERP-oriented content system",
        bestFor: "SEO-focused founder brands",
        includes: ["Topic cluster templates", "Schema-ready components", "Content hub page patterns", "Monetization slots"],
        deliverables: ["Topical hub templates", "Schema-optimized blocks", "Monetization layout slots"],
        timeline: "2-3 days",
        support: "30 days",
        license: "Brand publication",
        githubRepo: "blog-authority",
        githubTeamSlug: "customers-blogwebsitekits-authority",
      },
    ],
    comparison: [
      { label: "Post Templates", values: ["1", "2", "3+"] },
      { label: "Newsletter Modules", values: ["Basic", "Expanded", "Advanced"] },
      { label: "SEO Components", values: ["Baseline", "Improved", "Authority-ready"] },
      { label: "Topic Hubs", values: ["-", "Optional", "Included"] },
      { label: "Support", values: ["7 days", "14 days", "30 days"] },
    ],
  },
  {
    slug: "saas-foundations",
    number: "04",
    title: "SaaS Foundation Kits",
    subtitle: "Ship products faster",
    description:
      "Next.js + Tailwind + Supabase starter systems for real SaaS products with modern auth and database workflows.",
    tiers: [
      {
        slug: "starter",
        variantId: "",
        name: "Starter",
        price: "$199",
        tagline: "Authentication and app shell",
        bestFor: "Early MVPs and solo founders",
        includes: ["Supabase auth", "Protected routes", "Dashboard shell", "User profile + settings"],
        deliverables: ["Auth + session flow", "Basic dashboard UI", "Profile and settings screens"],
        timeline: "1-2 days",
        support: "14 days",
        license: "Single product",
        githubRepo: "saas-starter",
        githubTeamSlug: "customers-saasfoundationkits-starter",
      },
      {
        slug: "growth",
        variantId: "",
        name: "Growth",
        price: "$399",
        tagline: "Core SaaS architecture",
        bestFor: "Products moving toward paying users",
        includes: ["Team/org model", "Role-based access", "Billing-ready structure", "Audit + events tables"],
        deliverables: ["Org and permissions model", "Billing integration prep", "Data model starter migrations"],
        timeline: "3-5 days",
        support: "30 days",
        license: "Single SaaS",
        githubRepo: "saas-growth",
        githubTeamSlug: "customers-saasfoundationkits-growth",
      },
      {
        slug: "scale",
        variantId: "",
        name: "Scale",
        price: "$699",
        tagline: "Production-oriented foundation",
        bestFor: "Teams preparing for scale",
        includes: ["Multi-tenant patterns", "Admin console starter", "Feature flag scaffolding", "Background job patterns"],
        deliverables: ["Multi-tenant architecture", "Admin tooling starter", "Scalable job pattern examples"],
        timeline: "5-7 days",
        support: "45 days",
        license: "Commercial SaaS",
        githubRepo: "saas-scale",
        githubTeamSlug: "customers-saasfoundationkits-scale",
      },
    ],
    comparison: [
      { label: "Auth + RBAC", values: ["Basic", "Advanced", "Advanced + admin"] },
      { label: "Multi-tenant", values: ["-", "Optional", "Included"] },
      { label: "Billing Readiness", values: ["-", "Included", "Included + patterns"] },
      { label: "Admin Console", values: ["-", "-", "Included"] },
      { label: "Support", values: ["14 days", "30 days", "45 days"] },
    ],
  },
  {
    slug: "ecommerce-kits",
    number: "05",
    title: "E-Commerce Frontend Kits",
    subtitle: "Catalog to checkout",
    description:
      "Fast storefront experiences with polished merchandising layouts and conversion-focused UI sections.",
    tiers: [
      {
        slug: "catalog",
        variantId: "",
        name: "Catalog",
        price: "$129",
        tagline: "Launch your storefront fast",
        bestFor: "Product catalogs and drops",
        includes: ["Collection pages", "Product detail templates", "Cart UI", "Promo block modules"],
        deliverables: ["Collection and product templates", "Cart interaction starter", "Promo modules"],
        timeline: "1-2 days",
        support: "14 days",
        license: "Single store",
        githubRepo: "ecommerce-catalog",
        githubTeamSlug: "customers-ecommercefrontendkits-catalog",
      },
      {
        slug: "storefront",
        variantId: "",
        name: "Storefront",
        price: "$249",
        tagline: "Conversion-optimized shopping flow",
        bestFor: "Brands with frequent launches",
        includes: ["Advanced filtering", "Upsell components", "Bundle display patterns", "Checkout handoff flow"],
        deliverables: ["Filtering system", "Bundles and upsells", "Checkout handoff pages"],
        timeline: "2-3 days",
        support: "30 days",
        license: "Single brand",
        githubRepo: "ecommerce-storefront",
        githubTeamSlug: "customers-ecommercefrontendkits-storefront",
      },
      {
        slug: "commerce-pro",
        variantId: "",
        name: "Commerce Pro",
        price: "$449",
        tagline: "Built for scale and retention",
        bestFor: "Growing DTC teams",
        includes: ["Account area templates", "Subscription UI flows", "Order history modules", "Lifecycle UX sections"],
        deliverables: ["Customer account area", "Subscription UX patterns", "Retention-driven UX blocks"],
        timeline: "4-6 days",
        support: "45 days",
        license: "Commercial store",
        githubRepo: "ecommerce-commerce-pro",
        githubTeamSlug: "customers-ecommercefrontendkits-commerce-pro",
      },
    ],
    comparison: [
      { label: "Catalog + PDP", values: ["Included", "Included", "Included"] },
      { label: "Filtering", values: ["Basic", "Advanced", "Advanced + UX"] },
      { label: "Account Area", values: ["-", "Optional", "Included"] },
      { label: "Subscription Flow", values: ["-", "-", "Included"] },
      { label: "Support", values: ["14 days", "30 days", "45 days"] },
    ],
  },
];

export function getCategoryBySlug(categorySlug: string): Category | undefined {
  return shopCategories.find((category) => category.slug === categorySlug);
}

export function getTierBySlug(categorySlug: string, tierSlug: string): Tier | undefined {
  return getCategoryBySlug(categorySlug)?.tiers.find((tier) => tier.slug === tierSlug);
}
