import React from "react";
import { Spinner } from "@/components/ui/spinner-1";
import clsx from "clsx";

const sizes = [
  {
    tiny: "px-1.5 h-6 text-sm",
    small: "px-1.5 h-8 text-sm",
    medium: "px-2.5 h-10 text-sm",
    large: "px-3.5 h-12 text-base"
  },
  {
    tiny: "w-6 h-6 text-sm",
    small: "w-8 h-8 text-sm",
    medium: "w-10 h-10 text-sm",
    large: "w-12 h-12 text-base"
  }
];

const types = {
  primary: "bg-brass hover:bg-brass/90 text-onyx fill-onyx border-none",
  secondary: "bg-transparent hover:bg-brass/10 text-offwhite fill-offwhite border border-brass/50",
  tertiary: "bg-transparent hover:bg-stone/10 text-offwhite fill-offwhite border-none",
  error: "bg-red-800 hover:bg-red-900 text-white fill-white border-none",
  warning: "bg-amber-800 hover:bg-amber-850 text-black fill-black border-none"
};

const shapes = {
  square: {
    tiny: "rounded",
    small: "rounded-md",
    medium: "rounded-md",
    large: "rounded-lg"
  },
  circle: {
    tiny: "rounded-[100%]",
    small: "rounded-[100%]",
    medium: "rounded-[100%]",
    large: "rounded-[100%]"
  },
  rounded: {
    tiny: "rounded-[100px]",
    small: "rounded-[100px]",
    medium: "rounded-[100px]",
    large: "rounded-[100px]"
  }
};

export interface ButtonProps {
  size?: keyof typeof sizes[0];
  type?: keyof typeof types;
  variant?: "styled" | "unstyled";
  shape?: keyof typeof shapes;
  svgOnly?: boolean;
  children?: React.ReactNode;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  shadow?: boolean;
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  ref?: React.Ref<HTMLButtonElement>;
  className?: string;
}

export const Button = ({
  size = "medium",
  type = "primary",
  variant = "styled",
  shape = "square",
  svgOnly = false,
  children,
  prefix,
  suffix,
  shadow = false,
  loading = false,
  disabled = false,
  fullWidth = false,
  onClick,
  ref,
  className,
  ...rest
}: ButtonProps) => {
  return (
    <button
      ref={ref}
      type="submit"
      disabled={disabled}
      onClick={onClick}
      tabIndex={0}
      className={clsx(
        "flex justify-center items-center gap-0.5 duration-150",
        sizes[+svgOnly][size],
        (disabled || loading) ? "bg-stone/20 text-stone/50 border border-stone/30 cursor-not-allowed" : types[type],
        shapes[shape][size],
        shadow && "shadow-border-small border-none",
        fullWidth && "w-full",
        variant === "unstyled" ? "outline-none px-0 h-fit bg-transparent hover:bg-transparent text-offwhite" : "focus:shadow-focus-ring focus:outline-0",
        className
      )}
      {...rest}
    >
      {loading
        ? <Spinner size={size === "large" ? 24 : 16} />
        : prefix
      }
      <span className={clsx(
        "relative overflow-hidden whitespace-nowrap overflow-ellipsis font-sans",
        size !== "tiny" && variant !== "unstyled" && "px-1.5"
      )}>
        {children}
      </span>
      {!loading && suffix}
    </button>
  );
};
