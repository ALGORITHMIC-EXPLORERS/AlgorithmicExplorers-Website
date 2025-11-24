import { NavLink } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { "label": "Home", "to": "/" },
    { "label": "Learn", "to": "/learn" },
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
      <div className="fixed top-2 sm:top-6 left-1/2 -translate-x-1/2 z-50
        w-[95%] sm:w-[90%] max-w-8xl      
        rounded-full 
        bg-white/7 backdrop-blur-xl 
        border border-white/10
        shadow-[0_0_40px_-10px_rgba(96,60,255,0.8)] 
        px-4 sm:px-6 py-2 sm:py-3 flex items-center justify-between">

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
                `hover:text-white transition font-medium ${
                  isActive ? "font-bold text-white" : "text-white/80"
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        {/* Desktop buttons */}
        <div className="hidden lg:flex gap-2 xl:gap-3">
          <button className="px-4 xl:px-5 py-2 rounded-full bg-white/10 text-white/80 text-sm xl:text-base border border-white/20 hover:bg-white/20 transition">
            Sign Up
          </button>
          <button className="px-4 xl:px-5 py-2 rounded-full 
            bg-linear-to-r from-[#7928FF] to-[#4C00FF]
            text-white text-sm xl:text-base font-semibold shadow-lg hover:opacity-90 transition">
            Log In
          </button>
        </div>

        {/* Mobile hamburger with icon */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden text-white p-2 hover:bg-white/10 rounded-lg transition"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
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
          <button className="w-full px-5 py-2 rounded-full bg-white/10 text-white/80 border border-white/20 hover:bg-white/20 transition">
            Sign Up
          </button>
          <button className="w-full px-5 py-2 rounded-full 
            bg-linear-to-r from-[#7928FF] to-[#4C00FF]
            text-white font-semibold shadow-lg hover:opacity-90 transition">
            Log In
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
