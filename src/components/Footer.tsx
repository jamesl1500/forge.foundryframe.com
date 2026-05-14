import Link from "next/link";

const footerColumns = [
  {
    title: "FORGE",
    links: [
      { label: "About", href: "/about" },
      { label: "Services", href: "/services" },
      { label: "Shop", href: "/shop" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Offerings",
    links: [
      { label: "Launch Websites", href: "/shop#landing-pages" },
      { label: "Brand Foundations", href: "/services" },
      { label: "Growth Creative", href: "/services" },
      { label: "Maintenance", href: "/shop#saas-foundations" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Blog", href: "/blog" },
      { label: "FAQ", href: "/faq" },
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
    ],
  },
] as const;

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/10">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          <div className="lg:col-span-4">
            <Link
              href="/"
              className="text-white font-heading font-bold text-lg tracking-tight uppercase mb-6 inline-block"
            >
              FORGE by Foundry Frame
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
              A focused Foundry Frame subset for businesses that need premium
              execution without the noise.
            </p>
          </div>

          {footerColumns.map((column) => (
            <div key={column.title} className="lg:col-span-2">
              <h3 className="text-white text-xs font-bold uppercase tracking-widest mb-5">
                {column.title}
              </h3>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-gray-500 text-sm hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-gray-500 text-xs">
              &copy; {new Date().getFullYear()} FORGE by Foundry Frame. All
              rights reserved.
            </p>
            <p className="text-gray-500 text-xs">Designed to scale with your product catalog.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
