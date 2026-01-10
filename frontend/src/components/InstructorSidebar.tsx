import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, BookOpen, MessageSquare, DollarSign, Settings, ChevronRight, Users } from "lucide-react";
import { motion } from "framer-motion";

const menuItems = [
  { name: "Dashboard", path: "/instructor/dashboard", icon: LayoutDashboard },
  { name: "My Courses", path: "/instructor/courses", icon: BookOpen },
  { name: "Guru Circle", path: "/guru-circle/forum", icon: Users },
  { name: "Communication", path: "/instructor/communication", icon: MessageSquare },
  { name: "Revenue", path: "/instructor/revenue", icon: DollarSign },
  { name: "Setting", path: "/instructor/settings", icon: Settings },
];

export default function InstructorSidebar() {
  const location = useLocation();

  return (
    <div className="w-72 h-screen bg-[#040012] border-r border-white/5 flex flex-col sticky top-0 overflow-hidden">
      {/* Logo Section */}
      <div className="p-8 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#8a2bff] to-[#4310d9] flex items-center justify-center shadow-lg shadow-[#8a2bff]/20">
          <span className="font-black text-xl text-white">AE</span>
        </div>
        <div className="flex flex-col">
            <span className="font-bold text-lg tracking-tight">Learn</span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#8a2bff] font-bold">Guru Circle</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname.startsWith(item.path);
          
          return (
            <Link key={item.path} to={item.path}>
              <motion.div
                whileHover={{ x: 4 }}
                className={`flex items-center justify-between px-4 py-3.5 rounded-2xl transition-all group ${
                  isActive 
                    ? "bg-[#6400ff] text-white shadow-lg shadow-[#6400ff]/20 font-bold" 
                    : "text-white/40 hover:text-white hover:bg-white/5"
                }`}
              >
                <div className="flex items-center gap-4">
                  <Icon size={20} className={isActive ? "text-white" : "group-hover:text-[#8a2bff] transition-colors"} />
                  <span className="text-sm">{item.name}</span>
                </div>
                {isActive && <ChevronRight size={16} />}
              </motion.div>
            </Link>
          );
        })}
      </nav>

      {/* User Profile Footer */}
      <div className="p-6 border-t border-white/5 bg-white/[0.01]">
        <div className="flex items-center gap-4 group cursor-pointer">
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&h=100&fit=crop" 
              className="w-10 h-10 rounded-xl object-cover border-2 border-transparent group-hover:border-[#8a2bff] transition-all" 
              alt="Profile"
            />
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-[#040012] rounded-full" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold truncate">John Doe</p>
            <p className="text-[10px] text-white/40 font-medium truncate uppercase tracking-widest">Verified Guru</p>
          </div>
          <button className="text-white/20 hover:text-white transition-colors">
             <Settings size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
