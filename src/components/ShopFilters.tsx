"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const SORT_OPTIONS: { value: string; label: string }[] = [
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
];

export default function ShopFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("q") ?? "");
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function updateParam(key: string, value: string) {
    const params = new URLSearchParams(window.location.search);
    if (value) params.set(key, value);
    else params.delete(key);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      updateParam("q", search);
    }, 300);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  return (
    <div className="mb-6 flex flex-wrap items-center gap-3">
      <div className="relative flex-1 min-w-[200px]">
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search pieces…"
          aria-label="Search products"
          className="w-full rounded-full border border-cream-line bg-cream px-4 py-2 text-sm text-ink placeholder:text-ink-soft/60"
        />
      </div>

      <label className="flex items-center gap-2 text-sm text-ink-soft">
        Sort
        <select
          value={searchParams.get("sort") ?? "newest"}
          onChange={(e) => updateParam("sort", e.target.value)}
          className="rounded-full border border-cream-line bg-cream px-3 py-2 text-sm text-ink"
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
