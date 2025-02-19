
import { SVGProps } from "react";

export function CFAIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M10 8h5" />
      <path d="M10 12h4" />
      <path d="M10 8v8" />
    </svg>
  );
}
