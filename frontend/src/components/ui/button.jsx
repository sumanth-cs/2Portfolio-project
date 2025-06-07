import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { cn } from "@/utils/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/50 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-primary-600 text-white hover:bg-primary-700 shadow-sm",
        secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 shadow-sm",
        outline: "border border-gray-300 bg-transparent hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800",
        ghost: "hover:bg-gray-100 dark:hover:bg-gray-800",
        link: "text-primary-600 underline-offset-4 hover:underline dark:text-primary-500",
      },
      size: {
        sm: "h-8 px-3 text-xs",
        default: "h-10 px-4 py-2",
        lg: "h-12 px-6 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };