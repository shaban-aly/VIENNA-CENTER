"use client";

import { Loader2, Search, X } from "lucide-react";

type SearchInputProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  ariaLabel?: string;
  isSearching?: boolean;
};

export function SearchInput({
  value,
  onChange,
  placeholder,
  ariaLabel,
  isSearching = false,
}: SearchInputProps) {
  return (
    <div className="relative">
      {isSearching ? (
        <Loader2
          size={20}
          className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 animate-spin text-gold"
        />
      ) : (
        <Search
          size={20}
          className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gold"
        />
      )}

      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        aria-label={ariaLabel}
        className="min-h-14 w-full rounded-[14px] border border-border bg-card-secondary ps-12 pe-12 text-right text-sm text-white outline-none transition placeholder:text-muted focus:border-gold [&::-webkit-search-cancel-button]:hidden"
      />

      {value ? (
        <button
          type="button"
          aria-label="مسح البحث"
          onClick={() => onChange("")}
          className="absolute left-3 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-lg text-muted transition hover:bg-card hover:text-gold"
        >
          <X size={18} />
        </button>
      ) : null}
    </div>
  );
}
