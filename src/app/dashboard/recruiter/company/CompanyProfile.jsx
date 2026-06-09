"use client";

import { authClient } from "@/lib/auth-client";
import {
  Building2,
  MapPin,
  Globe,
  Users,
  Pencil,
  Plus,
} from "lucide-react";
import { Button, Chip } from "@heroui/react";
import Link from "next/link";

const statusConfig = {
  pending: {
    label: "Pending Review",
    class:
      "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20",
  },
  approved: {
    label: "Approved",
    class:
      "bg-green-500/10 text-green-400 border border-green-500/20",
  },
  rejected: {
    label: "Rejected",
    class:
      "bg-red-500/10 text-red-400 border border-red-500/20",
  },
};

const mockCompany = null;

export default function CompanyProfile({recruiter}) {
  

  const company = mockCompany;

  return (
    <div className="w-full px-6 py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white">
            My Company
          </h1>
          <p className="text-white/40 text-sm mt-1">
            Manage your registered company.
          </p>
        </div>

        {!company && (
          <Link href="/dashboard/recruiter/company/register">
  <Button className="bg-purple-600 text-white">
    Register Company
  </Button>
</Link>
        )}
      </div>

      {!company ? (
        <div className="rounded-2xl border border-dashed border-purple-500/20 bg-white/[0.02] flex flex-col items-center justify-center py-24 text-center">
          <div className="w-16 h-16 rounded-2xl bg-purple-500/10 flex items-center justify-center mb-4">
            <Building2 size={28} className="text-purple-400" />
          </div>

          <h2 className="text-white font-semibold text-lg mb-2">
            No company registered
          </h2>

          <p className="text-white/40 text-sm max-w-sm mb-6">
            Register your company to start posting jobs and finding the best
            candidates.
          </p>

          <Link href="/dashboard/recruiter/company/register">
  <Button className="bg-purple-600 text-white">
    Register Company
  </Button>
</Link>
        </div>
      ) : (
        <div className="rounded-2xl border border-purple-500/10 bg-white/[0.03] p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-start gap-6">
            <div className="w-20 h-20 rounded-2xl border border-purple-500/10 bg-white/5 flex items-center justify-center overflow-hidden shrink-0">
              {company.logo ? (
                <img
                  src={company.logo}
                  alt={company.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <Building2 size={28} className="text-white/20" />
              )}
            </div>

            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3 mb-1">
                <h2 className="text-xl font-bold text-white">
                  {company.name}
                </h2>

                <Chip
                  size="sm"
                  className={statusConfig[company.status]?.class}
                >
                  {statusConfig[company.status]?.label}
                </Chip>
              </div>

              <p className="text-white/40 text-sm mb-4">
                {company.industry}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                <div className="flex items-center gap-2 text-white/50 text-sm">
                  <Globe size={14} className="text-white/30" />
                  <a
                    href={company.website}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-purple-400 transition-colors truncate"
                  >
                    {company.website}
                  </a>
                </div>

                <div className="flex items-center gap-2 text-white/50 text-sm">
                  <MapPin size={14} className="text-white/30" />
                  {company.location}
                </div>

                <div className="flex items-center gap-2 text-white/50 text-sm">
                  <Users size={14} className="text-white/30" />
                  {company.employeeRange}
                </div>
              </div>

              {company.description && (
                <p className="text-white/40 text-sm leading-relaxed border-t border-white/5 pt-4">
                  {company.description}
                </p>
              )}
            </div>

            <Button
              as={Link}
              href="/recruiter/company/edit"
              className="flex items-center gap-2 border border-purple-500/20 bg-purple-500/5 hover:bg-purple-500/10 text-purple-400 text-sm px-4 py-2 rounded-xl"
            >
              <Pencil size={14} />
              Edit
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}