import { cva } from "class-variance-authority";
import React from "react";
import { twMerge } from "tailwind-merge";

const labelStyle = cva("", {
  variants: {
    variant: {
      primary: [
        "block text-sm font-medium leading-6 text-gray-900 text-main-text",
      ],
      checkbox: [
        "block text-sm font-medium leading-6 text-gray-400 rounded-full bg-transparent",
      ],
    },
  },
  defaultVariants: {
    variant: "primary",
  },
});

type pageProps = {
  label?: string;
  variant?: "primary" | "checkbox";
  required?: boolean;
  className?: string;
  children?: React.ReactNode;
};

function Label({
  label = "",
  variant = "primary",
  required = false,
  className = "",
  children = null,
}: pageProps) {
  return (
    <label className={twMerge(labelStyle({ variant }), className)}>
      {children}
      {required && <span className="text-red-800">*</span>} {label}
    </label>
  );
}

export default Label;
