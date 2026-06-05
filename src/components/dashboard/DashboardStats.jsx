import React from 'react';
import { Briefcase, Users, Zap, XCircle, Sparkles } from "lucide-react";

const stats = [
  { icon: Briefcase, label: "Total Job Posts", value: "48" },
  { icon: Users, label: "Total Applicants", value: "1,284" },
  { icon: Zap, label: "Active Jobs", value: "18" },
  { icon: XCircle, label: "Jobs Closed", value: "32" },
];

const DashboardStats = () => {
    return (
         <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map(({ icon: Icon, label, value }) => (
            <div
              key={label}
              className="rounded-2xl border border-purple-500/10 bg-white/[0.03] hover:bg-white/[0.06] transition-all p-5 flex flex-col gap-4"
            >
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
                <Icon size={18} className="text-purple-400" />
              </div>
              <div>
                <p className="text-white/40 text-xs mb-1">{label}</p>
                <p className="text-2xl font-bold text-white">{value}</p>
              </div>
            </div>
          ))}
        </div>
    );
};

export default DashboardStats;