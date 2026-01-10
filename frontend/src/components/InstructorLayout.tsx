import React from "react";
import InstructorSidebar from "./InstructorSidebar";
import { Search, Bell, Grid, MoreHorizontal } from "lucide-react";
import { motion } from "framer-motion";

interface InstructorLayoutProps {
  children: React.ReactNode;
  title: string;
}

export default function InstructorLayout({ children, title }: InstructorLayoutProps) {
  return (
    <div className="min-h-screen bg-[#06001a] text-white flex">
      {/* Permanent Sidebar */}
      <InstructorSidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Top Header */}
        <header className="h-24 border-b border-white/5 px-10 flex items-center justify-between bg-[#06001a]/50 backdrop-blur-xl sticky top-0 z-10">
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
            <div className="flex items-center gap-2 mt-1">
               <div className="w-2 h-2 rounded-full bg-green-500" />
               <span className="text-[10px] text-white/40 font-bold uppercase tracking-widest leading-none">Live System</span>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="relative hidden md:block">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={18} />
              <input 
                placeholder="Search analytics..." 
                className="bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-2.5 text-sm w-72 focus:outline-none focus:border-[#8a2bff]/50 transition-all font-medium"
              />
            </div>
            
            <div className="flex items-center gap-2">
              <button className="p-3 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all relative">
                <Bell size={20} className="text-white/60" />
                <div className="absolute top-3 right-3 w-2 h-2 bg-[#8a2bff] rounded-full guru-glow" />
              </button>
              <button className="p-3 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all">
                <Grid size={20} className="text-white/60" />
              </button>
              <button className="p-3 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all">
                <MoreHorizontal size={20} className="text-white/60" />
              </button>
            </div>
          </div>
        </header>

        {/* Scrollable Content Container */}
        <main className="flex-1 overflow-y-auto p-10 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-from),_transparent_40%)] from-[#1a0b3b]/20">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
}
