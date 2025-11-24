// src/components/WhoWeAre.tsx
import { useRef, useEffect, useState } from "react";
import { motion, useInView, useSpring, useTransform } from "framer-motion";

const AnimatedCounter = ({ 
  value, 
  duration = 2,
  format = "number" 
}: { 
  value: number; 
  duration?: number;
  format?: "number" | "abbreviated";
}) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [started, setStarted] = useState(false);

  const springValue = useSpring(0, { 
    duration: duration * 1000,
    bounce: 0 
  });

  useEffect(() => {
    if (inView && !started) {
      setStarted(true);
      springValue.set(value);
    }
  }, [inView, value, springValue, started]);

  const displayValue = useTransform(springValue, (latest) => {
    if (format === "abbreviated") {
      const rounded = Math.round(latest);
      if (rounded >= 1000000) {
        return (rounded / 1000000).toFixed(1) + "M";
      } else if (rounded >= 1000) {
        return (rounded / 1000).toFixed(1) + "k";
      }
      return rounded.toString();
    }
    return Math.round(latest).toLocaleString();
  });

  const [display, setDisplay] = useState(format === "abbreviated" ? "0M" : "0");

  useEffect(() => {
    return displayValue.on("change", (latest) => setDisplay(latest));
  }, [displayValue]);

  return <span ref={ref}>{display}</span>;
};

const StatBlock = ({ 
  value, 
  label, 
  delay = 0,
  format = "number"
}: { 
  value: number; 
  label: string; 
  delay?: number;
  format?: "number" | "abbreviated";
}) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, delay }}
      className="flex items-baseline gap-1 sm:gap-2 group"
    >
      <div className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white leading-tight group-hover:text-purple-400 transition-colors duration-300">
        <AnimatedCounter value={value} format={format} />
      </div>
      <div className="text-[10px] sm:text-xs md:text-sm text-white/60 font-medium leading-tight">
        {label.split('\n').map((line, i) => (
          <div key={i}>{line}</div>
        ))}
      </div>
    </motion.div>
  );
};

export default function WhoWeAre() {
  const chartRef = useRef(null);
  const textRef = useRef(null);
  const chartInView = useInView(chartRef, { once: true, margin: "-100px" });
  const textInView = useInView(textRef, { once: true, margin: "-100px" });

  return (
    <section
      className="relative px-4 sm:px-6 py-12 sm:py-16 md:py-24 overflow-hidden"
      aria-labelledby="who-we-are"
    >
      {/* Background linear */}
      <div className="absolute inset-0 -z-10 bg-linear-to-b from-transparent via-purple-900/5 to-transparent" />

      {/* Content container */}
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 md:gap-16 lg:gap-20 items-center">

          {/* LEFT: Chart Image */}
          <motion.div
            ref={chartRef}
            initial={{ opacity: 0, x: -50 }}
            animate={chartInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative group"
          >
            {/* Glow effect behind image */}
            <div className="absolute -inset-4 bg-linear-to-br from-purple-500/20 via-pink-500/10 to-transparent rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <img 
              src='/chart.png' 
              alt='Who We Are Chart' 
              className="relative w-full h-auto object-contain hover:scale-[1.02] transition-all duration-500 rounded-2xl shadow-2xl" 
            />
          </motion.div>

          {/* RIGHT: Stats & Description */}
          <div ref={textRef} className="space-y-6 sm:space-y-8 md:space-y-10">
            <div className="grid grid-cols-2 gap-4 sm:gap-6 md:gap-8 mb-6 sm:mb-8">
              <StatBlock
                value={24}
                label="Years\nExperience"
                delay={0.1}
                format="number"
              />
              <StatBlock
                value={10000}
                label="Official\nSubscribers"
                delay={0.2}
                format="abbreviated"
              />
              <StatBlock
                value={1000000}
                label="User's\nSatisfaction"
                delay={0.3}
                format="abbreviated"
              />
              <div />
            </div>

            <div className="space-y-4 pt-4 border-t border-white/10">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={textInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-white/70 leading-relaxed text-sm md:text-base"
              >
                Simplify your workflow with our intuitive task management tool, designed to help you stay on top of your daily
                responsibilities and long-term goals.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={textInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="font-semibold text-base md:text-lg bg-linear-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
              >
                Streamline Your Workflow, Achieve More.
              </motion.p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-black/50 to-transparent -z-20" />
    </section>
  );
}
