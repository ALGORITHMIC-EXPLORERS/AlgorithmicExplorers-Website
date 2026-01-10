import { useState } from "react";
import InstructorLayout from "../components/InstructorLayout";
import GlassCard from "../components/GlassCard";
import { motion, AnimatePresence } from "framer-motion";
import { Search, MoreHorizontal, Send, PlusCircle, Layout } from "lucide-react";

const tabs = ["Reviews", "Messages", "Notification"];

const users = [
  { id: 1, name: "Veli Dincer", status: "Student", avatar: "https://i.pravatar.cc/100?u=veli" },
  { id: 2, name: "Theresa Webb", status: "Student", unread: 3, avatar: "https://i.pravatar.cc/100?u=theresa" },
  { id: 3, name: "Eleanor Pena", status: "Student", avatar: "https://i.pravatar.cc/100?u=eleanor" },
  { id: 4, name: "Jane Cooper", status: "Student", avatar: "https://i.pravatar.cc/100?u=jane" },
  { id: 5, name: "Brooklyn Simmons", status: "Student", avatar: "https://i.pravatar.cc/100?u=brooklyn" },
];

export default function InstructorCommunication() {
  const [activeTab, setActiveTab] = useState("Messages");
  const [showCreateAnnouncement, setShowCreateAnnouncement] = useState(false);

  return (
    <InstructorLayout title="Communication">
      <div className="space-y-8">
        {/* Tabs */}
        <div className="flex items-center gap-8 border-b border-white/5 mb-2">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => { setActiveTab(tab); setShowCreateAnnouncement(false); }}
              className={`pb-4 px-2 text-sm font-bold transition-all relative ${
                activeTab === tab ? "text-[#8a2bff]" : "text-white/30 hover:text-white/50"
              }`}
            >
              {tab}
              {activeTab === tab && (
                <motion.div layoutId="commTab" className="absolute bottom-[-1px] left-0 right-0 h-0.5 bg-[#8a2bff]" />
              )}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {activeTab === "Messages" && (
            <motion.div key="messages" className="flex h-[70vh] gap-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                {/* User List Sidebar */}
                <div className="w-80 flex flex-col gap-4">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={16} />
                        <input className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-xs" placeholder="Search User" />
                    </div>
                    <GlassCard className="flex-1 p-0 border-white/5 bg-white/[0.01] overflow-y-auto no-scrollbar">
                        {users.map(user => (
                            <div key={user.id} className={`p-4 flex items-center gap-4 hover:bg-white/5 cursor-pointer transition-all border-b border-white/[0.02] ${user.id === 1 ? 'bg-[#6400ff]/10 border-l-4 border-l-[#8a2bff]' : ''}`}>
                                <img src={user.avatar} className="w-10 h-10 rounded-xl object-cover" />
                                <div className="flex-1 min-w-0">
                                    <h4 className="text-sm font-bold truncate">{user.name}</h4>
                                    <p className="text-[10px] text-white/30 font-medium">{user.status}</p>
                                </div>
                                {user.unread && (
                                    <div className="w-5 h-5 bg-[#437ef7] rounded-full flex items-center justify-center text-[10px] font-bold">
                                        {user.unread}
                                    </div>
                                )}
                            </div>
                        ))}
                    </GlassCard>
                </div>

                {/* Chat Window */}
                <GlassCard className="flex-1 p-0 border-white/5 bg-white/[0.01] flex flex-col overflow-hidden">
                    <div className="p-6 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
                        <div className="flex items-center gap-4">
                            <img src="https://i.pravatar.cc/100?u=jack" className="w-12 h-12 rounded-xl object-cover" />
                            <div>
                                <h4 className="text-base font-bold">Jack Harrow</h4>
                                <p className="text-[10px] text-white/30 font-medium uppercase tracking-widest">Student</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-6">
                            <button className="text-rose-500 text-xs font-bold hover:underline">Delete</button>
                            <button className="text-[#437ef7] text-xs font-bold hover:underline">Block</button>
                        </div>
                    </div>

                    <div className="flex-1 p-8 overflow-y-auto flex flex-col gap-8 no-scrollbar bg-[radial-gradient(circle_at_bottom_right,_var(--tw-gradient-from),_transparent_40%)] from-[#1a0b3b]/10">
                         {/* Received */}
                         <div className="flex flex-col gap-2 max-w-[80%]">
                            <p className="text-sm text-white/60 leading-relaxed bg-white/[0.02] border border-white/5 p-4 rounded-2xl rounded-tl-none">
                                Hi I have Some Queries regarding 2nd Chaper
                            </p>
                            <span className="text-[10px] text-white/20 font-bold uppercase tracking-widest">40 mins ago</span>
                         </div>

                         {/* Sent */}
                         <div className="flex flex-col gap-2 max-w-[80%] self-end items-end">
                            <p className="text-sm text-white bg-[#6400ff]/20 border border-[#8a2bff]/20 p-4 rounded-2xl rounded-tr-none">
                                Sure, Let me know what is issue?
                            </p>
                            <span className="text-[10px] text-white/20 font-bold uppercase tracking-widest">40 mins ago</span>
                         </div>

                         <div className="mt-auto">
                            <span className="text-xs text-white/60">There?</span>
                         </div>
                    </div>

                    <div className="p-6 border-t border-white/5 bg-[#040012]/40">
                        <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-2xl p-2 pl-6">
                            <input className="flex-1 bg-transparent text-sm outline-none" placeholder="Reply..." />
                            <button className="px-6 py-2.5 bg-[#00d084] text-white rounded-xl text-xs font-bold hover:bg-[#00b070] transition-all flex items-center gap-2">
                                Send <Send size={14} />
                            </button>
                        </div>
                    </div>
                </GlassCard>
            </motion.div>
          )}

          {activeTab === "Notification" && !showCreateAnnouncement && (
            <motion.div key="notif-list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                 <div className="flex justify-between items-center py-2">
                    <div className="flex gap-8">
                        <div className="flex items-center gap-2">
                            <span className="text-xs text-white/30 font-bold uppercase tracking-widest">Assignment:</span>
                            <select className="bg-transparent text-xs font-black outline-none cursor-pointer italic text-white/60">
                                <option className="bg-[#040012]">All</option>
                            </select>
                        </div>
                    </div>
                    <button 
                        onClick={() => setShowCreateAnnouncement(true)}
                        className="flex items-center gap-2 px-6 py-3 bg-[#437ef7] rounded-xl text-xs font-bold hover:shadow-lg hover:shadow-[#437ef7]/20 transition-all"
                    >
                        Make a New Announcement <PlusCircle size={16} />
                    </button>
                </div>
                {/* Mocked current notifications */}
                {[1, 2].map(id => (
                    <GlassCard key={id} className="p-6 border-white/5 bg-white/[0.01] flex gap-8 items-center group transition-all hover:bg-white/[0.03]">
                        <img src="https://images.unsplash.com/photo-1543508282-6319a3e2621f?w=200&h=120&fit=crop" className="w-48 h-28 rounded-2xl object-cover" />
                        <div className="flex-1">
                            <h4 className="text-xl font-bold mb-1">20% off on Xmas</h4>
                            <p className="text-[10px] text-white/30 font-bold uppercase tracking-widest mb-3">Draft on 25 Jan 2022</p>
                            <p className="text-sm text-white/60 line-clamp-2">Hurry, get the last chance for discount of courses. Buy NCERT Solutions for Class 12 Chemistry and Get 20% off...</p>
                        </div>
                        <div className="flex flex-col gap-4">
                            <button className="p-2 text-white/20 hover:text-white transition-colors"><MoreHorizontal size={20}/></button>
                            <button className="text-xs text-[#8a2bff] font-bold hover:underline">Edit</button>
                        </div>
                    </GlassCard>
                ))}
            </motion.div>
          )}

          {activeTab === "Notification" && showCreateAnnouncement && (
            <motion.div key="create-notif" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl space-y-8">
                <div className="flex items-center gap-2 text-white/30 text-xs font-bold uppercase tracking-widest mb-4">
                    <span>Communication</span>
                    <span>/</span>
                    <span>Notification</span>
                    <span>/</span>
                    <span className="text-[#437ef7]">Announcement</span>
                </div>
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold">Create Announcement</h2>
                    <div className="flex gap-4">
                        <button onClick={() => setShowCreateAnnouncement(false)} className="px-6 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs font-bold hover:bg-white/10 transition-all font-black italic text-white/40">Draft</button>
                        <button className="px-6 py-2.5 bg-[#00d084] text-white rounded-xl text-xs font-bold hover:bg-[#00b070] transition-all">Save</button>
                        <button className="px-6 py-2.5 bg-[#437ef7] text-white rounded-xl text-xs font-bold hover:bg-[#346bd4] transition-all">Publish</button>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-[10px] text-white/30 font-bold uppercase tracking-widest px-2">Notification Status</label>
                        <select className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm font-bold text-green-400 outline-none appearance-none cursor-pointer">
                            <option>Published</option>
                        </select>
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] text-white/30 font-bold uppercase tracking-widest px-2">Notification Title</label>
                        <input className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm font-bold" defaultValue="20% Flat Off for first 100 Students" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] text-white/30 font-bold uppercase tracking-widest px-2">Description</label>
                        <textarea className="w-full h-32 bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm font-medium resize-none" defaultValue="Buy NCERT Solutions for Class 12 Chemistry and Get 20% off on your cource. Only first hundred students can avail this offer. Hurry!" />
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-[10px] text-white/30 font-bold uppercase tracking-widest px-2">Link</label>
                            <input className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm font-medium" defaultValue="https://test.com/courses" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] text-white/30 font-bold uppercase tracking-widest px-2">Customer Group</label>
                            <select className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm font-medium outline-none appearance-none cursor-pointer">
                                <option>All Group</option>
                            </select>
                        </div>
                    </div>
                    <div className="space-y-4">
                         <label className="text-[10px] text-white/30 font-bold uppercase tracking-widest px-2">Upload Thumbnail</label>
                         <div className="border-2 border-dashed border-white/5 rounded-3xl p-12 flex flex-col items-center justify-center gap-4 bg-white/[0.01] hover:bg-white/[0.02] transition-all cursor-pointer group">
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
            </motion.div>
          )}

          {activeTab === "Reviews" && (
            <motion.div key="reviews" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-10">
                {/* Review Stats */}
                <div className="flex gap-4 overflow-x-auto no-scrollbar scroll-smooth pb-4">
                    {[
                        { label: "Total Reviews", value: "1000", color: "white" },
                        { label: "1 star reviews", value: "100", sub: "1.0", color: "#ff4d4d" },
                        { label: "2 star reviews", value: "100", sub: "2.0", color: "#ffa500" },
                        { label: "3 star reviews", value: "100", sub: "3.0", color: "#ffD700" },
                        { label: "4 star reviews", value: "100", sub: "4.0", color: "#90ee90" },
                        { label: "5 star reviews", value: "100", sub: "5.0", color: "#00d084" },
                    ].map((stat, i) => (
                        <GlassCard key={i} className="min-w-[200px] flex-shrink-0 p-6 border-white/5 bg-white/[0.01] space-y-4">
                            <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest">{stat.label}</p>
                            <div className="flex items-center gap-3">
                                <span className="text-3xl font-black">{stat.value}</span>
                                {stat.sub && (
                                    <span className="px-2 py-0.5 rounded text-[10px] font-black text-white" style={{ backgroundColor: stat.color }}>{stat.sub}</span>
                                )}
                            </div>
                        </GlassCard>
                    ))}
                </div>

                <div className="grid gap-6">
                    {[1, 2, 3].map(id => (
                        <GlassCard key={id} className="p-8 border-white/5 bg-white/[0.01] space-y-6">
                            <div className="flex justify-between items-start">
                                <div className="space-y-4">
                                     <div className="flex items-center gap-1">
                                        <span className="text-[10px] text-white/30 font-bold uppercase tracking-widest mr-2">Rating:</span>
                                        {[...Array(5)].map((_, i) => (
                                            <span key={i} className={`text-sm ${i < 4 ? 'text-orange-400' : 'text-white/10'}`}>★</span>
                                        ))}
                                     </div>
                                     <div className="flex items-center gap-2">
                                        <span className="text-[10px] text-white/30 font-bold uppercase tracking-widest">Course Name:</span>
                                        <span className="text-sm font-bold">Beginners Guide to Design</span>
                                     </div>
                                     <div className="flex items-center gap-4">
                                        <img src="https://i.pravatar.cc/100?u=chris" className="w-10 h-10 rounded-xl object-cover" />
                                        <div>
                                            <h4 className="text-sm font-bold">Chris Walter</h4>
                                            <p className="text-[10px] text-white/30 font-medium">3 days ago</p>
                                        </div>
                                     </div>
                                </div>
                                <button className="text-white/20 hover:text-white transition-colors"><MoreHorizontal size={20} /></button>
                            </div>
                            <p className="text-sm text-white/60 leading-relaxed italic">
                                I was initially apprehensive, having no prior design experience. But the instructor, John Doe, did an amazing job of breaking down complex concepts into easily digestible modules. The video lectures were engaging, and the real-world examples really helped solidify my understanding.
                            </p>
                        </GlassCard>
                    ))}
                </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </InstructorLayout>
  );
}
