"use client";

import React from "react";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "disabled";
};

export default function WizardButton({
  variant = "primary",
  className = "",
  children,
  ...props
}: Props) {
  const styles =
    variant === "disabled"
      ? "bg-[#F2ECE6] text-[#9D8A7B] cursor-not-allowed"
      : "bg-[#2A1607] text-white cursor-pointer hover:opacity-90 transition-opacity";

  return (
    <button
      {...props}
      className={`rounded-full px-8 py-3 ${styles} ${className}`}
    >
      {children}
    </button>
  );
}