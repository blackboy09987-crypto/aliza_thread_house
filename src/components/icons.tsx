import type { ComponentType } from "react";

type IconProps = { className?: string };

export function CartIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M3 4h2l2.2 11.2a2 2 0 0 0 2 1.6h7.6a2 2 0 0 0 2-1.6L20.5 8H6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="9.5" cy="20.5" r="1.4" fill="currentColor" />
      <circle cx="17" cy="20.5" r="1.4" fill="currentColor" />
    </svg>
  );
}

export function EmbroideryIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="5.5" stroke="currentColor" strokeWidth="1.2" strokeDasharray="1 3" />
      <path d="M12 3v2M12 19v2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function CardiganIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M8 3 5 5v4l2-.8V20h10V8.2L19 9V5l-3-2-2 1.5h-4L8 3Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M12 4v16" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

export function AmigurumiIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <circle cx="12" cy="14" r="7" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="7.5" cy="6" r="2.2" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="16.5" cy="6" r="2.2" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="9.5" cy="13" r="0.9" fill="currentColor" />
      <circle cx="14.5" cy="13" r="0.9" fill="currentColor" />
      <path d="M10 17q2 1.4 4 0" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

export function KeychainIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <circle cx="8" cy="6" r="3.2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10.2 8.2 17 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M14.5 12.5 17 15l1.8-1.8M17 15l-1.8 1.8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function BagIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect x="4" y="9" width="16" height="11" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M8 9V6a4 4 0 0 1 8 0v3" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

export function FlowerIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="2.3" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="12" cy="6.5" r="2.6" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="12" cy="17.5" r="2.6" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="6.5" cy="12" r="2.6" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="17.5" cy="12" r="2.6" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

export function HomeIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M4 11 12 4l8 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6 10v9h12v-9" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M10 19v-5h4v5" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
  );
}

export function CustomIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="m12 3 1.8 4.6L18.5 9l-4.7 1.4L12 15l-1.8-4.6L5.5 9l4.7-1.4Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path d="M18 15.5 19 18l2.5 1-2.5 1-1 2.5-1-2.5L14.5 19l2.5-1Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
    </svg>
  );
}

export const CATEGORY_ICONS: Record<string, ComponentType<IconProps>> = {
  EMBROIDERY: EmbroideryIcon,
  CROCHET_APPAREL: CardiganIcon,
  AMIGURUMI: AmigurumiIcon,
  KEYCHAINS: KeychainIcon,
  BAGS_ACCESSORIES: BagIcon,
  FLOWERS_BOUQUETS: FlowerIcon,
  HOME_DECOR: HomeIcon,
  CUSTOM: CustomIcon,
};
