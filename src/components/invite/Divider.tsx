import { cn } from "@/lib/utils";

export function Divider({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 240 24"
      className={cn("mx-auto h-6 w-48 text-gold", className)}
      fill="none"
      stroke="currentColor"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="dv-l" x1="0" x2="1">
          <stop offset="0" stopColor="currentColor" stopOpacity="0" />
          <stop offset="1" stopColor="currentColor" stopOpacity="1" />
        </linearGradient>
        <linearGradient id="dv-r" x1="1" x2="0">
          <stop offset="0" stopColor="currentColor" stopOpacity="0" />
          <stop offset="1" stopColor="currentColor" stopOpacity="1" />
        </linearGradient>
      </defs>
      <path d="M4 12 H92" stroke="url(#dv-l)" strokeWidth="0.8" />
      <path d="M148 12 H236" stroke="url(#dv-r)" strokeWidth="0.8" />
      <path d="M92 12 c6 -7 14 -7 18 0 c-4 7 -12 7 -18 0z" strokeWidth="0.8" />
      <path d="M148 12 c-6 -7 -14 -7 -18 0 c4 7 12 7 18 0z" strokeWidth="0.8" />
      <path d="M120 3 l5 9 l-5 9 l-5 -9z" fill="currentColor" fillOpacity="0.25" strokeWidth="0.8" />
      <circle cx="120" cy="12" r="1.6" fill="currentColor" stroke="none" />
      <circle cx="104" cy="12" r="0.9" fill="currentColor" stroke="none" />
      <circle cx="136" cy="12" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}
