import { Card, Chip } from "@heroui/react";
import { MapPin, Clock, DollarSign, Building2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function JobCard({ job }) {
  return (
    <Link href={`/jobs/${job._id}`}>
      <Card className="bg-white/[0.03] border-purple-500/10 hover:bg-white/[0.06] hover:border-purple-500/20 transition-all cursor-pointer h-full">
        <Card.Header className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl border border-white/10 bg-white/5 flex items-center justify-center overflow-hidden shrink-0">
            {job.companyLogo ? (
              <Image src={job.companyLogo} alt={job.companyName} width={48} height={48} className="object-cover" />
            ) : (
              <Building2 size={20} className="text-white/20" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <Card.Title className="text-white font-semibold text-base truncate">{job.title}</Card.Title>
            <Card.Description className="text-white/40 text-sm">{job.companyName}</Card.Description>
          </div>
          <Chip
            size="sm"
            className={
              job.status === "active"
                ? "bg-green-500/10 text-green-400 border border-green-500/20 shrink-0"
                : "bg-white/5 text-white/40 border border-white/10 shrink-0"
            }
          >
            {job.status === "active" ? "Active" : "Closed"}
          </Chip>
        </Card.Header>

        <Card.Content className="pt-0 space-y-4">
          <div className="flex flex-wrap gap-2">
            <span className="text-xs px-3 py-1 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20">
              {job.type}
            </span>
            <span className="text-xs px-3 py-1 rounded-full bg-white/5 text-white/50 border border-white/10">
              {job.category}
            </span>
            {job.isRemote && (
              <span className="text-xs px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                Remote
              </span>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs text-white/40">
            <div className="flex items-center gap-1.5">
              <DollarSign size={13} className="text-white/30" />
              <span>{Number(job.salaryMin).toLocaleString()} – {Number(job.salaryMax).toLocaleString()} {job.currency}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin size={13} className="text-white/30" />
              <span>{job.isRemote ? "Remote" : `${job.city}, ${job.country}`}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock size={13} className="text-white/30" />
              <span>Deadline: {new Date(job.deadline).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
            </div>
          </div>
        </Card.Content>
      </Card>
    </Link>
  );
}