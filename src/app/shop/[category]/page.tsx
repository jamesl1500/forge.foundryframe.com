import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCategoryBySlug, shopCategories } from "@/lib/shop-data";
import BuyButton from "@/components/BuyButton";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const categoryData = getCategoryBySlug(category);

  if (!categoryData) {
    return {
      title: "Category Not Found",
    };
  }

  return {
    title: `${categoryData.title}`,
    description: categoryData.description,
    alternates: {
      canonical: `/shop/${categoryData.slug}`,
    },
    openGraph: {
      title: `${categoryData.title} | FORGE`,
      description: categoryData.description,
      url: `/shop/${categoryData.slug}`,
    },
    twitter: {
      card: "summary_large_image" as const,
      title: `${categoryData.title} | FORGE`,
      description: categoryData.description,
    },
  };
}

export function generateStaticParams() {
  return shopCategories.map((category) => ({
    category: category.slug,
  }));
}

export default async function ShopCategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const categoryData = getCategoryBySlug(category);

  if (!categoryData) {
    notFound();
  }

  return (
    <>
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-28 bg-black border-b border-white/10">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <Link
            href="/shop"
            className="text-[10px] uppercase tracking-[0.3em] text-gray-600 hover:text-gray-400 transition-colors mb-6 inline-block"
          >
            &larr; All Categories
          </Link>
          <p className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-6">Category {categoryData.number}</p>
          <h1 className="text-6xl sm:text-7xl lg:text-8xl font-heading font-bold text-white leading-[0.9] tracking-tight max-w-5xl">
            {categoryData.title}
          </h1>
          <p className="text-xs uppercase tracking-widest text-gray-500 mt-6">{categoryData.subtitle}</p>
          <p className="text-gray-400 text-sm mt-4 max-w-3xl">{categoryData.description}</p>
        </div>
      </section>

      <section className="py-24 lg:py-32 bg-black border-b border-white/10">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-white/10">
            {categoryData.tiers.map((tier, idx) => {
              const isMiddle = idx === 1;

              return (
                <div key={tier.slug} className={isMiddle ? "bg-white p-8 lg:p-10 flex flex-col" : "bg-black p-8 lg:p-10 flex flex-col"}>
                  <div className="flex items-center justify-between mb-8">
                    <span className={isMiddle ? "text-[10px] uppercase tracking-[0.3em] text-gray-400" : "text-[10px] uppercase tracking-[0.3em] text-gray-600"}>
                      Tier 0{idx + 1}
                    </span>
                    {isMiddle ? (
                      <span className="text-[10px] uppercase tracking-widest bg-black text-white px-3 py-1 font-bold">Most Popular</span>
                    ) : null}
                  </div>

                  <p className="text-xs uppercase tracking-widest text-gray-500 mb-1">{tier.name}</p>
                  <div className={isMiddle ? "text-4xl font-heading font-bold text-black mb-2" : "text-4xl font-heading font-bold text-white mb-2"}>
                    {tier.price}
                  </div>
                  <p className="text-xs italic text-gray-500 mb-4">&ldquo;{tier.tagline}&rdquo;</p>
                  <p className={isMiddle ? "text-sm text-gray-700 mb-6" : "text-sm text-gray-400 mb-6"}>{tier.bestFor}</p>

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
                      href={`/shop/${categoryData.slug}/${tier.slug}`}
                      className={
                        isMiddle
                          ? "block text-center px-6 py-3 text-sm font-bold uppercase tracking-wider border border-black text-black hover:bg-black hover:text-white transition-colors"
                          : "block text-center px-6 py-3 text-sm font-bold uppercase tracking-wider border border-white/20 text-white hover:bg-white/5 transition-colors"
                      }
                    >
                      View Details
                    </Link>
                    <BuyButton
                      categorySlug={categoryData.slug}
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
        </div>
      </section>

      <section className="py-24 lg:py-32 bg-black border-b border-white/10">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <p className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-8">Tier Comparison</p>

          <div className="overflow-x-auto border border-white/10">
            <table className="w-full min-w-[760px] border-collapse">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left text-xs uppercase tracking-widest text-gray-500 p-4">Capability</th>
                  {categoryData.tiers.map((tier) => (
                    <th key={tier.slug} className="text-left text-xs uppercase tracking-widest text-white p-4 border-l border-white/10">
                      {tier.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {categoryData.comparison.map((row) => (
                  <tr key={row.label} className="border-b border-white/10 last:border-b-0">
                    <td className="p-4 text-sm text-gray-300">{row.label}</td>
                    {row.values.map((value, idx) => (
                      <td key={`${row.label}-${idx}`} className="p-4 text-sm text-gray-500 border-l border-white/10">
                        {value}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
}
