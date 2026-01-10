import { useState, useEffect } from "react";
import AdminLayout from "../components/AdminLayout";
import GlassCard from "../components/GlassCard";
import { Users, GraduationCap, BookOpen, TrendingUp } from "lucide-react";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    users: 0,
    cohorts: 0,
    courses: 0,
    activeLearners: 0
  });

  useEffect(() => {
    // Placeholder stats
    setStats({
      users: 1250,
      cohorts: 12,
      courses: 45,
      activeLearners: 890
    });
  }, []);

  return (
    <AdminLayout title="System Overview">
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <GlassCard className="p-6 border-white/5 bg-white/[0.02]">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-blue-500/10 rounded-xl text-blue-500">
                <Users size={24} />
              </div>
              <div>
                <p className="text-sm text-white/40 font-medium">Total Users</p>
                <h3 className="text-2xl font-bold">{stats.users}</h3>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs text-green-500">
              <TrendingUp size={14} />
              <span>+12% from last month</span>
            </div>
          </GlassCard>

          <GlassCard className="p-6 border-white/5 bg-white/[0.02]">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-purple-500/10 rounded-xl text-purple-500">
                <GraduationCap size={24} />
              </div>
              <div>
                <p className="text-sm text-white/40 font-medium">Active Cohorts</p>
                <h3 className="text-2xl font-bold">{stats.cohorts}</h3>
              </div>
            </div>
            <div className="text-xs text-white/20">
              <span>Running effectively</span>
            </div>
          </GlassCard>

          <GlassCard className="p-6 border-white/5 bg-white/[0.02]">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-orange-500/10 rounded-xl text-orange-500">
                <BookOpen size={24} />
              </div>
              <div>
                <p className="text-sm text-white/40 font-medium">Total Courses</p>
                <h3 className="text-2xl font-bold">{stats.courses}</h3>
              </div>
            </div>
            <div className="text-xs text-white/20">
              <span>5 pending review</span>
            </div>
          </GlassCard>

          <GlassCard className="p-6 border-white/5 bg-white/[0.02]">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-green-500/10 rounded-xl text-green-500">
                <Users size={24} />
              </div>
              <div>
                <p className="text-sm text-white/40 font-medium">Active Learners</p>
                <h3 className="text-2xl font-bold">{stats.activeLearners}</h3>
              </div>
            </div>
            <div className="text-xs text-white/20">
              <span>Currently online</span>
            </div>
          </GlassCard>
        </div>

        <GlassCard className="p-8 border-white/5 bg-white/[0.01]">
            <h4 className="text-lg font-bold mb-6">System Health</h4>
            <div className="space-y-6">
                <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                        <span className="text-white/60">Server Load</span>
                        <span className="text-white font-medium">24%</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-green-500 w-[24%]" />
                    </div>
                </div>
                <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                        <span className="text-white/60">Database Usage</span>
                        <span className="text-white font-medium">67%</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-orange-500 w-[67%]" />
                    </div>
                </div>
            </div>
        </GlassCard>
      </div>
    </AdminLayout>
  );
}
