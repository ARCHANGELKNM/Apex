import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "group/badge inline-flex h-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-full border px-2.5 py-0.5 text-[10px] font-head font-medium whitespace-nowrap shadow-[0_8px_16px_rgba(17,17,17,0.06)] transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 aria-invalid:border-destructive [&>svg]:pointer-events-none [&>svg]:size-3!",
  {
    variants: {
      variant: {
        default:
          "border-[rgba(23,20,17,0.08)] bg-[linear-gradient(135deg,#1a1b1f_0%,#2b2d32_100%)] text-[#f5f0e9] [a]:hover:bg-primary/80",
        secondary:
          "border-[rgba(23,20,17,0.08)] bg-[linear-gradient(135deg,#d7ba80_0%,#f2e0b4_100%)] text-[#171411] [a]:hover:bg-secondary/80",
        destructive:
          "border-[rgba(23,20,17,0.08)] bg-[linear-gradient(135deg,#a14c4c_0%,#c65d5d_100%)] text-[#fff7f3] [a]:hover:bg-destructive/90",
        outline:
          "border-[rgba(23,20,17,0.1)] bg-white/65 text-[var(--foreground)] [a]:hover:bg-muted [a]:hover:text-muted-foreground",
        ghost:
          "border-transparent bg-transparent shadow-none hover:bg-muted hover:text-muted-foreground dark:hover:bg-muted/50",
        link: "border-transparent bg-transparent shadow-none text-primary underline-offset-4 hover:underline",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

function Badge({
  className,
  variant = "default",
  render,
  ...props
}) {
  return useRender({
    defaultTagName: "span",
    props: mergeProps({
      className: cn(badgeVariants({ variant }), className),
    }, props),
    render,
    state: {
      slot: "badge",
      variant,
    },
  });
}

export { Badge, badgeVariants }
