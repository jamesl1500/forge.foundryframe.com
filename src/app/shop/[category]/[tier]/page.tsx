import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCategoryBySlug, getTierBySlug, shopCategories } from "@/lib/shop-data";
import BuyButton from "@/components/BuyButton";
import PurchaseSuccessModal from "@/components/PurchaseSuccessModal";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; tier: string }>;
}): Promise<Metadata> {
  const { category, tier } = await params;
  const categoryData = getCategoryBySlug(category);
  const tierData = getTierBySlug(category, tier);

  if (!categoryData || !tierData) {
    return {
      title: "Product Not Found",
    };
  }

  return {
    title: `${categoryData.title} - ${tierData.name}`,
    description: `${tierData.name} tier for ${categoryData.title}. ${tierData.tagline}`,
    alternates: {
      canonical: `/shop/${categoryData.slug}/${tierData.slug}`,
    },
    openGraph: {
      title: `${tierData.name} — ${categoryData.title} | FORGE`,
      description: `${tierData.name} tier for ${categoryData.title}. ${tierData.tagline}`,
      url: `/shop/${categoryData.slug}/${tierData.slug}`,
    },
    twitter: {
      card: "summary_large_image" as const,
      title: `${tierData.name} — ${categoryData.title} | FORGE`,
      description: `${tierData.name} tier for ${categoryData.title}. ${tierData.tagline}`,
    },
  };
}

export function generateStaticParams() {
  return shopCategories.flatMap((category) =>
    category.tiers.map((tier) => ({
      category: category.slug,
      tier: tier.slug,
    }))
  );
}

export default async function TierDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ category: string; tier: string }>;
  searchParams: Promise<{ paid?: string }>;
}) {
  const { category, tier } = await params;
  const { paid } = await searchParams;
  const categoryData = getCategoryBySlug(category);
  const tierData = getTierBySlug(category, tier);

  if (!categoryData || !tierData) {
    notFound();
  }

  const tierIndex = categoryData.tiers.findIndex((item) => item.slug === tierData.slug);

  return (
    <>
      <PurchaseSuccessModal openByDefault={paid === "1"} />

      <section className="pt-32 pb-20 lg:pt-40 lg:pb-28 bg-black border-b border-white/10">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <Link
            href={`/shop/${categoryData.slug}`}
            className="text-[10px] uppercase tracking-[0.3em] text-gray-600 hover:text-gray-400 transition-colors mb-6 inline-block"
          >
            &larr; Back to {categoryData.title}
          </Link>
          <p className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-6">Tier 0{tierIndex + 1}</p>
          <h1 className="text-6xl sm:text-7xl lg:text-8xl font-heading font-bold text-white leading-[0.9] tracking-tight max-w-5xl">
            {tierData.name}
          </h1>
          <p className="text-xs uppercase tracking-widest text-gray-500 mt-6">{categoryData.title}</p>
          <p className="text-gray-400 text-sm mt-4 max-w-3xl">{tierData.bestFor}</p>
        </div>
      </section>

      <section className="py-24 lg:py-32 bg-black border-b border-white/10">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-8">
              <p className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-6">What You Get</p>
              <div className="border-t border-white/10">
                {tierData.includes.map((item) => (
                  <div key={item} className="py-4 border-b border-white/10 text-gray-300 text-sm">
                    {item}
                  </div>
                ))}
              </div>

              <p className="text-xs uppercase tracking-[0.3em] text-gray-500 mt-16 mb-6">Deliverables</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/10">
                {tierData.deliverables.map((item) => (
                  <div key={item} className="bg-black p-5 text-sm text-gray-400">
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <aside className="lg:col-span-4">
              <div className="border border-white/10 p-8 sticky top-24">
                <p className="text-xs uppercase tracking-widest text-gray-500 mb-2">Price</p>
                <div className="text-5xl font-heading font-bold text-white mb-4">{tierData.price}</div>
                <p className="text-xs italic text-gray-500 mb-8">&ldquo;{tierData.tagline}&rdquo;</p>

                <div className="space-y-4 border-t border-white/10 pt-6 mb-8">
                  <div className="flex items-start justify-between gap-4">
                    <span className="text-xs uppercase tracking-wider text-gray-500">Timeline</span>
                    <span className="text-sm text-white text-right">{tierData.timeline}</span>
                  </div>
                  <div className="flex items-start justify-between gap-4">
                    <span className="text-xs uppercase tracking-wider text-gray-500">Support</span>
                    <span className="text-sm text-white text-right">{tierData.support}</span>
                  </div>
                  <div className="flex items-start justify-between gap-4">
                    <span className="text-xs uppercase tracking-wider text-gray-500">License</span>
                    <span className="text-sm text-white text-right">{tierData.license}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  <BuyButton
                    categorySlug={categoryData.slug}
                    tierSlug={tierData.slug}
                    className="block text-center px-6 py-3 text-sm font-bold uppercase tracking-wider bg-white text-black hover:bg-gray-200 transition-colors"
                  />
                  <Link
                    href="/contact"
                    className="block text-center px-6 py-3 text-sm font-bold uppercase tracking-wider border border-white/20 text-white hover:bg-white/5 transition-colors"
                  >
                    Ask a Question
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
