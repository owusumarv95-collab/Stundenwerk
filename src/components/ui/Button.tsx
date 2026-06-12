import Link from "next/link";
import { clsx } from "clsx";

type Variant = "primary" | "ghost";

const styles: Record<Variant, string> = {
  // Kupfer — der einzige warme Punkt der Seite. Sparsam einsetzen.
  primary:
    "bg-kupfer text-porzellan hover:bg-kupfer-tief active:translate-y-px",
  ghost:
    "border border-tinte/15 text-tinte hover:border-tinte/40 active:translate-y-px",
};

const basis =
  "inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3.5 " +
  "font-sans text-base font-medium leading-none " +
  "transition-[background-color,border-color,transform] duration-200 ease-expo";

export default function Button({
  href,
  variant = "primary",
  external = false,
  children,
  className,
}: {
  href: string;
  variant?: Variant;
  /** Externe Ziele (z. B. die Demo-Instanz) öffnen in neuem Tab */
  external?: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  const klassen = clsx(basis, styles[variant], className);

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={klassen} data-magnet>
        {children}
        <span aria-hidden className="text-sm">↗</span>
      </a>
    );
  }
  return (
    <Link href={href} className={klassen} data-magnet>
      {children}
    </Link>
  );
}
