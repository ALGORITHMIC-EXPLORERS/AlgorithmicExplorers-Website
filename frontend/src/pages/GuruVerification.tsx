import { useState } from "react";
import { api, useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle, Info } from "lucide-react";
import GuruButton from "../components/GuruButton";
import Footer from "../components/Footer";

export default function GuruVerification() {
  const navigate = useNavigate();
  const [agreed, setAgreed] = useState(false);
  const [form, setForm] = useState({
    cohortId: "",
    projectName: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { updateUser } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) return;
    setLoading(true);
    setError("");
    try {
      const { data } = await api.post(`/api/guru/verify-guru/`, form);
      updateUser(data.user);
      navigate("/guru-circle/forum");
    } catch (err: any) {
      setError(err.response?.data?.error || "Verification failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050020] text-white pt-24 pb-10 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/4 -right-20 w-[600px] h-[600px] bg-[#4310d9]/10 blur-[150px] rounded-full" />
      <div className="absolute bottom-1/4 -left-20 w-[500px] h-[500px] bg-[#8a2bff]/10 blur-[150px] rounded-full" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-16">
          <div className="text-center w-full">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">Guru Verification Process</h1>
            <p className="text-white/50 text-sm md:text-base">Complete The Verification To Access The Guru Circle Community</p>
          </div>
          <Link to="/guru-circle" className="absolute left-6 top-2 p-2 hover:bg-white/10 rounded-full transition-colors">
            <ArrowLeft size={24} />
          </Link>
          <div className="absolute right-6 top-2">
             <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center">
                <div className="w-4 h-4 border-2 border-white/60 rounded-full relative">
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-[#8a2bff] rounded-full animate-ping" />
                </div>
             </div>
          </div>
        </div>

        {/* Verification Form */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-effect rounded-[40px] p-8 md:p-12 mb-10 border border-white/5"
        >
          <form onSubmit={handleSubmit} className="space-y-10">
            {error && (
              <div className="p-4 bg-red-500/20 border border-red-500/50 rounded-2xl text-red-200 text-sm">
                {error}
              </div>
            )}
            <div>
              <h2 className="text-sm md:text-base font-bold uppercase tracking-widest text-white/80 mb-8">Qualification Requirement</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold mb-3">Learning Cohort Certification ID</label>
                  <input 
                    type="text" 
                    placeholder="e.g., CERT-2024-AE-001"
                    className="w-full bg-[#0a0230]/50 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-[#8a2bff]/50 transition-colors"
                    value={form.cohortId}
                    onChange={e => setForm({ ...form, cohortId: e.target.value })}
                    required
                  />
                  <p className="text-white/40 text-xs mt-3">Enter The Certification ID Received Upon Completing Your AE Learning Cohort</p>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-3">Volunteer Project Name</label>
                  <input 
                    type="text" 
                    placeholder="e.g., AI For Healthcare Initiative"
                    className="w-full bg-[#0a0230]/50 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-[#8a2bff]/50 transition-colors"
                    value={form.projectName}
                    onChange={e => setForm({ ...form, projectName: e.target.value })}
                    required
                  />
                  <p className="text-white/40 text-xs mt-3">Name Of The Volunteer Project You Participated In</p>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <div 
                onClick={() => setAgreed(!agreed)}
                className={`w-5 h-5 rounded-full border mt-1 shrink-0 cursor-pointer flex items-center justify-center transition-colors ${agreed ? "bg-[#8a2bff] border-[#8a2bff]" : "border-white/20"}`}
              >
                {agreed && <CheckCircle size={14} className="text-white" />}
              </div>
              <div>
                <h3 className="text-sm md:text-base font-bold mb-2">I Agree To The Guru Circle Community Guidelines</h3>
                <p className="text-white/40 text-xs md:text-sm leading-relaxed">By Checking This Box, You Agree To Maintain Professional Conduct, Respect Intellectual Property, And Contribute Positively To The Community.</p>
              </div>
            </div>

            <div className="flex flex-col items-center gap-6 pt-4">
              <GuruButton type="submit" disabled={!agreed || loading} className="w-full max-w-sm">
                {loading ? "Verifying..." : "Verify & Join As A Guru"}
              </GuruButton>
              <Link to="/guru-circle/forum" className="text-[#8a2bff] text-sm md:text-base hover:underline font-medium">
                Continue In Guest Mode (View Only)
              </Link>
            </div>
          </form>
        </motion.div>

        {/* Demo Credentials */}
        <div className="glass-effect rounded-3xl p-8 border border-white/5">
            <div className="flex items-start gap-4 mb-4">
                <Info size={20} className="text-[#8a2bff] mt-1" />
                <h3 className="text-lg font-bold">Demo Credentials</h3>
            </div>
            <div className="space-y-6 text-sm text-white/60">
                <div>
                    <h4 className="text-white font-semibold mb-2">For Verified Guru Access:</h4>
                    <ul className="list-disc list-inside space-y-1">
                        <li>Certification ID: CERT-2024-AE-001</li>
                        <li>Project: Any Project Name</li>
                    </ul>
                </div>
                <div>
                    <h4 className="text-white font-semibold mb-2">For Regular User Access:</h4>
                    <p>Use Any Other Certification Format And Project Name.</p>
                </div>
            </div>
        </div>
      </div>

      <div className="mt-20">
        <Footer />
      </div>
    </div>
  );
}
