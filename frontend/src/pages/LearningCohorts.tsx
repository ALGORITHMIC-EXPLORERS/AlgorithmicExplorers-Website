import CohortsSection from "../components/CohortsSection";
import CohortStatsSection from "../components/CohortStats";
import ExplorersSection from "../components/ExplorersSection";
import Footer from "../components/Footer";
import { motion } from "framer-motion";

const LearningCohortPage = () => {
  return (
    <>
      <motion.div
        className="relative bg-[#050020] py-8 overflow-hidden"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="pointer-events-none absolute -top-32 -left-32 h-80 w-80 rounded-full bg-[radial-gradient(circle,_rgba(255,255,255,0.55)_0%,_rgba(255,255,255,0)_70%)] blur-[110px]" />
        <CohortsSection />
        <CohortStatsSection />
        <ExplorersSection />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.25, duration: 0.6 }}
      >
        <Footer />
      </motion.div>
    </>
  );
};

export default LearningCohortPage;