import {
  Card,
  Chip,
  Input,
  Button,
  Table,
} from "@heroui/react";
import {
  Search,
  FileText,
  Globe,
  Briefcase,
  Clock,
  CheckCircle,
  XCircle,
} from "lucide-react";

import { getApplicationByApplicant } from "@/lib/api/applications";
import { getUserSession } from "@/lib/core/session";

export default async function ApplicationsPage() {
  const user = await getUserSession();
  const applications = await getApplicationByApplicant(user?.id);

  const pendingCount = applications.filter(
    (app) => app.status === "pending"
  ).length;

  const acceptedCount = applications.filter(
    (app) => app.status === "accepted"
  ).length;

  const rejectedCount = applications.filter(
    (app) => app.status === "rejected"
  ).length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">
          My Applications
        </h1>

        <p className="text-white/40 mt-2">
          Track your job applications and hiring progress in real-time.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-white/[0.03] border border-purple-500/10">
          <div className="p-5">
            <p className="text-white/40 text-sm">
              Total Applied
            </p>

            <h3 className="text-3xl font-bold text-white mt-2">
              {applications.length}
            </h3>
          </div>
        </Card>

        <Card className="bg-white/[0.03] border border-yellow-500/20">
          <div className="p-5">
            <p className="text-white/40 text-sm">
              Pending
            </p>

            <h3 className="text-3xl font-bold text-yellow-400 mt-2">
              {pendingCount}
            </h3>
          </div>
        </Card>

        <Card className="bg-white/[0.03] border border-green-500/20">
          <div className="p-5">
            <p className="text-white/40 text-sm">
              Accepted
            </p>

            <h3 className="text-3xl font-bold text-green-400 mt-2">
              {acceptedCount}
            </h3>
          </div>
        </Card>

        <Card className="bg-white/[0.03] border border-red-500/20">
          <div className="p-5">
            <p className="text-white/40 text-sm">
              Rejected
            </p>

            <h3 className="text-3xl font-bold text-red-400 mt-2">
              {rejectedCount}
            </h3>
          </div>
        </Card>
      </div>

      {/* Search */}
      {/* <Card className="bg-white/[0.03] border border-purple-500/10">
        <div className="p-4">
          <div className="relative">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 z-10"
            />

            <Input
              placeholder="Search applications..."
              className="pl-8"
            />
          </div>
        </div>
      </Card> */}

      {/* Table */}
      <Card className="bg-white/[0.03] border border-purple-500/10">
        <div className="p-2">
          <Table>
            <Table.ScrollContainer>
              <Table.Content
                aria-label="Applications"
                className="min-w-[900px]"
              >
                <Table.Header>
                  <Table.Column isRowHeader>
                    JOB
                  </Table.Column>

                  <Table.Column>
                    COMPANY
                  </Table.Column>

                  <Table.Column>
                    APPLIED
                  </Table.Column>

                  <Table.Column>
                    STATUS
                  </Table.Column>

                  <Table.Column>
                    RESUME
                  </Table.Column>

                  <Table.Column>
                    PORTFOLIO
                  </Table.Column>
                </Table.Header>

                <Table.Body>
                  {applications.map((application) => (
                    <Table.Row key={application._id}>
                      <Table.Cell>
                        <div>
                          <p className="font-medium text-white">
                            {application.jobTitle}
                          </p>

                          <p className="text-xs text-white/40">
                            {application.applicantEmail}
                          </p>
                        </div>
                      </Table.Cell>

                      <Table.Cell>
                        <span className="text-white/70">
                          {application.companyName}
                        </span>
                      </Table.Cell>

                      <Table.Cell>
                        <div className="flex items-center gap-2 text-white/50 text-sm">
                          <Clock size={14} />
                          {new Date(
                            application.appliedAt
                          ).toLocaleDateString()}
                        </div>
                      </Table.Cell>

                      <Table.Cell>
                        {application.status === "accepted" ? (
                          <div className="flex items-center gap-1">
                            <CheckCircle
                              size={12}
                              className="text-green-400"
                            />
                            <Chip
                              color="success"
                              variant="flat"
                            >
                              Accepted
                            </Chip>
                          </div>
                        ) : application.status === "rejected" ? (
                          <div className="flex items-center gap-1">
                            <XCircle
                              size={12}
                              className="text-red-400"
                            />
                            <Chip
                              color="danger"
                              variant="flat"
                            >
                              Rejected
                            </Chip>
                          </div>
                        ) : (
                          <Chip
                            color="warning"
                            variant="flat"
                          >
                            Pending
                          </Chip>
                        )}
                      </Table.Cell>

                      <Table.Cell>
                        <Button
                          as="a"
                          href={application.resumeLink}
                          target="_blank"
                          size="sm"
                          variant="flat"
                          color="secondary"
                        >
                          <FileText size={14} />
                          Resume
                        </Button>
                      </Table.Cell>

                      <Table.Cell>
                        {application.portfolioLink ? (
                          <Button
                            as="a"
                            href={application.portfolioLink}
                            target="_blank"
                            size="sm"
                            variant="flat"
                          >
                            <Globe size={14} />
                            Portfolio
                          </Button>
                        ) : (
                          <span className="text-white/30 text-sm">
                            N/A
                          </span>
                        )}
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table.Content>
            </Table.ScrollContainer>
          </Table>
        </div>
      </Card>

      {/* Empty State */}
      {applications.length === 0 && (
        <Card className="bg-white/[0.03] border border-purple-500/10">
          <div className="p-16 text-center">
            <Briefcase
              size={48}
              className="mx-auto text-white/20 mb-4"
            />

            <h3 className="text-xl font-semibold text-white">
              No Applications Yet
            </h3>

            <p className="text-white/40 mt-2">
              Start applying for jobs to track them here.
            </p>
          </div>
        </Card>
      )}
    </div>
  );
}