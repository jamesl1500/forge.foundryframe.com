import Link from "next/link";

type BuyButtonProps = {
  categorySlug: string;
  tierSlug: string;
  className: string;
};

export default function BuyButton({ categorySlug, tierSlug, className }: BuyButtonProps) {
  const href = `/api/checkout?category=${encodeURIComponent(categorySlug)}&tier=${encodeURIComponent(tierSlug)}`;

  return (
    <Link href={href} className={className}>
      Buy Now
    </Link>
  );
}