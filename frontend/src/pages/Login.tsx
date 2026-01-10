import React, { useState } from "react";
import { motion, type Variants } from "framer-motion";
import hero from "/login-pic.png"; // Replace with your actual path
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import "../styles/preloader.scss";

import SocialAuthButtons from "../components/SocialAuthButtons";
import Footer from "../components/Footer";

const loginPanel: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.98 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: "easeOut" } },
};

const loginFields: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const { login, loading } = useAuth();
  const [showSuccess, setShowSuccess] = useState(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(form.email, form.password);
      setShowSuccess(true);
      
      // We need the user object after login to decide where to redirect
      // Since 'login' in AuthContext sets the user, we can trust it's there
      // Wait for the success animation/preloader before navigating
      setTimeout(() => {
        // Redirection logic based on roles
        const cached = localStorage.getItem("ae-auth");
        if (cached) {
          const { user } = JSON.parse(cached);
          if (user.is_staff || user.is_superuser) {
            navigate("/admin/dashboard");
          } else if (user.is_verified_guru) {
            navigate("/instructor/dashboard");
          } else {
            navigate("/");
          }
        } else {
          navigate("/");
        }
      }, 7500);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
    <motion.section initial="hidden" animate="show" variants={loginPanel} className="min-h-[70vh] w-full bg-[#0b0013] flex items-center pt-16 pb-12">
      <div className="w-full grid grid-cols-1 md:grid-cols-2 overflow-hidden shadow-xl">
        {/* LEFT - Form Section */}
        <motion.div variants={loginPanel} className="bg-linear-to-br from-[#150026] to-[#2a0033] p-8 sm:p-10 flex flex-col justify-center min-h-[420px]">
          <motion.div className="max-w-sm w-full mx-auto space-y-6" variants={loginFields}>
            <h2 className="text-white text-2xl font-semibold mb-6">Sign in to your account</h2>

            <motion.form onSubmit={onSubmit} className="space-y-5" variants={loginFields}>
              <motion.div>
                <label className="text-sm text-white/80">Email</label>
                <input
                  name="email"
                  value={form.email}
                  onChange={onChange}
                  type="email"
                  className="mt-1 w-full rounded-md bg-white/5 border border-white/10 px-3 py-2 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Username or Email"
                />
              </motion.div>

              <motion.div>
                <label className="text-sm text-white/80">Password</label>
                <input
                  name="password"
                  value={form.password}
                  onChange={onChange}
                  type="password"
                  className="mt-1 w-full rounded-md bg-white/5 border border-white/10 px-3 py-2 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter Password"
                />
              </motion.div>

              <motion.button
                type="submit"
                disabled={loading}
                className="w-full mt-3 inline-flex items-center justify-center gap-2 rounded-md bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white px-4 py-2 font-semibold shadow-md"
              >
                {loading ? "Signing In..." : "Sign In"}
              </motion.button>

              <div className="flex items-center gap-2 mt-4">
                <div className="h-px bg-white/10 flex-1" />
                <div className="text-xs text-white/60">or continue with</div>
                <div className="h-px bg-white/10 flex-1" />
              </div>

              <SocialAuthButtons compact />
            </motion.form>
          </motion.div>
        </motion.div>

        {/* RIGHT - HERO IMAGE */}
        <motion.div variants={loginPanel} className="relative h-full w-full">
          <img src={hero} alt="login hero" className="w-full h-full object-cover" />
        </motion.div>
      </div>

      {showSuccess && (
        <div id="colorWrapper" className="gemBlue">
          <div className="grid">
            {[...Array(16)].map((_, i) => (
              <div key={i} className="cube">
                <div className="lifter">
                  <div className="cube__face" />
                  <div className="cube__face" />
                  <div className="cube__face" />
                </div>
              </div>
            ))}
          </div>
          <div className="welcome-text">
            <h1 className="username-tag">{form.email.split('@')[0]}#{Math.floor(Math.random() * 9000) + 1000}</h1>
            <h2 className="explorer-greeting">WELCOME EXPLORER</h2>
          </div>
        </div>
      )}
    </motion.section>

      <Footer />
      </>
  );
}