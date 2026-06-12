import { getJobById } from "@/lib/api/jobs";
import {
  Building2,
  MapPin,
  Clock,
  DollarSign,
  Briefcase,
  Calendar,
  Globe,
  CheckCircle2,
} from "lucide-react";
import { Card, Chip, Button, Separator, Toast } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { getUserSession } from "@/lib/core/session";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const job = await getJobById(id);
  return {
    title: `${job?.title} at ${job?.companyName} | HireLoop`,
    description: job?.requirements?.slice(0, 150),
  };
}


const InfoRow = ({ icon: Icon, label, value }) => (
  <div className="flex items-center gap-3">
    <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center shrink-0">
      <Icon size={14} className="text-purple-400" />
    </div>
    <div>
      <p className="text-white/30 text-xs">{label}</p>
      <p className="text-white text-sm font-medium">{value}</p>
    </div>
  </div>
);

const ListSection = ({ icon: Icon, title, content, dotColor }) => (
  <Card className="bg-white/[0.03] border-purple-500/10">
    <Card.Header>
      <Card.Title className="text-white font-semibold text-lg flex items-center gap-2">
        <Icon size={18} className="text-purple-400" />
        {title}
      </Card.Title>
    </Card.Header>
    <Card.Content className="pt-0 space-y-2">
      {content
        .split("\n")
        .filter(Boolean)
        .map((line, i) => (
          <div key={i} className="flex items-start gap-2 text-white/60 text-sm">
            <CheckCircle2 size={15} className={`${dotColor} mt-0.5 shrink-0`} />
            <span>{line}</span>
          </div>
        ))}
    </Card.Content>
  </Card>
);

const JobDetailsPage = async ({ params }) => {
  const { id } = await params;
    const job = await getJobById(id);
    const user = await getUserSession();

  return (
    <div className="min-h-screen bg-[#0F1117] px-6 py-10 mt-20">
      <div className="max-w-5xl mx-auto">
        <Link
          href="/jobs"
          className="inline-flex items-center gap-2 text-white/40 hover:text-white text-sm mb-8 transition-colors"
        >
          ← Back to Jobs
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* LEFT */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header */}
            <Card className="bg-white/[0.03] border-purple-500/10">
              <Card.Content className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-2xl border border-white/10 bg-white/5 flex items-center justify-center overflow-hidden shrink-0">
                  {job.companyLogo ? (
                    <Image
                      src={job.companyLogo}
                      alt={job.companyName}
                      width={64}
                      height={64}
                      className="object-cover"
                    />
                  ) : (
                    <Building2 size={24} className="text-white/20" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <Card.Title className="text-2xl font-bold text-white mb-1">
                    {job.title}
                  </Card.Title>
                  <Card.Description className="text-white/50 text-sm mb-3">
                    {job.companyName}
                  </Card.Description>
                  <div className="flex flex-wrap gap-2">
                    <Chip
                      size="sm"
                      className="bg-purple-500/10 text-purple-300 border border-purple-500/20"
                    >
                      {job.type}
                    </Chip>
                    <Chip
                      size="sm"
                      className="bg-white/5 text-white/50 border border-white/10"
                    >
                      {job.category}
                    </Chip>
                    {job.isRemote && (
                      <Chip
                        size="sm"
                        className="bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
                      >
                        Remote
                      </Chip>
                    )}
                    <Chip
                      size="sm"
                      className={
                        job.status === "active"
                          ? "bg-green-500/10 text-green-400 border border-green-500/20"
                          : "bg-white/5 text-white/40 border border-white/10"
                      }
                    >
                      {job.status === "active" ? "Active" : "Closed"}
                    </Chip>
                  </div>
                </div>
              </Card.Content>
            </Card>

            <ListSection
              icon={Briefcase}
              title="Responsibilities"
              content={job.responsibilities}
              dotColor="text-purple-400"
            />
            <ListSection
              icon={CheckCircle2}
              title="Requirements"
              content={job.requirements}
              dotColor="text-cyan-400"
            />
            {job.benefits && (
              <ListSection
                icon={Globe}
                title="Benefits"
                content={job.benefits}
                dotColor="text-green-400"
              />
            )}
          </div>

          {/* RIGHT */}
          <div className="space-y-4">
            {/* Apply Card */}
            <Card className="bg-purple-500/5 border-purple-500/20  ">
              <Card.Header>
                <Card.Title className="text-white font-semibold">
                  Interested in this role?
                </Card.Title>
                <Card.Description className="text-white/40 text-xs">
                  Apply before the deadline to be considered.
                </Card.Description>
              </Card.Header>
              <Card.Content>
                <Link href={`/jobs/${id}/apply`}>
                  
                  <Button className="w-full bg-purple-600 hover:bg-purple-500 text-white font-medium rounded-xl shadow-lg shadow-purple-500/25 transition-all">
                    Apply for this Job
                                  </Button>                       
                              </Link>
                              {!user && <p className="text-xs text-center p-3">Plaese <Link href="/signin" className="text-purple-400 font-medium">Sign in</Link> to apply for jobs</p>}
              </Card.Content>
            </Card>

            {/* Job Info Card */}
            <Card className="bg-white/[0.03] border-purple-500/10">
              <Card.Header>
                <Card.Title className="text-white font-semibold">
                  Job Details
                </Card.Title>
              </Card.Header>
              <Card.Content className="pt-0 space-y-3">
                <InfoRow
                  icon={DollarSign}
                  label="Salary"
                  value={`${Number(job.salaryMin).toLocaleString()} – ${Number(job.salaryMax).toLocaleString()} ${job.currency}`}
                />
                <InfoRow
                  icon={MapPin}
                  label="Location"
                  value={
                    job.isRemote ? "Remote" : `${job.city}, ${job.country}`
                  }
                />
                <InfoRow icon={Clock} label="Job Type" value={job.type} />
                <InfoRow
                  icon={Calendar}
                  label="Deadline"
                  value={new Date(job.deadline).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                />
                <InfoRow
                  icon={Briefcase}
                  label="Category"
                  value={job.category}
                />
                <InfoRow
                  icon={Calendar}
                  label="Posted"
                  value={new Date(job.createdAt).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                />
              </Card.Content>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailsPage;
