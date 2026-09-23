import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "group/badge inline-flex h-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-sm border-2 border-black px-2.5 py-0.5 text-[10px] font-head font-medium whitespace-nowrap shadow-[2px_2px_0_#00000020] transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 aria-invalid:border-destructive [&>svg]:pointer-events-none [&>svg]:size-3!",
  {
    variants: {
      variant: {
        default: "bg-[#171411] text-[#f9f3eb] [a]:hover:bg-primary/80",
        secondary:
          "bg-[linear-gradient(135deg,#f3e5c6_0%,#e5d4a7_100%)] text-[#171411] [a]:hover:bg-secondary/80",
        destructive: "bg-[#d96d5d] text-white [a]:hover:bg-destructive/90",
        outline:
          "bg-white text-[#171411] [a]:hover:bg-muted [a]:hover:text-muted-foreground",
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
