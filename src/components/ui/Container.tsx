import { clsx } from "clsx";

export default function Container({
  children,
  className,
  wide = false,
}: {
  children: React.ReactNode;
  className?: string;
  /** Breiter Modus für Hero/Showcase */
  wide?: boolean;
}) {
  return (
    <div
      className={clsx(
        "mx-auto w-full px-5 sm:px-8 lg:px-12",
        wide ? "max-w-[96rem]" : "max-w-7xl",
        className
      )}
    >
      {children}
    </div>
  );
}
