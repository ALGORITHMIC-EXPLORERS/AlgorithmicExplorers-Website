import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface GuruButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: "primary" | "secondary" | "outline";
  type?: "button" | "submit";
  disabled?: boolean;
}

export default function GuruButton({
  children,
  onClick,
  className = "",
  variant = "primary",
  type = "button",
  disabled = false,
}: GuruButtonProps) {
  const baseStyles = "px-6 py-3 rounded-full font-semibold transition-all duration-300 flex items-center justify-center gap-2 text-sm md:text-base cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "guru-gradient text-white guru-glow hover:opacity-90 active:scale-95",
    secondary: "bg-white/10 text-white border border-white/20 hover:bg-white/20 active:scale-95",
    outline: "bg-transparent text-[#b9acc9] border border-[#361b40] hover:border-[#8a2bff] hover:text-white active:scale-95",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </motion.button>
  );
}
