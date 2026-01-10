import { useState } from "react";
import InstructorLayout from "../components/InstructorLayout";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, Trash2, Plus } from "lucide-react";

export default function ChapterEditor() {
  const [activeTab, setActiveTab] = useState("Details");

  const tabs = ["Details", "Resources", "SEO"];

  return (
    <InstructorLayout title="Chapter 1 - The Solid State">
      <div className="space-y-10 pb-20">
        <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
                <button className="p-2 text-white/30 hover:text-white transition-all">
                    <ChevronLeft size={20} />
                </button>
                <h2 className="text-2xl font-bold">Chapter 1 - The Solid State</h2>
            </div>
            <div className="flex gap-4">
                <button className="px-6 py-2.5 bg-rose-500 text-white rounded-xl text-xs font-bold hover:bg-rose-600 transition-all flex items-center gap-2">
                    Delete
                </button>
                <button className="px-6 py-2.5 bg-[#6400ff] text-white rounded-xl text-xs font-bold hover:bg-[#5b00e6] transition-all">
                    Move to Draft
                </button>
                <button className="px-6 py-2.5 bg-[#437ef7] text-white rounded-xl text-xs font-bold hover:bg-[#346bd4] transition-all">
                    Add Course
                </button>
            </div>
        </div>

        <div className="flex border-b border-white/5">
           {tabs.map(tab => (
             <button 
                key={tab} 
                onClick={() => setActiveTab(tab)}
                className={`px-8 pb-4 text-xs font-bold transition-all relative ${
                    activeTab === tab ? "text-[#8a2bff]" : "text-white/30 hover:text-white/50"
                }`}
             >
                {tab}
                {activeTab === tab && (
                    <motion.div layoutId="chapterEditTab" className="absolute bottom-[-1px] left-0 right-0 h-1 bg-[#8a2bff] rounded-full" />
                )}
             </button>
           ))}
        </div>

        <AnimatePresence mode="wait">
            {activeTab === "Details" && (
                <motion.div key="details" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8 max-w-4xl">
                    <div>
                        <h3 className="text-xl font-bold mb-2">Chapter details</h3>
                        <p className="text-sm text-white/40 leading-relaxed font-black italic">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.</p>
                    </div>

                    <div className="space-y-6">
                        <div className="bg-white/[0.01] border border-white/5 rounded-2xl p-6">
                            <label className="text-[10px] text-white/30 font-bold uppercase tracking-widest block mb-2">Title</label>
                            <input className="w-full bg-transparent text-sm font-bold outline-none" defaultValue="Chapter 1 - The Solid State" />
                        </div>
                        <div className="bg-white/[0.01] border border-white/5 rounded-2xl p-6">
                            <label className="text-[10px] text-white/30 font-bold uppercase tracking-widest block mb-2">Subtitle</label>
                            <input className="w-full bg-transparent text-sm font-bold outline-none" defaultValue="Learn about the solid states with ease and get sample papers and notes too!" />
                        </div>
                        <div className="bg-white/[0.01] border border-white/5 rounded-2xl p-6">
                            <label className="text-[10px] text-white/30 font-bold uppercase tracking-widest block mb-1">Description</label>
                            <textarea className="w-full bg-transparent text-sm font-medium outline-none h-32 resize-none leading-relaxed" defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat." />
                        </div>
                    </div>
                </motion.div>
            )}

            {activeTab === "Resources" && (
                <motion.div key="resources" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8 max-w-4xl">
                    <div>
                        <h3 className="text-xl font-bold mb-2">Upload Notes</h3>
                        <p className="text-sm text-white/40 leading-relaxed font-black italic">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                    </div>

                    <div className="space-y-8">
                        <div className="grid grid-cols-2 gap-6">
                            <div className="bg-white/[0.01] border border-white/5 rounded-2xl p-6">
                                <label className="text-[10px] text-white/30 font-bold uppercase tracking-widest block mb-2">Content Type</label>
                                <input className="w-full bg-transparent text-sm font-bold outline-none" defaultValue="Notes" />
                            </div>
                            <div className="bg-white/[0.01] border border-white/5 rounded-2xl p-6">
                                <label className="text-[10px] text-white/30 font-bold uppercase tracking-widest block mb-2">Title</label>
                                <input className="w-full bg-transparent text-sm font-bold outline-none" defaultValue="Notes" />
                            </div>
                        </div>
                        <div className="bg-white/[0.01] border border-white/5 rounded-2xl p-6">
                            <label className="text-[10px] text-white/30 font-bold uppercase tracking-widest block mb-1">Description</label>
                            <textarea className="w-full bg-transparent text-sm font-medium outline-none h-32 resize-none leading-relaxed" defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat." />
                        </div>

                        <div className="space-y-4">
                             <label className="text-[10px] text-white/30 font-bold uppercase tracking-widest px-2">Upload File</label>
                             <div className="border-2 border-dashed border-white/5 rounded-3xl p-12 flex flex-col items-center justify-center gap-4 bg-white/[0.01] hover:bg-white/[0.02] cursor-pointer group">
                                 <div className="p-4 bg-white/5 rounded-2xl">
                                    <Trash2 size={24} className="text-white/20" />
                                 </div>
                                 <div className="text-center">
                                    <p className="text-sm font-bold">Drag and drop files, or <span className="text-[#8a2bff]">Browse</span></p>
                                    <p className="text-[10px] text-white/20 mt-1 uppercase tracking-widest">Upload files in Text, Word, PDF.</p>
                                 </div>
                             </div>
                        </div>

                         <div className="space-y-4">
                             <label className="text-[10px] text-white/30 font-bold uppercase tracking-widest px-2">Upload Thumbnail</label>
                             <div className="border-2 border-dashed border-white/5 rounded-3xl p-12 flex flex-col items-center justify-center gap-4 bg-white/[0.01] hover:bg-white/[0.02] cursor-pointer group">
                                 <div className="p-4 bg-white/5 rounded-2xl">
                                    <Plus size={24} className="text-white/20" />
                                 </div>
                                 <div className="text-center">
                                    <p className="text-sm font-bold">Drag and drop files, or <span className="text-[#8a2bff]">Browse</span></p>
                                    <p className="text-[10px] text-white/20 mt-1 uppercase tracking-widest">Upload Thumbnail in JPEG, PNG.</p>
                                 </div>
                             </div>
                        </div>
                    </div>
                </motion.div>
            )}

            {activeTab === "SEO" && (
                <motion.div key="seo" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8 max-w-4xl">
                    <div>
                        <h3 className="text-xl font-bold mb-2">SEO</h3>
                        <p className="text-sm text-white/40 leading-relaxed font-black italic">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                    </div>

                    <div className="space-y-6">
                        <div className="bg-white/[0.01] border border-white/5 rounded-2xl p-6">
                            <label className="text-[10px] text-white/30 font-bold uppercase tracking-widest block mb-2">PPT Title</label>
                            <input className="w-full bg-transparent text-sm font-bold outline-none" defaultValue="Notes" />
                        </div>
                        <div className="bg-white/[0.01] border border-white/5 rounded-2xl p-6">
                            <label className="text-[10px] text-white/30 font-bold uppercase tracking-widest block mb-1">Description</label>
                            <textarea className="w-full bg-transparent text-sm font-medium outline-none h-32 resize-none leading-relaxed" defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat." />
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
      </div>
    </InstructorLayout>
  );
}
