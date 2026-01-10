import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { api } from "../context/AuthContext";
import InstructorLayout from "../components/InstructorLayout";
import GlassCard from "../components/GlassCard";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowUpRight, ChevronLeft, ChevronRight, Search, Filter, 
  Layout, Plus, FileText, Video as VideoIcon, 
  PlusCircle
} from "lucide-react";

// Reuse the SimpleLineChart from previous plan or implementation
const SimpleLineChart = ({ data, color, filled = true }: { data: number[], color: string, filled?: boolean }) => {
    const max = Math.max(...data, 1);
    const width = 1000;
    const height = 150;
    const points = data.length > 1 
        ? data.map((d, i) => `${(i / (data.length - 1)) * width},${height - (d / max) * height}`).join(" ")
        : `0,${height} ${width},${height}`;
    
    return (
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full overflow-visible">
            <defs>
                <linearGradient id={`grad-${color.replace('#','')}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={color} stopOpacity="0.3" />
                    <stop offset="100%" stopColor={color} stopOpacity="0" />
                </linearGradient>
            </defs>
            {filled && <path d={`M 0,${height} ${points} V${height} Z`} fill={`url(#grad-${color.replace('#','')})`} />}
            <polyline 
                fill="none" 
                stroke={color} 
                strokeWidth="2.5" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                points={points} 
            />
        </svg>
    );
};

const tabs = ["Commission", "Reviews", "Customer", "Chapters", "Promotion", "Detail", "Settings"];

export default function CourseManagement() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("Chapters");
  const [course, setCourse] = useState<any>(null);
  const [chapters, setChapters] = useState<any[]>([]);
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [courseRes, chaptersRes, statsRes] = await Promise.all([
          api.get(`/api/courses/courses/${id}/`),
          api.get(`/api/courses/course-chapters/?course=${id}`),
          api.get(`/api/finance/instructor-stats/`) // For general stats
        ]);
        setCourse(courseRes.data);
        setChapters(chaptersRes.data);
        setStats(statsRes.data);
      } catch (err) {
        console.error("Failed to fetch course data", err);
      }
    };
    fetchData();
  }, [id]);

  const chartData = stats?.chart_data || [];

  return (
    <InstructorLayout title={course?.title || "Course Management"}>
      <div className="space-y-10 pb-20">
        
        {/* Navigation Tabs */}
        <div className="flex border-b border-white/5 overflow-x-auto no-scrollbar scroll-smooth">
           {tabs.map(tab => (
             <button 
                key={tab} 
                onClick={() => setActiveTab(tab)}
                className={`px-6 pb-4 text-xs font-bold transition-all relative whitespace-nowrap ${
                    activeTab === tab ? "text-[#8a2bff]" : "text-white/30 hover:text-white/50"
                }`}
             >
                {tab}
                {activeTab === tab && (
                    <motion.div layoutId="courseTab" className="absolute bottom-[-1px] left-0 right-0 h-1 bg-[#8a2bff] rounded-full" />
                )}
             </button>
           ))}
        </div>

        <AnimatePresence mode="wait">
          {activeTab === "Commission" && (
            <motion.div key="commission" className="space-y-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                        { label: "Life Time Courses Commission", value: "$1K", color: "#00d084" },
                        { label: "Life Time Received Commission", value: "$800.0", color: "#00d084" },
                        { label: "Life Time Pending Commission", value: "$200.0", color: "#00d084" },
                    ].map((stat, i) => (
                        <GlassCard key={i} className="p-6 border-white/5 bg-white/[0.01]">
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-10">
                                    <SimpleLineChart data={[10, 15, 12, 20, 18, 25]} color={stat.color} filled={false} />
                                </div>
                                <div>
                                    <div className="text-2xl font-bold">{stat.value}</div>
                                    <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest">{stat.label}</p>
                                </div>
                            </div>
                        </GlassCard>
                    ))}
                </div>
                <GlassCard className="p-0 border-white/5 overflow-hidden">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-white/5 text-[10px] text-white/30 font-bold uppercase tracking-widest">
                                <th className="px-8 py-6">Order ID</th>
                                <th className="px-8 py-6">Customer</th>
                                <th className="px-8 py-6">Type</th>
                                <th className="px-8 py-6">Date</th>
                                <th className="px-8 py-6">Status</th>
                                <th className="px-8 py-6 text-right">Commission</th>
                            </tr>
                        </thead>
                        <tbody className="text-xs font-medium text-white/70">
                            {[...Array(10)].map((_, i) => (
                                <tr key={i} className="border-b border-white/[0.02] hover:bg-white/[0.01] transition-all">
                                    <td className="px-8 py-6">#254841</td>
                                    <td className="px-8 py-6 font-bold text-white">Dianne Russell</td>
                                    <td className="px-8 py-6">Student</td>
                                    <td className="px-8 py-6 text-white/40">25 Jan 2022</td>
                                    <td className="px-8 py-6">
                                        <span className={i % 3 === 0 ? "text-orange-400" : "text-green-400"}>
                                            {i % 3 === 0 ? "Pending" : "Received"}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6 text-right font-bold text-white">95.00</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </GlassCard>
            </motion.div>
          )}

          {activeTab === "Chapters" && (
            <motion.div key="chapters" className="space-y-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <GlassCard className="p-0 border-white/5 overflow-hidden">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-white/5 text-[10px] text-white/30 font-bold uppercase tracking-widest">
                                <th className="px-8 py-6">ID</th>
                                <th className="px-8 py-6">Chapter</th>
                                <th className="px-8 py-6">Title</th>
                                <th className="px-8 py-6">Type</th>
                                <th className="px-8 py-6 text-center">Date</th>
                                <th className="px-8 py-6">Status</th>
                                <th className="px-8 py-6 text-right">Price</th>
                            </tr>
                        </thead>
                        <tbody className="text-xs font-medium text-white/70">
                            {chapters.map((row) => (
                                <tr key={row.id} className="border-b border-white/[0.02] hover:bg-white/[0.01] transition-all group">
                                    <td className="px-8 py-6 text-white/40 font-bold">{row.id}</td>
                                    <td className="px-8 py-6 font-bold text-white">{row.order}</td>
                                    <td className="px-8 py-6 font-bold text-white max-w-[300px] truncate">{row.title}</td>
                                    <td className="px-8 py-6 uppercase tracking-widest text-[10px] font-black text-[#8a2bff]">
                                        <div className="flex items-center gap-2">
                                            {row.content_type === 'PDF' && <FileText size={14} />}
                                            {row.content_type === 'Video' && <VideoIcon size={14} />}
                                            {row.content_type === 'PPT' && <Layout size={14} />}
                                            {row.content_type}
                                        </div>
                                    </td>
                                    <td className="px-8 py-6 text-center text-white/40">{new Date(row.created_at).toLocaleDateString()}</td>
                                    <td className="px-8 py-6">
                                        <span className={"text-white/60 font-bold"}>
                                            Publish
                                        </span>
                                    </td>
                                    <td className="px-8 py-6 text-right font-bold text-white">{row.is_free ? "Free" : `$${course?.price}`}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </GlassCard>
            </motion.div>
          )}

          {activeTab === "Promotion" && (
            <motion.div key="promotion" className="space-y-10" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-bold">Coupons</h2>
                    <button className="px-6 py-2.5 bg-[#437ef7] text-white rounded-xl text-xs font-bold hover:bg-[#346bd4] transition-all flex items-center gap-2">
                        <Plus size={16} /> Create New Coupon
                    </button>
                </div>

                <GlassCard className="p-8 border-white/5 bg-white/[0.01]">
                    <div className="flex justify-between items-center mb-8">
                        <div className="flex gap-4">
                            <select className="bg-transparent text-[10px] text-white/40 font-bold border border-white/10 rounded-lg px-2 py-1 outline-none">
                                <option className="bg-[#040012]">1 Jan, 2021 - 30 Dec, 2021</option>
                            </select>
                            <select className="bg-transparent text-[10px] text-white/40 font-bold border border-white/10 rounded-lg px-2 py-1 outline-none">
                                <option className="bg-[#040012]">Daily</option>
                            </select>
                        </div>
                        <div className="flex gap-6">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-[#437ef7]" />
                                <span className="text-[10px] text-white/40 font-bold uppercase tracking-widest">Chosen Period</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-[#00d084]" />
                                <span className="text-[10px] text-white/40 font-bold uppercase tracking-widest">Last Period</span>
                            </div>
                        </div>
                    </div>
                    <div className="h-[300px] w-full relative">
                        <SimpleLineChart data={chartData.map((d: any) => d.revenue)} color="#437ef7" />
                        <div className="absolute inset-0 opacity-40">
                             <SimpleLineChart data={chartData.map((d: any) => d.prev)} color="#00d084" filled={false} />
                        </div>
                    </div>
                </GlassCard>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                        { label: "Total Redeemed", value: "$200.00", change: "8%" },
                        { label: "Total Coupons", value: "551", change: "8%" },
                        { label: "Redeemed Amount", value: "$8,723", change: "8%" },
                    ].map((card, i) => (
                        <GlassCard key={i} className="p-6 border-white/5 bg-white/[0.01] flex justify-between items-start">
                            <div className="space-y-1">
                                <h4 className="text-2xl font-bold tracking-tight">{card.value}</h4>
                                <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest">{card.label}</p>
                            </div>
                            <div className="px-2 py-1 bg-green-500/10 text-green-500 rounded-lg text-[10px] font-bold flex items-center gap-1">
                                <ArrowUpRight size={10} /> {card.change}
                            </div>
                        </GlassCard>
                    ))}
                </div>

                <div className="space-y-6">
                    <div className="flex justify-between items-center">
                        <div className="relative w-80">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={16} />
                            <input className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-xs" placeholder="Search User" />
                        </div>
                        <div className="flex items-center gap-6">
                            <button className="text-[10px] font-bold text-white/40 uppercase tracking-widest hover:text-white">Hide Stats</button>
                            <button className="text-[10px] font-bold text-white/60 uppercase tracking-widest flex items-center gap-2 hover:text-[#8a2bff]">Filter <Filter size={14}/></button>
                        </div>
                    </div>
                    <GlassCard className="p-0 border-white/5 overflow-hidden">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-white/5 text-[10px] text-white/30 font-bold uppercase tracking-widest">
                                    <th className="px-8 py-6">Offer Name</th>
                                    <th className="px-8 py-6">Code</th>
                                    <th className="px-8 py-6">Amount</th>
                                    <th className="px-8 py-6 text-center">Status</th>
                                    <th className="px-8 py-6 text-center">Qty</th>
                                    <th className="px-8 py-6 text-right">Redemptions</th>
                                </tr>
                            </thead>
                            <tbody className="text-xs font-medium text-white/70">
                                {[
                                    { name: "New Offer", code: "BOGO22", amount: "$21", status: "Expired", qty: 3000, redem: 2213 },
                                    { name: "Summer Sale", code: "BFA", amount: "$25", status: "Active", qty: 2000, redem: 1007 },
                                ].map((row, i) => (
                                    <tr key={i} className="border-b border-white/[0.02] hover:bg-white/[0.01]">
                                        <td className="px-8 py-6 font-bold text-white">{row.name}</td>
                                        <td className="px-8 py-6 font-bold text-white/40">{row.code}</td>
                                        <td className="px-8 py-6 font-bold text-white">{row.amount}</td>
                                        <td className="px-8 py-6 text-center">
                                            <span className={row.status === 'Expired' ? 'text-rose-500' : 'text-green-500'}>{row.status}</span>
                                        </td>
                                        <td className="px-8 py-6 text-center">{row.qty}</td>
                                        <td className="px-8 py-6 text-right font-bold text-white">{row.redem}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </GlassCard>
                </div>
            </motion.div>
          )}

          {activeTab === "Detail" && (
            <motion.div key="detail" className="space-y-10" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-bold">Details</h2>
                    <div className="flex gap-4">
                        <button className="px-6 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs font-bold hover:bg-white/10 transition-all">Draft</button>
                        <button className="px-6 py-2.5 bg-[#00d084] text-white rounded-xl text-xs font-bold hover:bg-[#00b070] transition-all">Save</button>
                        <button className="px-6 py-2.5 bg-[#437ef7] text-white rounded-xl text-xs font-bold hover:bg-[#346bd4] transition-all">Publish</button>
                    </div>
                </div>

                <div className="flex flex-col xl:flex-row gap-10">
                    <div className="flex-1 space-y-10">
                        <section className="space-y-4">
                            <h3 className="text-sm font-bold uppercase tracking-widest text-[#8a2bff]">Course Details</h3>
                            <div className="space-y-6">
                                <div className="bg-white/[0.01] border border-white/5 rounded-2xl p-6">
                                    <label className="text-[10px] text-white/30 font-bold uppercase tracking-widest block mb-2">Course Name</label>
                                    <input className="w-full bg-transparent text-sm font-bold outline-none" defaultValue={course?.title} />
                                </div>
                                <div className="space-y-4">
                                     <label className="text-[10px] text-white/30 font-bold uppercase tracking-widest px-2">Upload Intro Video</label>
                                     <div className="border-2 border-dashed border-white/5 rounded-3xl p-10 flex flex-col items-center justify-center gap-4 bg-white/[0.01] hover:bg-white/[0.02] cursor-pointer group transition-all">
                                        <div className="p-4 bg-white/5 rounded-2xl group-hover:bg-[#8a2bff]/20 transition-all">
                                            <VideoIcon className="text-white/20 group-hover:text-[#8a2bff]" size={32} />
                                        </div>
                                        <div className="text-center">
                                            <p className="text-sm font-bold">Drag and drop files, or <span className="text-[#8a2bff]">Browse</span></p>
                                            <p className="text-[10px] text-white/20 mt-1 uppercase tracking-widest">Upload Video in Mov, MP4</p>
                                        </div>
                                     </div>
                                </div>
                                <div className="space-y-4">
                                     <label className="text-[10px] text-white/30 font-bold uppercase tracking-widest px-2">Upload Intro Image</label>
                                     <div className="border-2 border-dashed border-white/5 rounded-3xl p-10 flex flex-col items-center justify-center gap-4 bg-white/[0.01] hover:bg-white/[0.02] cursor-pointer group transition-all">
                                        <div className="p-4 bg-white/5 rounded-2xl group-hover:bg-[#8a2bff]/20 transition-all">
                                            <Layout className="text-white/20 group-hover:text-[#8a2bff]" size={32} />
                                        </div>
                                        <div className="text-center">
                                            <p className="text-sm font-bold">Drag and drop files, or <span className="text-[#8a2bff]">Browse</span></p>
                                            <p className="text-[10px] text-white/20 mt-1 uppercase tracking-widest">Upload Thumbnail in JPEG, PNG</p>
                                        </div>
                                     </div>
                                </div>
                            </div>
                        </section>

                        <section className="space-y-6">
                            <div className="flex items-center gap-6 border-b border-white/5">
                                {["Description", "Syllabus", "FAQ's"].map(t => (
                                    <button key={t} className={`pb-4 px-2 text-xs font-bold italic ${t === 'Description' ? 'text-[#8a2bff] border-b-2 border-[#8a2bff]' : 'text-white/30'}`}>{t}</button>
                                ))}
                                <button className="ml-auto flex items-center gap-2 text-[#8a2bff] text-xs font-bold">Add Section <Plus size={16}/></button>
                            </div>
                            <GlassCard className="p-0 border-white/5 bg-white/[0.01] overflow-hidden">
                                <div className="p-4 border-b border-white/5 flex items-center gap-6 flex-wrap">
                                    <select className="bg-transparent text-xs font-bold outline-none border-r border-white/5 pr-4 uppercase tracking-tighter cursor-pointer">
                                        <option className="bg-[#040012]">Paragraph</option>
                                    </select>
                                    <div className="flex gap-4 border-r border-white/5 pr-4">
                                        <button className="text-xs font-bold">14</button>
                                        <button className="text-xs font-black italic">A</button>
                                    </div>
                                    <div className="flex gap-4 border-r border-white/5 pr-4">
                                        <button className="font-black text-xs">B</button>
                                        <button className="italic text-xs">I</button>
                                        <button className="underline text-xs">U</button>
                                    </div>
                                    <div className="flex gap-4">
                                         <Layout size={14} className="text-white/30" />
                                         <PlusCircle size={14} className="text-white/30" />
                                    </div>
                                </div>
                                <div className="h-96 w-full p-8" />
                            </GlassCard>
                        </section>
                    </div>

                    <div className="w-full xl:w-[350px] space-y-6">
                        <GlassCard className="p-6 border-white/5 bg-white/[0.01] space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] text-white/30 font-bold uppercase tracking-widest">Course Price</label>
                                <div className="text-sm font-bold">$ {course?.price}</div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] text-white/30 font-bold uppercase tracking-widest">Language</label>
                                <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm font-medium outline-none appearance-none cursor-pointer">
                                    <option>English</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] text-white/30 font-bold uppercase tracking-widest">CC</label>
                                <div className="flex flex-wrap gap-2">
                                    <div className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-xs flex items-center gap-2">English <ChevronLeft size={12} className="rotate-45 cursor-pointer"/></div>
                                    <div className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-xs flex items-center gap-2">Spanish <ChevronLeft size={12} className="rotate-45 cursor-pointer"/></div>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] text-white/30 font-bold uppercase tracking-widest">Level</label>
                                <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm font-medium outline-none appearance-none text-orange-400 cursor-pointer">
                                    <option>Beginner</option>
                                </select>
                            </div>
                        </GlassCard>
                    </div>
                </div>
            </motion.div>
          )}

          {activeTab === "Customer" && (
            <motion.div key="customer" className="space-y-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <GlassCard className="p-0 border-white/5 overflow-hidden">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-white/5 text-[10px] text-white/30 font-bold uppercase tracking-widest">
                                <th className="px-8 py-6">ID</th>
                                <th className="px-8 py-6">Customer</th>
                                <th className="px-8 py-6">Type</th>
                                <th className="px-8 py-6">Country</th>
                                <th className="px-8 py-6">Joined</th>
                                <th className="px-8 py-6">Total Amount</th>
                                <th className="px-8 py-6 text-right">Last Order</th>
                            </tr>
                        </thead>
                        <tbody className="text-xs font-medium text-white/70">
                            {[
                                { id: 1, name: "Ronald Richards", type: "Student", country: "India", joined: "15 May 2020 8:00 am", amount: "$ 500.00", order: "12542" },
                                { id: 2, name: "Darlene Robertson", type: "Student", country: "India", joined: "15 May 2020 8:30 am", amount: "$ 500.00", order: "46540" },
                                { id: 3, name: "Jerome Bell", type: "Teacher", country: "Sri Lanka", joined: "15 May 2020 9:30 am", amount: "$ 500.00", order: "68745" },
                            ].map((row) => (
                                <tr key={row.id} className="border-b border-white/[0.02] hover:bg-white/[0.01] transition-all">
                                    <td className="px-8 py-6 text-white/40 font-bold">{row.id}</td>
                                    <td className="px-8 py-6 font-bold text-white">{row.name}</td>
                                    <td className="px-8 py-6 uppercase tracking-widest text-[10px] text-white/40 font-black">{row.type}</td>
                                    <td className="px-8 py-6 text-white/60">{row.country}</td>
                                    <td className="px-8 py-6 text-white/40">{row.joined}</td>
                                    <td className="px-8 py-6 font-bold text-white">{row.amount}</td>
                                    <td className="px-8 py-6 text-right font-bold text-white/40">{row.order}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </GlassCard>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Unified Pagination for lists */}
        {(activeTab === "Commission" || activeTab === "Chapters" || activeTab === "Promotion" || activeTab === "Customer") && (
            <div className="flex justify-center items-center gap-3">
                <button className="p-2 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all text-white/20">
                    <ChevronLeft size={16} />
                </button>
                {[1, 2, 3].map(p => (
                    <button key={p} className={`w-10 h-10 rounded-xl text-xs font-black border transition-all ${p === 1 ? 'bg-[#8a2bff] border-[#8a2bff] text-white shadow-lg shadow-[#8a2bff]/20' : 'bg-white/5 border-white/5 text-white/20 hover:text-white'}`}>{p}</button>
                ))}
                <button className="p-2 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all text-white/20">
                    <ChevronRight size={16} />
                </button>
            </div>
        )}
      </div>
    </InstructorLayout>
  );
}
