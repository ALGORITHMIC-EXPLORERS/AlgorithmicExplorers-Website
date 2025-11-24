import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function ScrollFadeIn({
  children,
  y = 40,
  duration = 0.6,
  delay = 0,
}: {
  children: React.ReactNode;
  y?: number;
  duration?: number;
  delay?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration, delay }}
    >
      {children}
    </motion.div>
  );
}
