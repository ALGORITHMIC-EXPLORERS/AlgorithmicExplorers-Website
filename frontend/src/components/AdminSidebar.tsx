import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Users, BookOpen, GraduationCap, Settings, ChevronRight, LogOut } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";

const adminMenuItems = [
  { name: "System Overview", path: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Manage Cohorts", path: "/admin/cohorts", icon: GraduationCap },
  { name: "User Directory", path: "/admin/users", icon: Users },
  { name: "Content Review", path: "/admin/courses", icon: BookOpen },
  { name: "Site Settings", path: "/admin/settings", icon: Settings },
];

export default function AdminSidebar() {
  const location = useLocation();
  const { logout, user } = useAuth();

  return (
    <div className="w-72 h-screen bg-[#02000a] border-r border-white/5 flex flex-col sticky top-0 overflow-hidden">
      {/* Logo Section */}
      <div className="p-8 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#ff2b2b] to-[#8a0000] flex items-center justify-center shadow-lg shadow-[#ff2b2b]/20">
          <span className="font-black text-xl text-white">AE</span>
        </div>
        <div className="flex flex-col">
            <span className="font-bold text-lg tracking-tight">Admin</span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#ff2b2b] font-bold">Control Center</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {adminMenuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname.startsWith(item.path);
          
          return (
            <Link key={item.path} to={item.path}>
              <motion.div
                whileHover={{ x: 4 }}
                className={`flex items-center justify-between px-4 py-3.5 rounded-2xl transition-all group ${
                  isActive 
                    ? "bg-[#ff2b2b] text-white shadow-lg shadow-[#ff2b2b]/20 font-bold" 
                    : "text-white/40 hover:text-white hover:bg-white/5"
                }`}
              >
                <div className="flex items-center gap-4">
                  <Icon size={20} className={isActive ? "text-white" : "group-hover:text-[#ff2b2b] transition-colors"} />
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
             <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white/40 font-bold border-2 border-transparent group-hover:border-[#ff2b2b] transition-all">
                {user?.first_name?.charAt(0) || 'A'}
             </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-red-500 border-2 border-[#02000a] rounded-full" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold truncate text-white">{user?.first_name} {user?.last_name}</p>
            <p className="text-[10px] text-white/40 font-medium truncate uppercase tracking-widest">System Admin</p>
          </div>
          <button onClick={logout} className="text-white/20 hover:text-white transition-colors">
             <LogOut size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
