import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about FORGE by Foundry Frame and our mission to help founders and developers launch faster with production-grade starter kits.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About | FORGE",
    description:
      "Learn about FORGE by Foundry Frame and our mission to help founders and developers launch faster with production-grade starter kits.",
    url: "/about",
  },
  twitter: {
    card: "summary_large_image",
    title: "About | FORGE",
    description:
      "Learn about FORGE by Foundry Frame and our mission to help founders and developers launch faster with production-grade starter kits.",
  },
};

const values = [
  {
    title: "Launch Speed",
    description:
      "We design kits that remove setup drag so teams can move from idea to shipping in days, not months.",
  },
  {
    title: "Production Standards",
    description:
      "Every kit follows modern Next.js patterns, practical DX choices, and deploy-ready architecture.",
  },
  {
    title: "Clean Foundations",
    description:
      "Our templates prioritize clarity, maintainability, and extensibility so teams can scale with confidence.",
  },
  {
    title: "Builder Empathy",
    description:
      "We build for the reality of solo founders, agencies, and startups that need momentum under pressure.",
  },
] as const;

const stack = [
  "Next.js",
  "Tailwind CSS",
  "TypeScript",
  "Supabase",
  "Auth + Roles",
  "Payments Ready",
  "SEO + Performance",
  "Deploy Documentation",
] as const;

export default function AboutPage() {
  return (
    <>
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-28 bg-black border-b border-white/10">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <p className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-6">About FORGE</p>
          <h1 className="text-6xl sm:text-7xl lg:text-8xl font-heading font-bold text-white leading-[0.9] tracking-tight max-w-5xl">
            Built to help builders ship faster.
          </h1>
          <p className="text-gray-400 text-sm mt-8 max-w-2xl leading-relaxed">
            FORGE is the product-focused subset of Foundry Frame. Our mission is simple:
            give founders and developers battle-tested starter kits so they can focus on
            product outcomes, not project scaffolding.
          </p>
        </div>
      </section>

      <section className="py-24 lg:py-32 bg-black">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-5">
              <p className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-6">Our Approach</p>
              <h2 className="text-4xl sm:text-5xl font-heading font-bold text-white leading-tight mb-8">
                Less boilerplate.
                <br />
                More traction.
              </h2>
              <p className="text-gray-400 text-sm leading-relaxed">
                We architect each kit around real launch flows: landing pages that convert,
                SaaS dashboards with auth + data patterns, and content platforms designed for
                discoverability. You get code that feels intentional, modern, and easy to
                extend.
              </p>
            </div>

            <div className="lg:col-span-7 border border-white/10 p-8 lg:p-10">
              <p className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-8">Core Stack</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-white/10">
                {stack.map((item) => (
                  <div key={item} className="bg-black p-5 text-center">
                    <span className="text-white text-xs uppercase tracking-wider">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 lg:py-32 bg-gray-900 border-y border-white/10">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <p className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-3">Principles</p>
          <h2 className="text-4xl sm:text-5xl font-heading font-bold text-white mb-16">What drives our kits</h2>

          <div className="border-t border-white/10">
            {values.map((value, i) => (
              <div
                key={value.title}
                className="grid grid-cols-1 md:grid-cols-12 gap-4 py-8 border-b border-white/10"
              >
                <div className="md:col-span-1 text-gray-500 text-xs font-mono">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="md:col-span-4 text-white font-heading font-semibold text-lg">{value.title}</h3>
                <p className="md:col-span-7 text-gray-500 text-sm leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 lg:py-32 bg-black border-t border-white/10">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="max-w-3xl">
            <p className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-6">Get Started</p>
            <h2 className="text-5xl sm:text-6xl font-heading font-bold text-white leading-[0.95] mb-8">
              Ready to skip the setup and start building?
            </h2>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/shop"
                className="px-8 py-4 bg-white text-black font-bold text-sm uppercase tracking-wider hover:bg-gray-200 transition-colors"
              >
                Browse Kits
              </Link>
              <Link
                href="/contact"
                className="px-8 py-4 border border-white/20 text-white font-bold text-sm uppercase tracking-wider hover:bg-white/5 transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
