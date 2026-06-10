import { motion } from "framer-motion";
import { type ReactNode } from "react";

interface GradientButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit";
  size?: "sm" | "md" | "lg";
}

export default function GradientButton({
  children,
  onClick,
  className = "",
  disabled = false,
  type = "button",
  size = "md",
}: GradientButtonProps) {
  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: disabled ? 1 : 1.03 }}
      whileTap={{ scale: disabled ? 1 : 0.97 }}
      className={`relative group overflow-hidden rounded-xl font-semibold text-white cursor-pointer
        bg-gradient-to-r from-ig-purple via-ig-red to-ig-orange
        ${sizeClasses[size]}
        ${disabled ? "opacity-50 cursor-not-allowed" : ""}
        ${className}`}
      style={{ backgroundSize: "200% 100%" }}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
      <div
        className="absolute inset-0 bg-gradient-to-r from-ig-orange via-ig-red to-ig-purple opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        aria-hidden
      />
    </motion.button>
  );
}
