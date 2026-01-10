import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface StatItemProps {
  value: number;
  label: string;
  duration?: number;
}

const StatItem = ({ value, label, duration = 2000 }: StatItemProps) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    const incrementTime = Math.abs(Math.floor(duration / end));

    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start === end) clearInterval(timer);
    }, incrementTime);

    return () => clearInterval(timer);
  }, [value, duration]);

  return (
    <div className="flex flex-col items-center text-white text-center">
      <span className="text-3xl font-bold">{count}+</span>
      <span className="text-sm opacity-70">{label}</span>
    </div>
  );
};

const CohortStatsSection = () => {
  const stats = [
    { value: 250, label: "Courses run by lead instructors" },
    { value: 1000, label: "Courses taken by past learners" },
    { value: 15, label: "Countries our learners are from" },
    { value: 2400, label: "Courses run by lead mentors" }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true }}
      className="w-full bg-[#0f003d] py-12"
    >
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 px-6">
        {stats.map((stat, i) => (
          <div key={i} className="relative">
            <StatItem value={stat.value} label={stat.label} />
            {i !== stats.length - 1 && (
              <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 h-10 w-px bg-white/20" />
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default CohortStatsSection;
