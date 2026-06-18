import {
  Card,
  Chip,
  Button,
} from "@heroui/react";
import {
  FileText,
  Globe,
  Calendar,
  Briefcase,
} from "lucide-react";

import { getApplicationByApplicant } from "@/lib/api/applications";
import { getUserSession } from "@/lib/core/session";

const statusColors = {
  pending: "warning",
  accepted: "success",
  rejected: "danger",
};

const ApplicationsPage = async () => {
  const user = await getUserSession();
  const applications = await getApplicationByApplicant(user?.id);

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">
          My Applications
        </h1>
        <p className="text-white/40 mt-2">
          Track all your submitted job applications.
        </p>
      </div>

      {applications?.length === 0 ? (
        <Card className="bg-white/[0.03] border border-purple-500/10">
          <div className="py-16 px-6 text-center">
            <Briefcase
              size={48}
              className="mx-auto text-white/20 mb-4"
            />
            <h3 className="text-xl font-semibold text-white mb-2">
              No Applications Yet
            </h3>
            <p className="text-white/40 max-w-md mx-auto">
              You haven&apos;t applied to any jobs yet. Start exploring opportunities and submit your first application.
            </p>
          </div>
        </Card>
      ) : (
        // লিস্টের গ্যাপ কমানো হয়েছে
        <div className="space-y-3">
          {applications.map((application) => (
            <Card
              key={application._id}
              className="bg-white/[0.03] border border-purple-500/10 hover:border-purple-500/20 transition-all"
            >
              {/* Padding কম করে ফ্লেক্স রো (Row) করা হয়েছে */}
              <div className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                
                {/* বাম পাশ: ইনফরমেশন গ্রুপ */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8 flex-1">
                  <div>
                    <h2 className="text-base font-semibold text-white">
                      Applied For #{application?.jobTitle}
                    </h2>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1 text-xs text-white/40">
                      <span className="flex items-center gap-1">
                        <Calendar size={12} />
                        {new Date(application.appliedAt).toLocaleDateString()}
                      </span>
                      <span>•</span>
                      <span>Company Name: {application.companyName}</span>
                    </div>
                  </div>

                  {/* অ্যাপ্লিক্যান্টের নাম ও ইমেইল এক লাইনে হালকা করে দেখানো */}
                  <div className="text-xs text-white/50 border-t sm:border-t-0 sm:border-l border-white/10 pt-2 sm:pt-0 sm:pl-6">
                    <p className="font-medium text-white/80">{application.applicantName}</p>
                    <p className="text-white/40">{application.applicantEmail}</p>
                  </div>
                </div>

                {/* ডান পাশ: স্ট্যাটাস চিপ এবং অ্যাকশন বাটন */}
                <div className="flex items-center flex-wrap gap-3 md:justify-end">
                  <Chip
                    color={statusColors[application.status] || "default"}
                    variant="flat"
                    className="capitalize text-xs h-7"
                  >
                    {application.status}
                  </Chip>

                  <Button
                    as="a"
                    href={application.resumeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    startContent={<FileText size={14} />}
                    size="sm"
                    className="bg-purple-600 hover:bg-purple-500 text-white text-xs h-8"
                  >
                    Resume
                  </Button>

                  {application.portfolioLink && (
                    <Button
                      as="a"
                      href={application.portfolioLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="bordered"
                      startContent={<Globe size={14} />}
                      size="sm"
                      className="border-white/10 text-white text-xs h-8"
                    >
                      Portfolio
                    </Button>
                  )}
                </div>
              </div>

              {/* কভার নোট থাকলে তা নিচে ১ লাইনে ছোট করে দেখাবে */}
              {application.coverNote && (
                <div className="px-4 pb-3 pt-0 border-t border-white/[0.02]">
                  <p className="text-xs text-white/40 italic truncate max-w-3xl mt-2">
                    <span className="font-medium not-italic text-white/50">Cover Note:</span> &ldquo;{application.coverNote}&rdquo;
                  </p>
                </div>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ApplicationsPage;