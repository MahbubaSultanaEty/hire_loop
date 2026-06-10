import { getCompanyJobs } from "@/lib/api/jobs";
import { Chip } from "@heroui/react";
import { MapPin, Briefcase, Eye, Pencil, Trash2, Plus } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Manage Jobs | HireLoop",
  description: "View and manage all your job postings on HireLoop.",
};

const RecruiterJobs = async () => {
  const companyId = "company-123";
  const jobs = await getCompanyJobs(companyId);

  return (
    <div className="w-full px-6 py-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white">Manage Jobs</h1>
          <p className="text-white/40 text-sm mt-1">
            {jobs.length} job{jobs.length !== 1 ? "s" : ""} posted
          </p>
        </div>
        <Link
          href="/dashboard/recruiter/jobs/new"
          className="flex items-center gap-2 bg-purple-600 hover:bg-purple-500 text-white text-sm font-medium px-4 py-2.5 rounded-xl shadow-lg shadow-purple-500/25 transition-all"
        >
          <Plus size={16} />
          Post New Job
        </Link>
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-purple-500/10 bg-white/[0.03] overflow-hidden">
        {jobs.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <Briefcase size={40} className="text-white/10 mb-4" />
            <p className="text-white/40 text-sm">No jobs posted yet.</p>
            <Link
              href="/recruiter/dashboard/jobs/post"
              className="mt-4 text-purple-400 hover:text-purple-300 text-sm transition-colors"
            >
              Post your first job →
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-purple-500/10">
                  <th className="text-left text-white/40 font-medium px-6 py-4">Job Title</th>
                  <th className="text-left text-white/40 font-medium px-6 py-4">Type / Category</th>
                  <th className="text-left text-white/40 font-medium px-6 py-4">Location</th>
                  <th className="text-left text-white/40 font-medium px-6 py-4">Status</th>
                  <th className="text-left text-white/40 font-medium px-6 py-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {jobs.map((job, index) => (
                  <tr
                    key={job._id}
                    className={`border-b border-purple-500/5 hover:bg-white/[0.02] transition-colors ${
                      index === jobs.length - 1 ? "border-b-0" : ""
                    }`}
                  >
                    {/* Job Title */}
                    <td className="px-6 py-4">
                      <p className="text-white font-medium">{job.title}</p>
                      <p className="text-white/30 text-xs mt-0.5">
                        Deadline: {job.deadline}
                      </p>
                    </td>

                    {/* Type / Category */}
                    <td className="px-6 py-4">
                      <p className="text-white/80">{job.type}</p>
                      <p className="text-white/30 text-xs mt-0.5">{job.category}</p>
                    </td>

                    {/* Location */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5 text-white/60">
                        <MapPin size={13} className="text-white/30" />
                        {job.isRemote ? (
                          <span className="text-purple-400">Remote</span>
                        ) : (
                          <span>{job.city}, {job.country}</span>
                        )}
                      </div>
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4">
                      <Chip
                        size="sm"
                        className={
                          job.status === "active"
                            ? "bg-green-500/10 text-green-400 border border-green-500/20"
                            : "bg-white/5 text-white/40 border border-white/10"
                        }
                      >
                        {job.status === "active" ? "Active" : "Inactive"}
                      </Chip>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button className="flex items-center gap-1.5 text-xs text-white/50 hover:text-white border border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-lg transition-all">
                          <Eye size={13} />
                          View
                        </button>
                        <button className="flex items-center gap-1.5 text-xs text-purple-400 hover:text-purple-300 border border-purple-500/20 hover:border-purple-500/40 bg-purple-500/5 hover:bg-purple-500/10 px-3 py-1.5 rounded-lg transition-all">
                          <Pencil size={13} />
                          Edit
                        </button>
                        <button className="flex items-center gap-1.5 text-xs text-red-400 hover:text-red-300 border border-red-500/20 hover:border-red-500/40 bg-red-500/5 hover:bg-red-500/10 px-3 py-1.5 rounded-lg transition-all">
                          <Trash2 size={13} />
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecruiterJobs;