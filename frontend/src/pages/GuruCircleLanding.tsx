import { useState, useEffect } from "react";
import { api } from "../context/AuthContext";
import { motion } from "framer-motion";
import { Users, MessageSquare, Briefcase, GraduationCap, CheckCircle } from "lucide-react";
import GuruButton from "../components/GuruButton";
import GuruCard from "../components/GuruCard";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";


const Criteria = [
  {
    title: "Complete Learning Cohort",
    desc: "Successfully finish the AI learning program and earn your certification",
    icon: <GraduationCap size={32} className="text-[#8a2bff]" />,
  },
  {
    title: "Join Volunteer Project",
    desc: "Participate in at least one community volunteer project",
    icon: <Users size={32} className="text-[#8a2bff]" />,
  },
];

const ExploreItems = [
    { title: "Explore topics", desc: "Explore our selection of courses in development", icon: "📘" },
    { title: "Meet new friends", desc: "Join the network with million of students and learn", icon: "👥" },
    { title: "Learn code", desc: "Learn all about code and become a developer", icon: "💻" },
]

const Avatars = [
    "https://i.pravatar.cc/150?u=1",
    "https://i.pravatar.cc/150?u=2",
    "https://i.pravatar.cc/150?u=3",
    "https://i.pravatar.cc/150?u=4",
    "https://i.pravatar.cc/150?u=5",
    "https://i.pravatar.cc/150?u=6",
    "https://i.pravatar.cc/150?u=7",
    "https://i.pravatar.cc/150?u=8",
    "https://i.pravatar.cc/150?u=9",
]

