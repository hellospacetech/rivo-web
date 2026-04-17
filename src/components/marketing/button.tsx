import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * <Button>, boost-system marketing CTAs.
 *
 *   primary   → mkt-btn-invert  (cream pill on dark)
 *   secondary → mkt-btn-secondary (outline ghost)
 *
 * 44px min touch target, 4px radius, no shadow. Inherited from boost
 * verbatim, do not deviate.
 */

type Variant = "primary" | "secondary";

type BaseProps = {
  children: ReactNode;
  variant?: Variant;
  className?: string;
};

type ButtonAsButton = BaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps> & {
    href?: undefined;
  };

type ButtonAsAnchor = BaseProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseProps> & {
    href: string;
  };

type ButtonProps = ButtonAsButton | ButtonAsAnchor;

const VARIANT_CLASS: Record<Variant, string> = {
  primary: "mkt-btn-invert",
  secondary: "mkt-btn-secondary",
};

export function Button(props: ButtonProps) {
  const { variant = "primary", className, children, ...rest } = props;
  const cls = cn(VARIANT_CLASS[variant], className);

  if ("href" in props && props.href !== undefined) {
    const { href, ...anchorRest } =
      rest as AnchorHTMLAttributes<HTMLAnchorElement>;
    return (
      <a href={href} className={cls} {...anchorRest}>
        {children}
      </a>
    );
  }

  return (
    <button
      className={cls}
      {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  );
}
