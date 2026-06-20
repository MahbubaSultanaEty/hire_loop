// app/dashboard/admin/companies/page.jsx
import CompanyTable from '@/components/dashboard/CompaniesTable';
import { getCompanies } from '@/lib/api/companies';
import { getCompanyJobs } from '@/lib/api/jobs';
import { getUserSession } from '@/lib/core/session';
import { Card, Chip } from '@heroui/react';
import { Building2, CheckCircle2, XCircle, Clock } from 'lucide-react';

export const metadata = {
  title: "Company Registrations | Admin | HireLoop",
  description: "Review and manage company registration requests.",
};

export default async function AdminCompaniesPage() {
    const companies = await getCompanies();
  const user = await getUserSession();
  
  const pending = companies.filter((c) => c.status === "pending").length;
  const approved = companies.filter((c) => c.status === "approved").length;
  const rejected = companies.filter((c) => c.status === "rejected").length;

  return (
    <div className="w-full px-6 py-10 space-y-6">

      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-white">Company Registrations</h1>
        <p className="text-white/40 text-sm mt-1">
          Review and manage corporate entity access requests for the HireLoop ecosystem.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-white/[0.03] border-purple-500/10">
          <Card.Content className="flex items-center gap-4 py-4">
            <div className="w-10 h-10 rounded-xl bg-yellow-500/10 flex items-center justify-center shrink-0">
              <Clock size={18} className="text-yellow-400" />
            </div>
            <div className="flex items-center flex-col ">
              <p className="text-white/40 text-xs">Pending Review</p>
              <p className="text-2xl font-bold text-white ">{pending}</p>
            </div>
          </Card.Content>
        </Card>

        <Card className="bg-white/[0.03] border-purple-500/10">
          <Card.Content className="flex items-center gap-4 py-4">
            <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center shrink-0">
              <CheckCircle2 size={18} className="text-green-400" />
            </div>
            <div className="flex items-center flex-col ">
              <p className="text-white/40 text-xs">Approved Partners</p>
              <p className="text-2xl font-bold text-white ">{approved}</p>
            </div>
          </Card.Content>
        </Card>

        <Card className="bg-white/[0.03] border-purple-500/10">
          <Card.Content className="flex items-center gap-4 py-4">
            <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center shrink-0">
              <XCircle size={18} className="text-red-400" />
            </div>
            <div className="flex items-center flex-col ">
              <p className="text-white/40 text-xs">Total Rejections</p>
              <p className="text-2xl font-bold text-white">{rejected}</p>
            </div>
          </Card.Content>
        </Card>
      </div>

      {/* Table */}
      <Card className="bg-white/[0.03] border-purple-500/10">
        <Card.Header>
          <div className="flex items-center justify-between w-full">
            <Card.Title className="text-white font-semibold">
              All Companies
              <span className="text-white/30 text-sm font-normal ml-2">
                {companies.length} total
              </span>
            </Card.Title>
          </div>
        </Card.Header>
        <Card.Content className="pt-0">
          {companies.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-14 h-14 rounded-2xl bg-purple-500/10 flex items-center justify-center mb-4">
                <Building2 size={24} className="text-purple-400" />
              </div>
              <p className="text-white/40 text-sm">No companies registered yet.</p>
            </div>
          ) : (
            <CompanyTable companies={companies} user={user} />
          )}
        </Card.Content>
      </Card>

    </div>
  );
}