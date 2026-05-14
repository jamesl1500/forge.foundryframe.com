"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type PurchaseSuccessModalProps = {
  openByDefault: boolean;
};

export default function PurchaseSuccessModal({ openByDefault }: PurchaseSuccessModalProps) {
  const [open, setOpen] = useState(openByDefault);
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const cleanPath = useMemo(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("paid");
    const query = params.toString();
    return query ? `${pathname}?${query}` : pathname;
  }, [pathname, searchParams]);

  if (!open) {
    return null;
  }

  function closeModal() {
    setOpen(false);
    router.replace(cleanPath, { scroll: false });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-6" role="dialog" aria-modal="true" aria-labelledby="purchase-success-title">
      <button
        type="button"
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        aria-label="Close success dialog"
        onClick={closeModal}
      />

      <div className="relative w-full max-w-xl border border-white/15 bg-black p-8 sm:p-10 shadow-[0_30px_80px_rgba(0,0,0,0.65)]">
        <p className="text-[10px] uppercase tracking-[0.3em] text-emerald-300 mb-4">Payment Received</p>
        <h2 id="purchase-success-title" className="text-3xl sm:text-4xl font-heading font-bold text-white leading-tight mb-4">
          Purchase successful.
        </h2>
        <p className="text-sm text-gray-300 leading-relaxed mb-8">
          Your order is confirmed. If your product includes instant delivery, check your inbox in the next few minutes.
          If you purchased GitHub access, watch for an organization invite.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            type="button"
            onClick={closeModal}
            className="px-5 py-3 text-sm font-bold uppercase tracking-wider bg-white text-black hover:bg-gray-200 transition-colors"
          >
            Continue
          </button>
          <Link
            href="/contact"
            className="px-5 py-3 text-center text-sm font-bold uppercase tracking-wider border border-white/25 text-white hover:bg-white/10 transition-colors"
            onClick={closeModal}
          >
            Need Help?
          </Link>
        </div>
      </div>
    </div>
  );
}