export default function GuruCircleLanding() {
  const [stats, setStats] = useState({
      active_gurus: "134",
      total_discussions: "1.2K",
      completed_projects: "500",
      job_postings: "180"
  });

  useEffect(() => {
     api.get(`/api/guru/stats/`)
        .then(res => setStats(res.data))
        .catch(err => console.error("Error fetching stats:", err));
  }, []);

  const StatsItems = [
    { label: "Active Gurus", value: stats.active_gurus, icon: <Users size={20} className="text-[#8a2bff]" /> },
    { label: "Total Discussions", value: stats.total_discussions, icon: <MessageSquare size={20} className="text-[#8a2bff]" /> },
    { label: "Completed Projects", value: stats.completed_projects, icon: <CheckCircle size={20} className="text-[#8a2bff]" /> },
    { label: "Job Postings", value: stats.job_postings, icon: <Briefcase size={20} className="text-[#8a2bff]" /> },
  ];

  return (
    <div className="min-h-screen bg-[#050020] text-white pt-32 pb-10 overflow-hidden relative">
      {/* Background Glows */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-[#4310d9]/20 blur-[120px] rounded-full" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-[#8a2bff]/10 blur-[120px] rounded-full" />

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 text-center relative z-10">
        <div className="relative mb-12">
            {/* Concentric Circles */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[500px] md:h-[500px] border border-white/5 rounded-full animate-spin-slow" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] md:w-[700px] md:h-[700px] border border-white/5 rounded-full [animation-direction:reverse] animate-spin-slow" />
            
            {/* Floating Avatars */}
            {Avatars.map((src, idx) => (
                <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.1 }}
                    className="absolute"
                    style={{
                        top: `${45 + 35 * Math.sin(idx * (Math.PI / 4.5))}%`,
                        left: `${45 + 35 * Math.cos(idx * (Math.PI / 4.5))}%`,
                    }}
                >
                    <img src={src} className="w-10 h-10 md:w-14 md:h-14 rounded-full border-2 border-[#8a2bff]/50 p-1 bg-[#050020]" alt="avatar" />
                </motion.div>
            ))}

            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative py-24"
            >
                <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
                    Welcome To The <br />
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#8a2bff] to-[#4310d9]">
                        Guru Circle
                    </span>
                </h1>
                <p className="text-white/60 max-w-2xl mx-auto text-lg mb-10">
                    Dive deep in immersive, interactive groups. Expand horizons, engage in discussions, and elevate your learning journey with us.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link to="/guru-circle/verify">
                        <GuruButton className="w-full sm:w-auto">Get Started</GuruButton>
                    </Link>
                    <Link to="/guru-circle/forum">
                        <GuruButton variant="secondary" className="w-full sm:w-auto">Guest Mode</GuruButton>
                    </Link>
                </div>
            </motion.div>
        </div>

        {/* Features Blocks */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
            {ExploreItems.map((item, idx) => (
                <GuruCard key={idx} className="text-left border border-white/5 hover:border-[#8a2bff]/30 transition-all group">
                    <div className="mb-4 text-2xl">{item.icon}</div>
                    <h3 className="text-xl font-bold mb-2 group-hover:text-[#8a2bff] transition-colors">{item.title}</h3>
                    <p className="text-white/50 text-sm">{item.desc}</p>
                </GuruCard>
            ))}
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-32 py-12 border-y border-white/5">
          {StatsItems.map((stat, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-3xl font-bold">{stat.value}</span>
              </div>
              <span className="text-white/40 text-sm uppercase tracking-wider font-medium">{stat.label}</span>
            </div>
          ))}
        </div>

        {/* Branding Title */}
        <div className="mb-24 text-left">
            <h2 className="text-4xl md:text-5xl font-bold">The <span className="text-[#8a2bff]">Guru Circle</span></h2>
        </div>

        {/* Promo Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-32">
            <div className="aspect-video glass-effect rounded-3xl overflow-hidden flex items-center justify-center p-8">
                <div className="w-full h-full bg-white/5 rounded-2xl flex items-center justify-center text-white/20 text-4xl font-bold">
                    PROMO VIDEO / IMAGE
                </div>
            </div>
            <div className="text-left space-y-6">
                <p className="text-lg text-white/70 leading-relaxed">
                    Guru Circle is an exclusive forum section where members who have advanced in their AI journey (Gurus) can share their knowledge, showcase projects, collaborate on challenges, and discuss advanced AI topics.
                </p>
                <div className="space-y-4">
                    {[
                        { label: "General Discussions", desc: "For deep technical conversations on AI trends, research, and innovations." },
                        { label: "Project Showcase", desc: "A space to present advanced projects for feedback and collaboration." },
                        { label: "Job Opportunities", desc: "A job board where members can post or view career opportunities, freelance gigs, and internships." },
                        { label: "Mentorship Requests", desc: "A thread where Gurus can offer mentorship or request mentoring for specific AI topics." }
                    ].map((item, idx) => (
                        <div key={idx} className="flex gap-3">
                            <CheckCircle size={20} className="text-[#8a2bff] shrink-0 mt-1" />
                            <p className="text-white/60"><span className="text-white font-semibold">{item.label}:</span> {item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>

        {/* Eligibility Criteria */}
        <div className="text-left mb-32">
            <div className="glass-effect rounded-[40px] p-10 md:p-16 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#8a2bff]/20 blur-[80px]" />
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    <div className="lg:col-span-4 flex flex-col items-center justify-center">
                        <div className="relative group">
                            <div className="absolute inset-0 bg-gradient-to-r from-[#8a2bff] to-[#4310d9] rounded-2xl blur-xl opacity-50 group-hover:opacity-100 transition duration-500" />
                            <div className="relative w-48 h-64 bg-slate-800 rounded-2xl overflow-hidden border border-white/10">
                                <img src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=600&fit=crop" className="w-full h-full object-cover" alt="eligibility" />
                            </div>
                        </div>
                    </div>
                    <div className="lg:col-span-8 flex flex-col justify-center">
                        <h3 className="text-3xl font-bold mb-4">Eligibility Criteria</h3>
                        <p className="text-white/50 mb-10">Guru Circle is an exclusive community. To gain full access, members must meet the following requirements:</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
                            {/* Vertical divider */}
                            <div className="hidden md:block absolute left-1/2 top-4 bottom-4 w-px bg-white/10 -translate-x-1/2" />
                            
                            {Criteria.map((item, idx) => (
                                <div key={idx} className="space-y-4">
                                    <h4 className="text-lg font-bold">{item.title}</h4>
                                    <p className="text-white/40 text-sm leading-relaxed">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mb-32 py-20 relative">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Join the Community?</h2>
            <p className="text-white/50 max-w-xl mx-auto mb-10">Start your verification process and gain access to exclusive resources, advanced discussions, and career opportunities.</p>
            <Link to="/guru-circle/verify">
                <GuruButton className="px-10">🚀 Begin Qualification Process</GuruButton>
            </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
