import type { ReactNode } from "react";

interface GuruCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export default function GuruCard({
  children,
  className = "",
  hover = true,
}: GuruCardProps) {
  return (
    <div
      className={`glass-effect rounded-3xl p-6 transition-all duration-300 ${
        hover ? "hover:border-white/20 hover:bg-white/10" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}
