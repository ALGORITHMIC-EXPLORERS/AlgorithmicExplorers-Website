import { useState } from "react";
import { motion, type Variants } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Footer from '../components/Footer'
import hero from "../assets/register-pic.png";

const panelVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function Register() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();
  const { register, loading } = useAuth();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await register({
      first_name: form.firstName,
      last_name: form.lastName,
      username: form.username,
      email: form.email,
      password: form.password,
      confirm_password: form.confirmPassword,
    });
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-[#040012] flex flex-col pt-20">
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Left Side: Image */}
        <div className="hidden md:block md:w-[45%] relative overflow-hidden">
          <img 
            src={hero} 
            alt="Study" 
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>

        {/* Right Side: Form */}
        <div className="flex-1 flex items-center justify-center p-6 md:p-12 lg:p-20 bg-[#06001a]">
          <motion.div 
            variants={panelVariants}
            initial="hidden"
            animate="show"
            className="w-full max-w-xl"
          >
            <h2 className="text-white text-3xl font-bold text-center mb-10">Create Your Account</h2>
            
            <form onSubmit={onSubmit} className="space-y-6">
              {/* Full Name Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2 text-left">
                  <label className="text-sm font-medium text-white/80 ml-1">Full Name</label>
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={form.firstName}
                    onChange={onChange}
                    className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/20 focus:outline-none focus:border-[#8a2bff]/50 focus:ring-1 focus:ring-[#8a2bff]/50 transition-all"
                    required
                  />
                </div>
                <div className="space-y-2 text-left flex flex-col justify-end">
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={form.lastName}
                    onChange={onChange}
                    className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/20 focus:outline-none focus:border-[#8a2bff]/50 focus:ring-1 focus:ring-[#8a2bff]/50 transition-all"
                    required
                  />
                </div>
              </div>

              {/* Username */}
              <div className="space-y-2 text-left">
                <label className="text-sm font-medium text-white/80 ml-1">Username</label>
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={form.username}
                  onChange={onChange}
                  className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/20 focus:outline-none focus:border-[#8a2bff]/50 focus:ring-1 focus:ring-[#8a2bff]/50 transition-all"
                  required
                />
              </div>

              {/* Email */}
              <div className="space-y-2 text-left">
                <label className="text-sm font-medium text-white/80 ml-1">Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Email ID"
                  value={form.email}
                  onChange={onChange}
                  className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/20 focus:outline-none focus:border-[#8a2bff]/50 focus:ring-1 focus:ring-[#8a2bff]/50 transition-all"
                  required
                />
              </div>

              {/* Passwords Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2 text-left">
                  <label className="text-sm font-medium text-white/80 ml-1">Password</label>
                  <input
                    type="password"
                    name="password"
                    placeholder="Enter Password"
                    value={form.password}
                    onChange={onChange}
                    className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/20 focus:outline-none focus:border-[#8a2bff]/50 focus:ring-1 focus:ring-[#8a2bff]/50 transition-all"
                    required
                  />
                </div>
                <div className="space-y-2 text-left">
                  <label className="text-sm font-medium text-white/80 ml-1">Confirm Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={form.confirmPassword}
                    onChange={onChange}
                    className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/20 focus:outline-none focus:border-[#8a2bff]/50 focus:ring-1 focus:ring-[#8a2bff]/50 transition-all"
                    required
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full mt-4 flex items-center justify-center gap-3 bg-[#6400ff] hover:bg-[#5200d6] text-white font-semibold py-4 rounded-xl transition-all shadow-[0_10px_30px_-10px_rgba(100,0,255,0.5)] disabled:opacity-70 group"
              >
                {loading ? "Creating Account..." : (
                  <>
                    Create Account
                    <motion.span
                      animate={{ x: [0, 5, 0] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                    >
                      →
                    </motion.span>
                  </>
                )}
              </button>

              {/* Social Dividers */}
              <div className="relative flex items-center py-4">
                <div className="flex-grow border-t border-white/10"></div>
                <span className="flex-shrink mx-4 text-xs text-white/40 font-medium">Sign up with</span>
                <div className="flex-grow border-t border-white/10"></div>
              </div>

              {/* Social Buttons */}
              <div className="grid grid-cols-3 gap-4">
                <button type="button" className="flex items-center justify-center gap-2 py-3 bg-white hover:bg-white/90 rounded-lg transition-colors overflow-hidden px-2">
                  <img src="https://www.facebook.com/favicon.ico" alt="FB" className="w-4 h-4" />
                  <span className="text-[13px] font-semibold text-[#1877F2] hidden sm:inline">Facebook</span>
                </button>
                <button type="button" className="flex items-center justify-center gap-2 py-3 bg-white hover:bg-white/90 rounded-lg transition-colors overflow-hidden px-2">
                  <img src="https://www.google.com/favicon.ico" alt="G" className="w-4 h-4" />
                  <span className="text-[13px] font-semibold text-[#4285F4] hidden sm:inline">Google</span>
                </button>
                <button type="button" className="flex items-center justify-center gap-2 py-3 bg-white hover:bg-white/90 rounded-lg transition-colors overflow-hidden px-2">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg" alt="MS" className="w-4 h-4" />
                  <span className="text-[13px] font-semibold text-[#5E5E5E] hidden sm:inline">Microsoft</span>
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

