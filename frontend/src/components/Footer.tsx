import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

// Reference screenshot (for assets or visual comparison)
// Screenshot path provided in this conversation:
// "/mnt/data/Screenshot from 2025-11-24 00-28-11.png"

export default function Footer() {
  return (
    <footer className="w-full mt-20 bg-gradient-to-br from-[#050020] via-[#0a0230] to-[#1c0054] text-[#dcd2e8]">
      <div className="max-w-6xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Left column: Brand + description */}
          <div className="md:col-span-4">
            <h2 className="text-2xl md:text-2xl font-extrabold text-white mb-3">Algorithmic Explorers.</h2>
            <p className="text-sm text-[#b9acc9] max-w-sm leading-relaxed">
              Work together seamlessly with real-time updates
              and communication.
            </p>
            <p className="text-sm text-[#8a7a9e] mt-6">Team Conditional & Policy</p>
          </div>

          {/* Middle columns: Pages & Company */}
          <div className="md:col-span-5 grid grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm text-[#8a7a9e] mb-3">Pages</h3>
              <ul className="space-y-2 text-sm">
                <li className="text-[#dcd2e8]">Home</li>
                <li className="text-[#b9acc9]">Projects</li>
                <li className="text-[#b9acc9]">AE News</li>
                <li className="text-[#b9acc9]">Exco Team</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm text-[#8a7a9e] mb-3">Company</h3>
              <ul className="space-y-2 text-sm">
                <li className="text-[#b9acc9]">Customer</li>
                <li className="text-[#b9acc9]">Enterprise</li>
                <li className="text-[#b9acc9]">Partners</li>
                <li className="text-[#b9acc9]">Job</li>
              </ul>
            </div>
          </div>

          {/* Right column: buttons */}
          <div className="md:col-span-3 flex flex-col items-end gap-4">
            <motion.button
              whileHover={{ scale: 1.03 }}
              className="px-5 py-2 rounded-full bg-transparent border border-[#361b40] text-[#b9acc9] text-sm"
            >
              Sing Up
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.03 }}
              className="px-5 py-2 rounded-full bg-gradient-to-r from-[#c43bff] to-[#7b00ff] text-white text-sm flex items-center gap-2"
            >
              <span>Log In</span>
              <ArrowRight size={14} />
            </motion.button>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-[#1a0f22] my-8" />

        {/* Bottom line */}
        <div className="flex items-center justify-center text-sm text-[#8a7a9e]">
          <div className="text-center text-xs text-[#6f5f80]">©ae. all right reserve</div>
        </div>
        </div>
    </footer>
  );
}
