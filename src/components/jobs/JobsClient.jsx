"use client";

import { useState, useMemo, useEffect } from "react";
import JobCard from "@/components/jobs/JobCard";
import { Briefcase } from "lucide-react";
import JobFilter from "./JobFilter";
import { useRouter } from "next/navigation";

export default function JobsClient({ jobs = [] }) {
const [filters, setFilters] = useState({
  search: "", type: "", category: "", isRemote: "", salary: "",
});
  
  const router = useRouter();
  
  useEffect(() => {
    const sp = new URLSearchParams();
    if (filters.search) {
      sp.set("search", filters.search)
    }
if (filters.type) {
  sp.set("jobType", filters.type);
}
    if (filters.category !== "") {
      sp.set("category", filters.category)
    }
    if (filters.isRemote !== "") {
  sp.set("isRemote", filters.isRemote)
    }
    if (filters.salary !== "") {
      sp.set("salary", filters.salary)
    }
    console.log("serach params", sp.toString());
    const path = `?${sp.toString()}`;
    router.push(path)
  }, [router,filters.search, filters.type , filters.category, filters.isRemote, filters.salary])

// const filtered = useMemo(() => {
//   return jobs.filter((job) => {
//     const search = filters.search.toLowerCase();
//     if (search && !job.title.toLowerCase().includes(search) && !job.companyName?.toLowerCase().includes(search)) return false;
//     if (filters.type && job.type !== filters.type) return false;
//     if (filters.category && job.category !== filters.category) return false;
//     if (filters.isRemote === "true" && !job.isRemote) return false;
//     if (filters.isRemote === "false" && job.isRemote) return false;
//     if (filters.salary) {
//       const [min, max] = filters.salary.split("-").map(Number);
//       const jobMin = Number(job.salaryMin);
//       if (jobMin < min || jobMin > max) return false;
//     }
//     return true;
//   });
// }, [jobs, filters]);

  return (
    <div className="min-h-screen bg-[#0F1117] px-6 py-10 mt-20">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Browse <span className="text-purple-400">Jobs</span>
          </h1>
          <p className="text-white/40 text-sm">
            {jobs.length} job{jobs.length !== 1 ? "s" : ""} found
          </p>
        </div>

        {/* Filter */}
        <div className="mb-6">
          <JobFilter onFilterChange={setFilters} />
        </div>

        {/* Jobs Grid */}
        {jobs.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-16 h-16 rounded-2xl bg-purple-500/10 flex items-center justify-center mb-4">
              <Briefcase size={28} className="text-purple-400" />
            </div>
            <h2 className="text-white font-semibold text-lg mb-2">No jobs found</h2>
            <p className="text-white/40 text-sm">Try adjusting your filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {jobs.map((job) => (
              <JobCard key={job._id} job={job} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}