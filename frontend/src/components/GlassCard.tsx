import { motion } from "framer-motion";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  animate?: boolean;
}

export default function GlassCard({ children, className = "", animate = true }: GlassCardProps) {
  const content = (
    <div className={`glass-effect rounded-3xl p-6 relative overflow-hidden ${className}`}>
      {/* Subtle Inner Glow */}
      <div className="absolute inset-0 bg-white/2 pointer-events-none" />
      {children}
    </div>
  );

  if (!animate) return content;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {content}
    </motion.div>
  );
}
