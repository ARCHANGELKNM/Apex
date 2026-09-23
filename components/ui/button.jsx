import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  cn(
    "group/button font-head font-medium inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg whitespace-nowrap select-none transition-all duration-150",
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
          "border-2 border-black bg-[#171411] text-[#f9f3eb] shadow-[4px_4px_0_#000] transition hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_#000] active:translate-x-1 active:translate-y-1 active:shadow-none",
        secondary:
          "border-2 border-black bg-[linear-gradient(135deg,#f3e5c6_0%,#e5d4a7_100%)] text-[#171411] shadow-[4px_4px_0_#000] transition hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_#000] active:translate-x-1 active:translate-y-1 active:shadow-none",
        destructive:
          "border-2 border-black bg-[#d96d5d] text-white shadow-[4px_4px_0_#000] transition hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_#000] active:translate-x-1 active:translate-y-1 active:shadow-none",
        outline:
          "border-2 border-black bg-white text-[#171411] shadow-[4px_4px_0_#00000020] transition hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_#00000020] active:translate-x-1 active:translate-y-1 active:shadow-none",
        ghost: "bg-transparent hover:bg-black/5 text-[var(--foreground)]",
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
