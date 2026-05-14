import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact FORGE by Foundry Frame to choose the right starter kit tier or discuss custom implementation support.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact | FORGE",
    description:
      "Contact FORGE by Foundry Frame to choose the right starter kit tier or discuss custom implementation support.",
    url: "/contact",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact | FORGE",
    description:
      "Contact FORGE by Foundry Frame to choose the right starter kit tier or discuss custom implementation support.",
  },
};

const contactInfo = [
  {
    title: "Email",
    value: "forge@foundryframe.com",
    href: "mailto:forge@foundryframe.com",
  },
  {
    title: "Response Time",
    value: "Within 24 hours",
    href: "#",
  },
  {
    title: "Primary Stack",
    value: "Next.js + Tailwind + Supabase",
    href: "#",
  },
] as const;

export default function ContactPage() {
  return (
    <>
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-28 bg-black border-b border-white/10">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <p className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-6">Contact</p>
          <h1 className="text-6xl sm:text-7xl lg:text-8xl font-heading font-bold text-white leading-[0.9] tracking-tight max-w-4xl mb-6">
            Tell us what you want to build.
          </h1>
          <p className="text-gray-500 text-lg max-w-2xl">
            Share your project goals and we&apos;ll point you to the right kit category and tier.
          </p>
        </div>
      </section>

      <section className="py-24 lg:py-32 bg-black">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-7">
              <p className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-8">Project Inquiry</p>

              <form className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-xs uppercase tracking-wider text-gray-500 mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="w-full px-4 py-3 bg-transparent border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-white transition-colors"
                      placeholder="Jane Founder"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-xs uppercase tracking-wider text-gray-500 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="w-full px-4 py-3 bg-transparent border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-white transition-colors"
                      placeholder="jane@startup.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="category" className="block text-xs uppercase tracking-wider text-gray-500 mb-2">
                    Interested Category *
                  </label>
                  <select
                    id="category"
                    name="category"
                    required
                    className="w-full px-4 py-3 bg-black border border-white/10 text-white focus:outline-none focus:border-white transition-colors"
                  >
                    <option value="">Select category...</option>
                    <option value="Landing Page Kits">Landing Page Kits</option>
                    <option value="Portfolio Website Kits">Portfolio Website Kits</option>
                    <option value="Blog Website Kits">Blog Website Kits</option>
                    <option value="SaaS Foundation Kits">SaaS Foundation Kits</option>
                    <option value="E-Commerce Frontend Kits">E-Commerce Frontend Kits</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="tier" className="block text-xs uppercase tracking-wider text-gray-500 mb-2">
                      Preferred Tier
                    </label>
                    <select
                      id="tier"
                      name="tier"
                      className="w-full px-4 py-3 bg-black border border-white/10 text-white focus:outline-none focus:border-white transition-colors"
                    >
                      <option value="">Select tier...</option>
                      <option value="Tier 01">Tier 01</option>
                      <option value="Tier 02">Tier 02</option>
                      <option value="Tier 03">Tier 03</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="timeline" className="block text-xs uppercase tracking-wider text-gray-500 mb-2">
                      Timeline
                    </label>
                    <select
                      id="timeline"
                      name="timeline"
                      className="w-full px-4 py-3 bg-black border border-white/10 text-white focus:outline-none focus:border-white transition-colors"
                    >
                      <option value="">Select timeline...</option>
                      <option value="ASAP">ASAP</option>
                      <option value="2-4 weeks">2-4 weeks</option>
                      <option value="1-2 months">1-2 months</option>
                      <option value="Exploring options">Exploring options</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs uppercase tracking-wider text-gray-500 mb-2">
                    Project Details *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-transparent border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-white transition-colors resize-none"
                    placeholder="Tell us what you are building, who it is for, and what outcome you need."
                  />
                </div>

                <button
                  type="submit"
                  className="px-8 py-4 bg-white text-black text-sm font-bold uppercase tracking-wider hover:bg-gray-200 transition-colors"
                >
                  Send Inquiry
                </button>
              </form>
            </div>

            <div className="lg:col-span-5">
              <p className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-8">Details</p>

              <div className="border-t border-white/10">
                {contactInfo.map((info) => (
                  <a
                    key={info.title}
                    href={info.href}
                    className="flex justify-between items-start py-5 border-b border-white/10 group"
                  >
                    <span className="text-xs uppercase tracking-wider text-gray-500">{info.title}</span>
                    <span className="text-white text-sm text-right group-hover:text-gray-300 transition-colors">
                      {info.value}
                    </span>
                  </a>
                ))}
              </div>

              <div className="mt-12 pt-8 border-t border-white/10">
                <p className="text-gray-500 text-sm mb-2">Want to compare options first?</p>
                <Link
                  href="/shop"
                  className="text-white text-sm border-b border-white/20 pb-0.5 hover:border-white transition-colors"
                >
                  Browse Shop Categories
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
