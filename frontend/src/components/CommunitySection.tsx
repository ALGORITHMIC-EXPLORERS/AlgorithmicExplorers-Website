import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const VECTOR = "Vector.png";
const GHANA = "ghana 1.png";

export default function CommunitySection(){
  return (
    <section className="relative h-fit p-5 bg-[#070014] text-white overflow-hidden flex flex-col items-center">
      {/* Title Section */}
      <div className="mt-20 text-center">
        <h1 className="text-5xl font-semibold tracking-tight">Our<span className="text-white/80">Community</span></h1>
        <div className="flex justify-center mt-4">
          <div className="flex items-center gap-2 bg-[#0e002b] px-4 py-1 rounded-full border border-[#3a2a76] text-xs text-gray-300">
            <div className="w-2 h-2 rounded-full bg-[#8a5bff] shadow-[0_0_8px_#8a5bff]" />
            <img src='/btn-members.png' className="w-full h-full"/>
          </div>
        </div>
      </div>

      {/* Country Buttons */}
      <div className="flex flex-wrap justify-center gap-3 mt-6">
        {['Ghana', 'Nigeria', 'Tokyo', 'Morocco', ].map((c, i) => (
          <motion.button
            key={i}
            whileHover={{ scale: 1.05 }}
            className="px-5 py-1 text-sm bg-[#0b0030] border border-[#261b60] rounded-full text-gray-200 shadow-lg"
          >
            <img src={GHANA} className="inline-block w-4 h-4 mr-2 align-middle" /> 
            {c}
          </motion.button>
        ))}
        <div>
          See More
          <ArrowRight size={14} className="inline-block ml-1 align-middle" />
        </div>
      </div>

      {/* MAP SECTION */}
      <div className="relative w-full max-w-6xl mt-10 flex justify-center">
        <div className="w-full bg-[#050014]  rounded-2xl overflow-hidden relative">
          {/* Map Background */}
          <img src={VECTOR} alt="map" className="w-full opacity-80 object-cover" />

          {/* Search Bar */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-full max-w-xl px-6">
            <div className="flex bg-gradient-to-r from-[#0e002b] to-[#220044] border border-[#3c1f7e] p-1 rounded-full backdrop-blur-xl shadow-[0_0_20px_#7b4bff50]">
              <input
                placeholder="Search Location..."
                className="flex-1 bg-transparent px-4 py-3 outline-none text-sm placeholder-gray-400"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="px-6 py-2 bg-gradient-to-r from-[#7b4bff] to-[#612bff] rounded-full text-white font-medium shadow-lg"
              >
                Join Community
              </motion.button>
            </div>
          </div>
          </div>
          </div>


      {/* Bottom CTA */}
      <div className="mt-16 text-center">
        <h3 className="text-3xl font-semibold">So, what are you waiting for?</h3>
        <p className="text-gray-300 mt-2">Stay updated with the latest news, tips, and updates.</p>

        <div className="flex justify-center gap-4 mt-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="px-8 py-2 bg-gradient-to-r from-[#7b4bff] to-[#5f2bff] rounded-full shadow-xl"
          >
            Get Started
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            className="px-8 py-2 border border-[#3b2a5c] rounded-full text-gray-300"
          >
            Learn More
          </motion.button>
        </div>
      </div>
    </section>
  );
}
