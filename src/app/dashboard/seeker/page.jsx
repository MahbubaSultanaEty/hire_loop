import { getApplicationByApplicant } from '@/lib/api/applications';
import { getUserSession } from '@/lib/core/session';
import React from 'react';

const SeekerDashboard =async () => {
    const user = await getUserSession();
    const applications = await getApplicationByApplicant(user?.id)
    
    const stats = [
        { id: 1, label: "Total Applied", count: applications.length, color: "border-indigo-500 text-indigo-400 bg-indigo-950/30" },
        { id: 2, label: "Shortlisted", count: 0, color: "border-emerald-500 text-emerald-400 bg-emerald-950/30" },
        { id: 3, label: "Interviews", count: 0, color: "border-purple-500 text-purple-400 bg-purple-950/30" },
    ];

    const recentJobs = applications.slice(-2);
console.log("recent jobs", recentJobs);
    const statusConfig = {
        pending: "bg-amber-500/10 text-amber-400 border border-amber-500/20",
        approved: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
        rejected: "bg-rose-500/10 text-rose-400 border border-rose-500/20",
    };

    const dotConfig = {
        pending: "bg-amber-500",
        approved: "bg-emerald-500",
        rejected: "bg-rose-500",
    };

    return (
        <div className="p-6 min-h-screen bg-black text-zinc-100">
            {/* Header Section */}
            <div className="mb-8 border-b border-zinc-800/80 pb-6">
                <h1 className="text-2xl font-bold tracking-tight text-white md:text-3xl">
                    Seeker <span className="text-indigo-500">Dashboard</span>
                </h1>
                <p className="text-sm text-zinc-400 mt-1">
                    Welcome back! Here is an overview of your job applications.
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 mb-10">
                {stats.map((stat) => (
                    <div 
                        key={stat.id} 
                        className={`p-6 ${stat.color} rounded-xl border border-zinc-800 border-l-4 shadow-md bg-zinc-900/40 backdrop-blur-sm transition-all duration-200 hover:border-zinc-700`}
                    >
                        <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                            {stat.label}
                        </p>
                        <p className="mt-2 text-3xl font-extrabold text-white">
                            {stat.count}
                        </p>
                    </div>
                ))}
            </div>

            {/* Recent Applications Table Section */}
            <div className="bg-zinc-900/40 backdrop-blur-sm rounded-xl shadow-lg border border-zinc-800/80 overflow-hidden">
                <div className="px-6 py-5 border-b border-zinc-800/80 bg-zinc-900/20">
                    <h2 className="text-lg font-semibold text-white tracking-wide">
                        Recent Applications
                    </h2>
                </div>
                
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-zinc-900/60 text-xs font-semibold uppercase tracking-wider text-zinc-400 border-b border-zinc-800/80">
                                <th className="px-6 py-3.5">Job Role</th>
                                <th className="px-6 py-3.5">Company</th>
                                <th className="px-6 py-3.5">Date Applied</th>
                                <th className="px-6 py-3.5">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-800/60 text-sm">
                            {recentJobs.map((job) => (
                                <tr key={job.jobId} className="hover:bg-zinc-900/30 transition-colors">
                                    <td className="px-6 py-4 font-medium text-white group-hover:text-indigo-400 transition-colors">
                                        {job.jobTitle}
                                    </td>
                                    <td className="px-6 py-4 text-zinc-300">{job.companyName}</td>
                                   <td className="px-6 py-4 text-zinc-400">
  {new Date(job.appliedAt).toLocaleDateString("en-GB")}
</td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            {/* ছোট কন্ডিশনাল ডট */}
                                            <div className={`w-2 h-2 rounded-full shrink-0 ${dotConfig[job.status]}`} />
                                            <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${statusConfig[job.status]}`}>
                                                {job.status}
                                            </span>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default SeekerDashboard;