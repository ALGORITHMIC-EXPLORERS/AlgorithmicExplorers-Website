import { useState, useEffect } from "react";
import { api } from "../context/AuthContext";
import InstructorLayout from "../components/InstructorLayout";
import GlassCard from "../components/GlassCard";
import { ArrowUpRight, Search, Filter, MoreHorizontal } from "lucide-react";
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

export default function RevenueAnalytics() {
  const [stats, setStats] = useState<any>(null);
  const [transactions, setTransactions] = useState<any[]>([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [statsRes, transRes] = await Promise.all([
          api.get("/api/finance/instructor-stats/"),
          api.get("/api/finance/revenue/")
        ]);
        setStats(statsRes.data);
        setTransactions(transRes.data);
      } catch (err) {
        console.error("Failed to fetch revenue stats", err);
      }
    };
    fetchStats();
  }, []);

  const chartData = stats?.chart_data || [];
  const totalRevenue = stats?.total_revenue || 0;
  const lastTransaction = transactions.length > 0 ? transactions[0] : null;

  return (
    <InstructorLayout title="Revenue Analytics">
      <div className="space-y-10 pb-20">
        <div className="flex justify-between items-center">
            <div>
                <h2 className="text-2xl font-bold">Revenue</h2>
                <p className="text-xs text-white/30 font-bold uppercase tracking-widest mt-1">Get top insights about your performance</p>
            </div>
            <button className="p-2 text-white/40 hover:text-white">
                <MoreHorizontal size={20} />
            </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
                { label: "Total Profits", value: `+ $${totalRevenue.toLocaleString()}`, change: "+ 8%" },
                { label: "Last Transaction", value: lastTransaction ? `${lastTransaction.transaction_type === 'Credit' ? '+' : '-'} $${lastTransaction.amount}` : "No data", change: "+ 8%" },
                { label: "Commission", value: `$${stats?.total_commission?.toLocaleString() || 0}`, change: "+ 8%" },
            ].map((card, i) => (
                <GlassCard key={i} className="p-6 border-white/5 bg-white/[0.01] flex justify-between items-start">
                    <div className="space-y-1">
                        <h4 className="text-2xl font-bold tracking-tight">{card.value}</h4>
                        <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest">{card.label}</p>
                    </div>
                    <div className="px-2 py-1 bg-white/5 border border-white/10 rounded-lg text-[10px] font-bold flex items-center gap-1">
                        <ArrowUpRight size={10} /> {card.change}
                    </div>
                </GlassCard>
            ))}
        </div>

        <GlassCard className="p-8 border-white/5 bg-white/[0.01]">
            <div className="flex justify-between items-center mb-10">
                <select className="bg-transparent text-[10px] text-white/40 font-bold border border-white/10 rounded-lg px-2 py-1 outline-none">
                    <option className="bg-[#040012]">Select Period: All</option>
                </select>
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
            <div className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData}>
                        <defs>
                            <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#437ef7" stopOpacity={0.3}/>
                                <stop offset="95%" stopColor="#437ef7" stopOpacity={0}/>
                            </linearGradient>
                            <linearGradient id="colorPrev" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#00d084" stopOpacity={0.3}/>
                                <stop offset="95%" stopColor="#00d084" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                        <XAxis 
                            dataKey="name" 
                            axisLine={false} 
                            tickLine={false} 
                            tick={{fill: 'rgba(255,255,255,0.3)', fontSize: 10, fontWeight: 'bold'}}
                            dy={10}
                        />
                        <YAxis 
                            axisLine={false} 
                            tickLine={false} 
                            tick={{fill: 'rgba(255,255,255,0.3)', fontSize: 10, fontWeight: 'bold'}}
                            tickFormatter={(value) => `$${value}`}
                        />
                        <Tooltip 
                            contentStyle={{ backgroundColor: '#06001a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                            itemStyle={{ fontSize: '10px', fontWeight: 'bold', textTransform: 'uppercase' }}
                        />
                        <Area type="monotone" dataKey="revenue" stroke="#437ef7" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
                        <Area type="monotone" dataKey="prev" stroke="#00d084" strokeWidth={3} fillOpacity={1} fill="url(#colorPrev)" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </GlassCard>

        <div className="space-y-6">
            <h3 className="text-xl font-bold">Transactions</h3>
            <div className="flex justify-between items-center">
                <div className="relative w-80">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={16} />
                    <input className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-xs" placeholder="Search User" />
                </div>
                <button className="text-[10px] font-bold text-white/60 uppercase tracking-widest flex items-center gap-2 hover:text-[#8a2bff]">Filter <Filter size={14}/></button>
            </div>
            <GlassCard className="p-0 border-white/5 overflow-hidden">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b border-white/5 text-[10px] text-white/30 font-bold uppercase tracking-widest">
                            <th className="px-8 py-6">Customer</th>
                            <th className="px-8 py-6">Date</th>
                            <th className="px-8 py-6">Type</th>
                            <th className="px-8 py-6 text-right">Amount</th>
                        </tr>
                    </thead>
                    <tbody className="text-xs font-medium text-white/70">
                        {transactions.map((row, i) => (
                            <tr key={i} className="border-b border-white/[0.02] hover:bg-white/[0.01]">
                                <td className="px-8 py-6 font-bold text-white">{row.customer_name}</td>
                                <td className="px-8 py-6 text-white/40">{new Date(row.created_at).toLocaleDateString()}</td>
                                <td className={`px-8 py-6 font-bold ${row.transaction_type === 'Credit' ? 'text-green-400' : 'text-rose-400'}`}>
                                    {row.transaction_type}
                                </td>
                                <td className="px-8 py-6 text-right font-bold text-white">${row.amount}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </GlassCard>
        </div>
      </div>
    </InstructorLayout>
  );
}
