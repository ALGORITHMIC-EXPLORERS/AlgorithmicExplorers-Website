import { useState, useEffect } from "react";
import { api, useAuth } from "../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Plus, Eye, Users, MessageSquare, ExternalLink, CheckCircle, DollarSign } from "lucide-react";
import GuruButton from "../components/GuruButton";
import GuruCard from "../components/GuruCard";
import Footer from "../components/Footer";

type Tab = "General Discussion" | "Project Showcase" | "Job Opportunities" | "Mentorship";
export default function GuruCircleForum() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<Tab>("General Discussion");
  const [searchQuery, setSearchQuery] = useState("");
  const [projects, setProjects] = useState<any[]>([]);
  const [jobs, setJobs] = useState<any[]>([]);
  const [mentorships, setMentorships] = useState<any[]>([]);
  
  const isGuest = !user?.is_verified_guru;

  useEffect(() => {
    const fetchData = async () => {
        try {
            const [projRes, jobRes, mentRes] = await Promise.all([
                api.get(`/api/guru/projects/`),
                api.get(`/api/guru/jobs/`),
                api.get(`/api/guru/mentorships/`)
            ]);
            setProjects(projRes.data);
            setJobs(jobRes.data);
            setMentorships(mentRes.data);
        } catch (err) {
            console.error("Error fetching forum data:", err);
        }
    };
    fetchData();
  }, []);

  const tabs: Tab[] = ["General Discussion", "Project Showcase", "Job Opportunities", "Mentorship"];


  return (
    <div className="min-h-screen bg-[#050020] text-white pt-32 pb-10">
      {/* Hero Box */}
      <div className="max-w-7xl mx-auto px-6 mb-12">
        <div className="glass-effect rounded-[40px] p-8 md:p-14 border border-white/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#8a2bff]/10 blur-[100px]" />
            <h1 className="text-4xl md:text-5xl font-bold mb-6">The Guru Circle Forum</h1>
            <p className="text-white/60 text-lg mb-10">Browse Discussions From Our Community Of Tech Professionals</p>
            
            <div className="flex flex-wrap gap-8">
                <div className="flex items-center gap-3">
                    <Eye size={20} className="text-white/60" />
                    <span className="text-lg font-medium">View-Only Access</span>
                </div>
                <div className="flex items-center gap-3">
                    <Users size={20} className="text-white/60" />
                    <span className="text-lg font-medium">324 Active Gurus</span>
                </div>
            </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-6 mb-8">
        <div className="flex flex-wrap gap-2 md:gap-4 justify-between border-b border-white/5 pb-2">
            <div className="flex flex-wrap gap-2 md:gap-4">
                {tabs.map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-6 py-3 rounded-xl transition-all font-semibold ${
                            activeTab === tab 
                            ? "bg-white/5 border border-[#8a2bff]/50 text-white" 
                            : "text-white/40 hover:text-white"
                        }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>
        </div>
        
        {isGuest && (
            <div className="mt-4 flex items-center gap-2 text-white/40 text-sm italic">
                <Eye size={14} />
                You Are Viewing In Guest Mode, Complete Verification To Post And Access The Dashboard.
            </div>
        )}
      </div>

      {/* Search and Action */}
      <div className="max-w-7xl mx-auto px-6 mb-12 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-1 max-w-md">
            <div className="relative flex-1">
                <input 
                    type="text" 
                    placeholder={`Search ${activeTab}...`}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-3 outline-none focus:border-[#8a2bff]/50 placeholder:text-white/20"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                />
            </div>
            <button className="p-3 rounded-xl bg-white/5 border border-white/10 text-white/60 hover:text-white">
                <Search size={20} />
            </button>
          </div>
          <button disabled={isGuest} className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-white/40 disabled:cursor-not-allowed">
            <Plus size={20} />
            New Post
          </button>
      </div>

      {/* Content Area */}
      <div className="max-w-7xl mx-auto px-6 min-h-[500px]">
        <AnimatePresence mode="wait">
            <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
            >
                {activeTab === "Project Showcase" && (
                    <>
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-2xl font-bold">Featured Projects</h2>
                            <span className="text-white/40">{projects.length} Projects</span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {projects.map((p: any, idx: number) => (
                                <GuruCard key={idx} className="p-0 overflow-hidden border border-white/5 group">
                                    <div className="aspect-video relative overflow-hidden">
                                        <img src={p.image_url || "https://images.unsplash.com/photo-1576086213369-97a306d36557?w=400&h=300&fit=crop"} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={p.title} />
                                        <div className="absolute inset-0 bg-linear-to-t from-[#050020] to-transparent opacity-60" />
                                    </div>
                                    <div className="p-6">
                                        <div className="flex items-center gap-3 mb-4">
                                            <img src={p.author?.avatar || `https://i.pravatar.cc/150?u=${p.author?.email}`} className="w-10 h-10 rounded-full border border-[#8a2bff]/50" alt={p.author?.first_name} />
                                            <div>
                                                <h4 className="font-bold text-sm">{p.title}</h4>
                                                <p className="text-white/40 text-xs">{p.author?.first_name} {p.author?.last_name}</p>
                                            </div>
                                        </div>
                                        <p className="text-white/60 text-sm mb-6 line-clamp-2">{p.description}</p>
                                        <div className="flex flex-wrap gap-2 mb-6">
                                            {(p.tags || []).map((tag: string) => (
                                                <span key={tag} className="text-[10px] uppercase font-bold px-3 py-1 bg-[#8a2bff]/20 text-[#8a2bff] rounded-md tracking-wider">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                        <div className="flex items-center justify-between pt-4 border-t border-white/5 text-xs text-white/40">
                                            <div className="flex items-center gap-4">
                                                <span className="flex items-center gap-1"><Users size={14} /> {p.likes_count} Likes</span>
                                                <span className="flex items-center gap-1"><ExternalLink size={14} /> {p.contributions_count} Contributions</span>
                                            </div>
                                        </div>
                                    </div>
                                </GuruCard>
                            ))}
                        </div>
                    </>
                )}

                {activeTab === "Job Opportunities" && (
                     <>
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-2xl font-bold">Latest Opportunities</h2>
                            <span className="text-white/40">{jobs.length} Open Positions</span>
                        </div>
                        <div className="space-y-6">
                            {jobs.map((j: any, idx: number) => (
                                <GuruCard key={idx} className="p-8 border border-white/5">
                                    <div className="flex flex-col lg:flex-row gap-8">
                                        <div className="lg:w-16 h-16 bg-white/5 rounded-xl flex items-center justify-center border border-white/10 shrink-0">
                                            <img src={j.logo_url || `https://i.pravatar.cc/150?u=${j.company}`} className="w-10 h-10 rounded-lg" alt={j.company} />
                                        </div>
                                        <div className="flex-1 space-y-6">
                                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                                <div>
                                                    <h3 className="text-xl font-bold uppercase tracking-wider">{j.company}</h3>
                                                    <p className="text-[#8a2bff] font-medium">{j.role}</p>
                                                </div>
                                            </div>
                                            
                                            <div className="space-y-4">
                                                <h4 className="text-sm font-bold text-white/80">Project Overview</h4>
                                                <p className="text-white/50 text-sm leading-relaxed max-w-3xl">{j.description}</p>
                                            </div>

                                            <div className="space-y-4">
                                                <h4 className="text-sm font-bold text-white/80">Skills</h4>
                                                <div className="flex flex-wrap gap-3">
                                                    {(j.skills || []).map((skill: string) => (
                                                        <span key={skill} className="px-4 py-1 bg-white/5 border border-white/10 rounded-md text-xs font-medium">{skill}</span>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="flex flex-wrap items-center gap-x-12 gap-y-6 pt-6 border-t border-white/5">
                                                <div className="space-y-1">
                                                    <span className="text-xs text-white/40">Detail Project</span>
                                                    <p className="text-sm font-bold">{j.review_score}</p>
                                                    <p className="text-xs text-yellow-500">★★★★★</p>
                                                </div>
                                                <div className="space-y-1">
                                                    <span className="text-xs text-white/40">Success Project</span>
                                                    <p className="text-sm font-bold flex items-center gap-1">
                                                        <CheckCircle size={14} className="text-blue-400" />
                                                        Project Verified
                                                    </p>
                                                </div>
                                                <div className="space-y-1">
                                                    <span className="text-xs text-white/40">Total Spent</span>
                                                    <p className="text-sm font-bold flex items-center gap-1">
                                                        <DollarSign size={14} className="text-blue-400" />
                                                        {j.total_spent}
                                                    </p>
                                                </div>

                                                <div className="flex-1 flex flex-col md:flex-row items-center justify-end gap-4 mt-4 lg:mt-0">
                                                    <div className="flex-1 max-w-xs w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 flex items-center justify-between text-xs text-white/40">
                                                        <span className="truncate">{j.link}</span>
                                                        <ExternalLink size={14} />
                                                    </div>
                                                    <GuruButton className="w-full md:w-auto px-10">Apply Now</GuruButton>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </GuruCard>
                            ))}
                        </div>
                     </>
                )}

                {activeTab === "Mentorship" && (
                    <>
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-2xl font-bold">Mentorship Opportunities</h2>
                            <span className="text-white/40">{mentorships.length} Requests</span>
                        </div>
                        <div className="space-y-6">
                            {mentorships.map((m: any, idx: number) => (
                                <GuruCard key={idx} className="p-8 border border-white/5">
                                    <div className="flex flex-col md:flex-row gap-6">
                                        <img src={m.author?.avatar || `https://i.pravatar.cc/150?u=${m.author?.email}`} className="w-14 h-14 rounded-full border border-[#8a2bff]/50" alt={m.author?.first_name} />
                                        <div className="flex-1">
                                            <div className="flex items-center justify-between mb-4">
                                                <div>
                                                    <h3 className="font-bold text-lg">{m.author?.first_name} {m.author?.last_name}</h3>
                                                    <p className="text-white/40 text-sm">{new Date(m.created_at).toLocaleDateString()}</p>
                                                </div>
                                                <span className={`px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border ${
                                                    m.type === "Offering" 
                                                    ? "bg-[#8a2bff]/10 border-[#8a2bff]/50 text-[#8a2bff]" 
                                                    : "bg-white/5 border-white/20 text-white/60"
                                                }`}>
                                                    {m.type}
                                                </span>
                                            </div>
                                            <div className="mb-6">
                                                <h4 className="text-white/80 font-bold mb-2">Topic: <span className="text-white">{m.topic}</span></h4>
                                                <p className="text-white/50 text-sm leading-relaxed max-w-4xl">{m.description}</p>
                                            </div>
                                            <GuruButton variant={m.type === "Offering" ? "primary" : "secondary"} className="px-8">
                                                {m.type === "Offering" ? "Request Mentorship" : "Offer Help"}
                                            </GuruButton>
                                        </div>
                                    </div>
                                </GuruCard>
                            ))}
                        </div>
                    </>
                )}

                {activeTab === "General Discussion" && (
                    <div className="flex flex-col items-center justify-center py-32 text-center">
                        <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6 border border-white/10">
                            <MessageSquare size={40} className="text-white/20" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">No Discussions Yet</h3>
                        <p className="text-white/40 max-w-sm">Be the first to start a technical conversation in the Guru Circle.</p>
                        {!isGuest && (
                            <GuruButton className="mt-8 px-10">Start A Discussion</GuruButton>
                        )}
                    </div>
                )}
            </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-20">
        <Footer />
      </div>
    </div>
  );
}
