import type { Metadata } from "next";
import Link from "next/link";
import { shopCategories } from "@/lib/shop-data";
import BuyButton from "@/components/BuyButton";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "Browse FORGE starter kit categories for founders and developers. Production-ready templates built with Next.js, Tailwind, and Supabase.",
  alternates: {
    canonical: "/shop",
  },
  openGraph: {
    title: "Shop | FORGE",
    description:
      "Browse FORGE starter kit categories for founders and developers. Production-ready templates built with Next.js, Tailwind, and Supabase.",
    url: "/shop",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shop | FORGE",
    description:
      "Browse FORGE starter kit categories for founders and developers. Production-ready templates built with Next.js, Tailwind, and Supabase.",
  },
};

export default function ShopPage() {
  return (
    <>
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-28 bg-black border-b border-white/10">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <p className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-6">Shop</p>
          <h1 className="text-6xl sm:text-7xl lg:text-8xl font-heading font-bold text-white leading-[0.9] tracking-tight max-w-5xl">
            Starter kits for builders and founders.
          </h1>
          <p className="text-gray-400 text-sm mt-8 max-w-2xl leading-relaxed">
            Every category below includes 3 tiers so you can choose the right speed,
            scope, and architecture for your next launch.
          </p>
        </div>
      </section>

      <section className="py-24 lg:py-32 bg-black">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 space-y-24">
          {shopCategories.map((category) => (
            <article key={category.slug} id={category.slug}>
              <div className="mb-12">
                <p className="text-[10px] uppercase tracking-[0.3em] text-gray-600 mb-4">Category {category.number}</p>
                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-2">
                  <h2 className="text-4xl sm:text-5xl font-heading font-bold text-white">{category.title}</h2>
                  <Link
                    href={`/shop/${category.slug}`}
                    className="text-xs uppercase tracking-wider text-gray-400 hover:text-white border-b border-gray-400 hover:border-white pb-1 transition-colors self-start"
                  >
                    Category Details
                  </Link>
                </div>
                <p className="text-xs uppercase tracking-widest text-gray-500 mb-5">{category.subtitle}</p>
                <p className="text-gray-400 text-sm max-w-3xl">{category.description}</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-white/10">
                {category.tiers.map((tier, idx) => {
                  const isMiddle = idx === 1;
                  return (
                    <div key={tier.name} className={isMiddle ? "bg-white p-8 lg:p-10 flex flex-col" : "bg-black p-8 lg:p-10 flex flex-col"}>
                      <div className="flex items-center justify-between mb-8">
                        <span className={isMiddle ? "text-[10px] uppercase tracking-[0.3em] text-gray-400" : "text-[10px] uppercase tracking-[0.3em] text-gray-600"}>
                          Tier 0{idx + 1}
                        </span>
                        {isMiddle ? (
                          <span className="text-[10px] uppercase tracking-widest bg-black text-white px-3 py-1 font-bold">Most Popular</span>
                        ) : null}
                      </div>

                      <p className={isMiddle ? "text-xs uppercase tracking-widest text-gray-500 mb-1" : "text-xs uppercase tracking-widest text-gray-500 mb-1"}>
                        {tier.name}
                      </p>
                      <div className={isMiddle ? "text-4xl font-heading font-bold text-black mb-2" : "text-4xl font-heading font-bold text-white mb-2"}>
                        {tier.price}
                      </div>
                      <p className="text-xs italic text-gray-500 mb-4">&ldquo;{tier.tagline}&rdquo;</p>
                      <p className={isMiddle ? "text-sm text-gray-600 leading-relaxed mb-4" : "text-sm text-gray-400 leading-relaxed mb-4"}>
                        {tier.bestFor}
                      </p>

                      <div className={isMiddle ? "border-t border-black/10 flex-1" : "border-t border-white/10 flex-1"}>
                        {tier.includes.map((item) => (
                          <div
                            key={item}
                            className={isMiddle ? "flex items-start gap-3 py-3 border-b border-black/10" : "flex items-start gap-3 py-3 border-b border-white/10"}
                          >
                            <span className={isMiddle ? "text-gray-400 mt-0.5 shrink-0" : "text-gray-600 mt-0.5 shrink-0"}>&mdash;</span>
                            <span className={isMiddle ? "text-gray-700 text-sm" : "text-gray-400 text-sm"}>{item}</span>
                          </div>
                        ))}
                      </div>

                      <div className="mt-8 grid grid-cols-1 gap-3">
                        <Link
                          href={`/shop/${category.slug}/${tier.slug}`}
                          className={
                            isMiddle
                              ? "block text-center px-6 py-3 text-sm font-bold uppercase tracking-wider border border-black text-black hover:bg-black hover:text-white transition-colors"
                              : "block text-center px-6 py-3 text-sm font-bold uppercase tracking-wider border border-white/20 text-white hover:bg-white/5 transition-colors"
                          }
                        >
                          View Details
                        </Link>
                        <BuyButton
                          categorySlug={category.slug}
                          tierSlug={tier.slug}
                          className={
                            isMiddle
                              ? "block text-center px-6 py-3 text-sm font-bold uppercase tracking-wider bg-black text-white hover:bg-gray-800 transition-colors"
                              : "block text-center px-6 py-3 text-sm font-bold uppercase tracking-wider bg-white text-black hover:bg-gray-200 transition-colors"
                          }
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="py-24 lg:py-32 bg-black border-t border-white/10">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="max-w-3xl">
            <h2 className="text-5xl sm:text-6xl font-heading font-bold text-white leading-[0.95] mb-6">
              Need a custom kit combination?
            </h2>
            <p className="text-gray-500 text-sm mb-8 max-w-xl">
              Tell us your timeline, target users, and desired stack. We can map the right
              starter kit tier and extensions for your product goals.
            </p>
            <Link
              href="/contact"
              className="inline-block px-8 py-4 bg-white text-black font-bold text-sm uppercase tracking-wider hover:bg-gray-200 transition-colors"
            >
              Contact FORGE
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
