"use client";

import { useState, useMemo, useEffect } from "react";
import JobCard from "@/components/jobs/JobCard";
import { Briefcase } from "lucide-react";
import JobFilter from "./JobFilter";
import { useRouter } from "next/navigation";
import { Pagination } from "@heroui/react";

export default function JobsClient({ jobs = [], initialFilters, total }) {
  
  
const [filters, setFilters] = useState({
  search: initialFilters.search || "",
  type: initialFilters.type || "",
  category: initialFilters.category || "",
  isRemote: initialFilters.isRemote || "",
  salary: initialFilters.salary || "",
  page: Number(initialFilters.page) || 1,
});
  
  
  const router = useRouter();

const handlePageChange = (newPage) => {
  const updated = { ...filters, page: newPage };
  setFilters(updated);
};

    const totalItems = total;
  const itemsPerPage = 9;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

   const getPageNumbers = () => {
    const pages = [];
    pages.push(1);
    if (filters.page > 3) {
      pages.push("ellipsis");
    }
    const start = Math.max(2, filters.page - 1);
    const end = Math.min(totalPages - 1, filters.page + 1);
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    if (filters.page < totalPages - 2) {
      pages.push("ellipsis");
    }
    pages.push(totalPages);
    return pages;
  };

  
const startItem = (filters.page - 1) * itemsPerPage + 1;
const endItem = Math.min(filters.page * itemsPerPage, totalItems);


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

    sp.set("page", filters.page);
    // console.log("serach params", sp.toString());
    const path = `?${sp.toString()}`;
    router.push(path);
  
  }, [router,filters.search, filters.type , filters.category, filters.isRemote, filters.salary, filters.page])

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
          <JobFilter  onFilterChange={(newFilters) =>
    setFilters(prev => ({
      ...prev,
      ...newFilters,
      page: 1
    }))
  }filters={filters} />
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
            <>
               <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {jobs.map((job) => (
              <JobCard key={job._id} job={job} />
            ))}
              </div>
                <Pagination className="w-full">
      <Pagination.Summary>
        Showing {startItem}-{endItem} of {totalItems} results
      </Pagination.Summary>
      <Pagination.Content>
        <Pagination.Item>
          <Pagination.Previous isDisabled={filters.page === 1} onPress={() => setFilters(prev => ({
  ...prev,
  page: prev.page - 1
}))}>
            <Pagination.PreviousIcon />
            <span>Previous</span>
          </Pagination.Previous>
        </Pagination.Item>
        {getPageNumbers().map((p, i) =>
          p === "ellipsis" ? (
            <Pagination.Item key={`ellipsis-${i}`}>
              <Pagination.Ellipsis />
            </Pagination.Item>
          ) : (
            <Pagination.Item key={p}>
             <Pagination.Link
  isActive={p === filters.page}
  onPress={() => handlePageChange(p)}
>
  {p}
</Pagination.Link>
            </Pagination.Item>
          ),
        )}
        <Pagination.Item>
          <Pagination.Next isDisabled={filters.page === totalPages} onPress={() => setFilters(prev => ({
  ...prev,
  page: prev.page + 1
}))}>
            <span>Next</span>
            <Pagination.NextIcon />
          </Pagination.Next>
        </Pagination.Item>
      </Pagination.Content>
    </Pagination>
            </>
        )}

      </div>
    </div>
  );
}