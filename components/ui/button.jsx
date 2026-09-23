import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  cn(
    "group/button font-head font-medium inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl whitespace-nowrap select-none transition-all duration-200",
    "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-60",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary aria-invalid:border-destructive",
    // Icons keep their own size; we only set a default when none is given so
    // RetroUI's h-4/size-4 icons aren't overridden.
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  ),
  {
    variants: {
      variant: {
        default:
          "border border-[rgba(23,20,17,0.08)] bg-[linear-gradient(135deg,#1a1b1f_0%,#2b2d32_100%)] text-[#f5f0e9] shadow-[0_16px_32px_rgba(17,17,17,0.18)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_18px_34px_rgba(17,17,17,0.22)] active:translate-y-0",
        secondary:
          "border border-[rgba(23,20,17,0.08)] bg-[linear-gradient(135deg,#d7ba80_0%,#f2e0b4_100%)] text-[#171411] shadow-[0_16px_32px_rgba(212,178,119,0.18)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_18px_34px_rgba(212,178,119,0.22)] active:translate-y-0",
        destructive:
          "border border-[rgba(23,20,17,0.08)] bg-[linear-gradient(135deg,#a14c4c_0%,#c65d5d_100%)] text-[#fff7f3] shadow-[0_14px_28px_rgba(161,76,76,0.2)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_18px_32px_rgba(161,76,76,0.24)] active:translate-y-0",
        outline:
          "border border-[rgba(23,20,17,0.1)] bg-white/55 text-[var(--foreground)] shadow-[0_10px_18px_rgba(17,17,17,0.04)] transition duration-200 hover:-translate-y-0.5 hover:bg-white/75 active:translate-y-0",
        ghost:
          "bg-transparent hover:bg-[rgba(23,20,17,0.04)] text-[var(--foreground)]",
        link: "bg-transparent hover:underline text-[var(--foreground)]",
      },
      size: {
        default: "px-4 py-1.5 text-base",
        xs: "px-2 py-0.5 text-xs",
        sm: "px-3 py-1 text-sm",
        lg: "px-6 py-2 text-base lg:px-8 lg:py-3 lg:text-lg",
        icon: "p-2",
        "icon-xs": "p-1",
        "icon-sm": "p-1.5",
        "icon-lg": "p-3",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}) {
  return (
    <ButtonPrimitive
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props} />
  );
}

export { Button, buttonVariants }
