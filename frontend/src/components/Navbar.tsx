import { NavLink, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X, User, LogOut, UserCircle, MessageSquare, LayoutDashboard } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();

  const isGuruPage = location.pathname.startsWith("/guru-circle");
  const isGuest = !user?.is_verified_guru;

  const links = [
    { "label": "Home", "to": "/" },
    { "label": "Learn", "to": "/learning-cohorts"},
    { "label": "Guru Circle", "to": "/guru-circle" },
    { "label": "Volunteer", "to": "/volunteer" },
    { "label": "Projects", "to": "/projects" },
    { "label": "AE News", "to": "/news" },
    { "label": "Exco Team", "to": "/exco-team" },
    { "label": "Research Lab", "to": "/research-lab" },
    { "label": "Testimonials", "to": "/testimonials" }
  ];

  return (
    <>
      <div className={`fixed top-2 sm:top-6 left-1/2 -translate-x-1/2 z-50
        w-[95%] sm:w-[90%] max-w-8xl      
        rounded-[32px] 
        bg-white/7 backdrop-blur-xl 
        border border-white/10
        shadow-[0_0_40px_-10px_rgba(96,60,255,0.45)] 
        transition-all duration-300
        ${isGuruPage ? "py-2" : "py-2 sm:py-3"} flex flex-col`}>
        
        <div className="flex items-center justify-between w-full px-4 sm:px-8">
          <img 
              src="/favicon.png"
              alt="logo" 
              className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 object-contain"
            />
            {/* Desktop nav */}
            <nav className="hidden lg:flex gap-4 xl:gap-6 text-sm xl:text-base text-white/80">
              {links.map(l => (
                <NavLink
                  key={l.label}
                  to={l.to}
                  end={l.to === "/"}
                  className={({ isActive }) =>
                    `hover:text-white transition font-medium relative py-1 ${
                      isActive ? "font-bold text-white after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-[#8a2bff] after:rounded-full" : "text-white/80"
                    }`
                  }
                >
                  {l.label}
                </NavLink>
              ))}
            </nav>

            {/* Desktop buttons */}
            <div className="hidden lg:flex items-center gap-3">
              {isGuruPage && (
                <div className="mr-4 px-3 py-1 rounded-full bg-[#8a2bff]/10 border border-[#8a2bff]/30 text-[10px] font-bold text-[#8a2bff] uppercase tracking-wider">
                  {isGuest ? "GUEST MODE" : "VERIFIED GURU"}
                </div>
              )}
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white/90 border border-white/20 hover:bg-white/15 transition"
                  >
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-linear-to-br from-[#8a2bff] to-[#4310d9]">
                      <User size={18} />
                    </span>
                    {user.first_name}
                  </button>

                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 rounded-xl bg-white/10 backdrop-blur-xl border border-white/15 shadow-lg overflow-hidden">
                      <NavLink
                        to="/profile"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 text-white/80 hover:bg-white/10 hover:text-white transition"
                      >
                        <UserCircle size={18} />
                        Profile
                      </NavLink>
                      <button
                        onClick={() => {
                          setDropdownOpen(false);
                          logout();
                        }}
                        className="w-full flex items-center gap-3 px-4 py-3 text-white/80 hover:bg-white/10 hover:text-white transition"
                      >
                        <LogOut size={18} />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <NavLink
                    to="/register"
                    className="px-4 xl:px-5 py-2 rounded-full bg-white/5 text-white/80 text-sm xl:text-base border border-white/15 hover:bg-white/10 transition"
                  >
                    Sign Up
                  </NavLink>
                  <NavLink
                    to="/login"
                    className="px-4 xl:px-5 py-2 rounded-full bg-linear-to-r from-[#8a2bff] via-[#6c16ff] to-[#4310d9] text-white text-sm xl:text-base font-semibold shadow-[0_10px_30px_rgba(115,67,255,0.45)] hover:opacity-90 transition"
                  >
                    Log In
                  </NavLink>
                </>
              )}
              
              {/* Mobile hamburger toggle inside desktop visibility for layout consistency */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden text-white p-2 hover:bg-white/10 rounded-lg transition"
                aria-label="Toggle menu"
              >
                {isOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
            
            {/* Real Mobile hamburger */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden text-white p-2 hover:bg-white/10 rounded-lg transition"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
        </div>

        {/* Guru Circle Secondary Nav */}
        {isGuruPage && (
          <div className="hidden lg:flex items-center justify-center gap-8 mt-2 py-2 border-t border-white/5">
            <NavLink 
              to="/guru-circle/forum"
              className={({ isActive }) => `flex items-center gap-2 text-sm font-medium transition-colors ${isActive ? "text-[#8a2bff]" : "text-white/40 hover:text-white"}`}
            >
              <MessageSquare size={16} />
              Forum
            </NavLink>
            {!isGuest ? (
              <NavLink 
                to="/instructor/dashboard"
                className={({ isActive }) => `flex items-center gap-2 text-sm font-medium transition-colors ${isActive ? "text-[#8a2bff]" : "text-white/40 hover:text-white"}`}
              >
                <LayoutDashboard size={16} />
                Guru Dashboard
              </NavLink>
            ) : (
              <button className="flex items-center gap-2 text-sm font-medium text-white/20 cursor-not-allowed">
                <LayoutDashboard size={16} />
                Dashboard (Verified Only)
              </button>
            )}
          </div>
        )}
      </div>

      {/* Mobile dropdown with animation */}
      <div 
        className={`fixed top-20 left-1/2 -translate-x-1/2 z-40 w-[90%] max-w-md
          rounded-2xl bg-white/10 backdrop-blur-xl border border-white/10
          shadow-[0_0_40px_-10px_rgba(96,60,255,0.8)] p-6 lg:hidden
          transition-all duration-300 origin-top
          ${isOpen 
            ? 'opacity-100 scale-100 translate-y-0' 
            : 'opacity-0 scale-95 -translate-y-4 pointer-events-none'
          }`}
      >
        {isGuruPage && (
          <div className="mb-4 flex flex-col gap-2 p-3 bg-white/5 rounded-xl border border-white/10">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold text-[#8a2bff] tracking-widest uppercase">Guru Controls</span>
              <span className="text-[10px] font-medium text-white/40 uppercase">{isGuest ? "Guest" : "Verified"}</span>
            </div>
            <div className="flex gap-4">
              <NavLink to="/guru-circle/forum" onClick={() => setIsOpen(false)} className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-white/5 text-xs">
                <MessageSquare size={14} /> Forum
              </NavLink>
              {!isGuest ? (
                <NavLink to="/instructor/dashboard" onClick={() => setIsOpen(false)} className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-white/5 text-xs text-white">
                  <LayoutDashboard size={14} /> Dashboard
                </NavLink>
              ) : (
                <button disabled className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-white/5 text-xs text-white/20">
                  <LayoutDashboard size={14} /> Dashboard
                </button>
              )}
            </div>
          </div>
        )}
        <nav className="flex flex-col gap-3">
          {links.map((l, idx) => (
            <NavLink
              key={l.label}
              to={l.to}
              end={l.to === "/"}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `hover:text-white transition-all font-medium text-sm py-2 px-3 rounded-lg
                hover:bg-white/5 ${
                  isActive ? "font-bold text-white bg-white/10" : "text-white/80"
                }`
              }
              style={{
                transitionDelay: isOpen ? `${idx * 30}ms` : '0ms'
              }}
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-white/10">
          {user ? (
            <button
              onClick={logout}
              className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-white/10 text-white border border-white/15"
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-br from-[#8a2bff] to-[#4310d9]">
                <User size={20} />
              </span>
              Sign out
            </button>
          ) : (
            <>
              <NavLink
                to="/register"
                onClick={() => setIsOpen(false)}
                className="w-full px-5 py-2 rounded-full bg-white/10 text-white/80 border border-white/15 hover:bg-white/20 transition text-center"
              >
                Sign Up
              </NavLink>
              <NavLink
                to="/login"
                onClick={() => setIsOpen(false)}
                className="w-full px-5 py-2 rounded-full bg-linear-to-r from-[#8a2bff] via-[#6c16ff] to-[#4310d9] text-white font-semibold shadow-[0_12px_35px_rgba(115,67,255,0.45)] hover:opacity-90 transition text-center"
              >
                Log In
              </NavLink>
            </>
          )}
        </div>
      </div>
    </>
  );
};
export default Navbar;
