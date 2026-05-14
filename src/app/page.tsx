import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "FORGE by Foundry Frame",
  description:
    "Production-ready website kits and starter systems for founders and developers who want to launch fast.",
  alternates: {
    canonical: "/",
  },
  keywords: [
    "creative agency",
    "design agency",
    "branding",
    "web design",
    "Ohio",
    "digital marketing",
    "content creation",
    "visual identity",
    "UX/UI design",
    "conversion optimization",
    "ongoing support",
  ],
  openGraph: {
    title: "FORGE by Foundry Frame",
    description:
      "Production-ready website kits and starter systems for founders and developers who want to launch fast.",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "FORGE by Foundry Frame",
    description:
      "Production-ready website kits and starter systems for founders and developers who want to launch fast.",
  },
};

const offerings = [
  {
    title: "Launch Websites",
    description:
      "Conversion-focused sites built fast, with clean architecture and a premium visual system.",
  },
  {
    title: "Brand Foundations",
    description:
      "Identity direction, messaging, and visual language that gives your business immediate clarity.",
  },
  {
    title: "Growth Creative",
    description:
      "High-impact visual content and campaign-ready assets designed to move attention and action.",
  },
  {
    title: "Ongoing Support",
    description:
      "Post-launch updates, optimization, and maintenance to keep your digital front door sharp.",
  },
] as const;

const process = [
  { step: "Discovery", detail: "Define your goals, audience, and offer positioning." },
  { step: "Direction", detail: "Shape a visual and messaging direction for launch." },
  { step: "Build", detail: "Design and develop the site with a tight execution cycle." },
  { step: "Refine", detail: "Polish details, content flow, and conversion moments." },
  { step: "Deploy", detail: "Launch confidently with performance and analytics in place." },
] as const;

const stats = [
  { value: "2026", label: "Built for now" },
  { value: "Fast", label: "Execution model" },
  { value: "B/W", label: "Design language" },
  { value: "FORGE", label: "Subset brand" },
] as const;

export default function Home() {
  return (
    <>
      <section className="relative min-h-screen flex items-end pb-20 pt-32 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=80"
            alt="FORGE creative workspace"
            fill
            className="object-cover grayscale"
            priority
          />
          <div className="absolute inset-0 bg-black/65" />
        </div>

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-10 w-full">
          <p className="text-xs uppercase tracking-[0.3em] text-gray-400 mb-6">
            FORGE by Foundry Frame
          </p>
          <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-[9rem] font-heading font-bold text-white leading-[0.9] tracking-tight mb-10">
            We Forge
            <br />
            Digital Momentum
          </h1>

          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-8 border-t border-white/20 pt-8">
            <p className="max-w-xl text-gray-400 text-sm leading-relaxed">
              A focused subset of the Foundry Frame experience built for brands
              that need speed, clarity, and high-standard execution.
            </p>
            <div className="flex gap-4">
              <Link
                href="/shop"
                className="px-6 py-3 bg-white text-black text-sm font-bold uppercase tracking-wider hover:bg-gray-200 transition-colors"
              >
                View Packages
              </Link>
              <Link
                href="/contact"
                className="px-6 py-3 border border-white/30 text-white text-sm font-bold uppercase tracking-wider hover:bg-white/10 transition-colors"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 lg:py-32 bg-black">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-16">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-3">
                Core Offerings
              </p>
              <h2 className="text-4xl sm:text-5xl font-heading font-bold text-white">
                Built To Launch
              </h2>
            </div>
            <Link
              href="/services"
              className="text-xs uppercase tracking-wider text-gray-400 hover:text-white border-b border-gray-400 hover:border-white pb-1 transition-colors"
            >
              All Services
            </Link>
          </div>

          <div className="border-t border-white/10">
            {offerings.map((item, i) => (
              <div
                key={item.title}
                className="grid grid-cols-1 md:grid-cols-12 gap-4 py-8 border-b border-white/10"
              >
                <div className="md:col-span-1 text-gray-500 text-xs font-mono">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="md:col-span-4 text-white font-heading font-semibold text-lg">
                  {item.title}
                </h3>
                <p className="md:col-span-7 text-gray-500 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <p className="text-xs uppercase tracking-[0.3em] text-gray-400 mb-3">
            Process
          </p>
          <h2 className="text-4xl sm:text-5xl font-heading font-bold text-black mb-16">
            How FORGE Works
          </h2>

          <div className="border-t border-black/10">
            {process.map((item, i) => (
              <div
                key={item.step}
                className="grid grid-cols-1 md:grid-cols-12 gap-4 py-8 border-b border-black/10"
              >
                <div className="md:col-span-1 text-gray-400 text-xs font-mono">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="md:col-span-3 text-black font-heading font-semibold text-lg">
                  {item.step}
                </h3>
                <p className="md:col-span-8 text-gray-500 text-sm leading-relaxed">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 lg:py-32 bg-black border-y border-white/10">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/10">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-black p-8 lg:p-12 text-center">
                <div className="text-5xl sm:text-6xl font-heading font-bold text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-500 text-xs uppercase tracking-widest">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 lg:py-32 bg-black border-t border-white/10">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="max-w-3xl">
            <p className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-6">
              Start With FORGE
            </p>
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-heading font-bold text-white leading-[0.95] mb-8">
              Ready to launch your next chapter?
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed mb-10 max-w-lg">
              This subset is intentionally focused so you can move from idea to
              execution quickly. Expand with product pages whenever you are
              ready.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="px-8 py-4 bg-white text-black font-bold text-sm uppercase tracking-wider hover:bg-gray-200 transition-colors"
              >
                Get In Touch
              </Link>
              <Link
                href="/shop"
                className="px-8 py-4 border border-white/20 text-white font-bold text-sm uppercase tracking-wider hover:bg-white/5 transition-colors"
              >
                View Packages
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
