import { useState, useEffect } from "react";
import { api } from "../context/AuthContext";
import InstructorLayout from "../components/InstructorLayout";
import GlassCard from "../components/GlassCard";
import { Plus, MoreHorizontal } from "lucide-react";
import { Link } from "react-router-dom";

export default function InstructorDashboard() {
  const [courses, setCourses] = useState<any[]>([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const { data } = await api.get("/api/courses/courses/");
        setCourses(data);
      } catch (err) {
        console.error("Failed to fetch courses", err);
      }
    };
    fetchCourses();
  }, []);
  return (
    <InstructorLayout title="Courses">
      <div className="space-y-8">
        <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Courses</h2>
            <div className="flex items-center gap-4">
                <button className="px-6 py-2.5 bg-[#437ef7] text-white rounded-xl text-xs font-bold hover:bg-[#346bd4] transition-all flex items-center gap-2">
                    <Plus size={16} /> Add Course
                </button>
                <button className="p-2 text-white/40 hover:text-white transition-colors">
                    <MoreHorizontal size={20} />
                </button>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map(course => (
                <Link key={course.id} to={`/instructor/courses/${course.id}/management`}>
                    <GlassCard className="p-6 border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-all cursor-pointer group">
                        <div className="flex justify-between items-start mb-6">
                            <span className="px-2 py-1 bg-white/5 border border-white/10 rounded-lg text-[10px] font-bold text-white/40 uppercase tracking-widest">{course.type}</span>
                            <button className="text-white/20 group-hover:text-white transition-colors">
                                <MoreHorizontal size={18} />
                            </button>
                        </div>
                        <h4 className="text-lg font-bold mb-6 group-hover:text-[#8a2bff] transition-colors">{course.title}</h4>
                        
                        <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                            <div>
                                <p className="text-lg font-bold">${course.price}</p>
                                <p className="text-[10px] text-white/30 font-bold uppercase tracking-widest">Price</p>
                            </div>
                            <div>
                                <p className="text-lg font-bold">{course.chapters?.length || 0}</p>
                                <p className="text-[10px] text-white/30 font-bold uppercase tracking-widest">Chapters</p>
                            </div>
                            <div>
                                <p className="text-lg font-bold">0</p>
                                <p className="text-[10px] text-white/30 font-bold uppercase tracking-widest">Orders</p>
                            </div>
                            <div>
                                <p className="text-lg font-bold">0</p>
                                <p className="text-[10px] text-white/30 font-bold uppercase tracking-widest">Certificates</p>
                            </div>
                            <div>
                                <p className="text-lg font-bold">0</p>
                                <p className="text-[10px] text-white/30 font-bold uppercase tracking-widest">Reviews</p>
                            </div>
                            <div>
                                <p className="text-lg font-bold">0</p>
                                <p className="text-[10px] text-white/30 font-bold uppercase tracking-widest">Added to Shelf</p>
                            </div>
                        </div>
                    </GlassCard>
                </Link>
            ))}
        </div>
      </div>
    </InstructorLayout>
  );
}
