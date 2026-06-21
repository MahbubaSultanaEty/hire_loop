"use client";

import { useState } from "react";
import { Table, Chip, Button } from "@heroui/react";
import { Building2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation"; 
import { updateCompanyStatus } from "@/lib/actions/companies";


const statusConfig = {
  pending: { label: "Pending", class: "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20" },
  approved: { label: "Approved", class: "bg-green-500/10 text-green-400 border border-green-500/20" },
  rejected: { label: "Rejected", class: "bg-red-500/10 text-red-400 border border-red-500/20" },
};

export default function CompanyTable({ companies = [], user}) {
 
  const [loadingId, setLoadingId] = useState(null);
  const router = useRouter(); 
  const handleAction = async (id, action) => {
    setLoadingId(`${id}-${action}`); // লোডিং স্টেট চালু
    try {
      // এপিআই-তে পুরো অবজেক্ট না পাঠিয়ে শুধু পরিবর্তিত স্ট্যাটাস টুকু পাঠাচ্ছি
      const result = await updateCompanyStatus(id, action);
      console.log(`${action} company result:`, result);
      
      
      router.refresh(); 
    } catch (error) {
      console.error(`Failed to ${action} company:`, error);
    } finally {
      setLoadingId(null); 
    }
  };

  return (
    <Table>
      <Table.ScrollContainer>
        <Table.Content aria-label="Company Registrations">
          <Table.Header>
            <Table.Column isRowHeader>Company Name</Table.Column>
            <Table.Column>Recruiter Email</Table.Column>            
            <Table.Column>Industry</Table.Column>
            <Table.Column>Status</Table.Column>
            <Table.Column>Date Submitted</Table.Column>
            <Table.Column>Actions</Table.Column>
          </Table.Header>

          <Table.Body>
            {companies.map((company) => (
              <Table.Row key={company._id}>
                {/* Company Name */}
                <Table.Cell>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl border border-white/10 bg-white/5 flex items-center justify-center overflow-hidden shrink-0">
                      {company.logo ? (
                        <Image src={company.logo} alt={company.name} width={36} height={36} className="object-cover" />
                      ) : (
                        <span className="text-white/40 text-xs font-bold">
                          {company.name?.slice(0, 2).toUpperCase()}
                        </span>
                      )}
                    </div>
                    <span className="text-white font-medium text-sm">{company.name}</span>
                  </div>
                </Table.Cell>

                {/* Recruiter Email */}
                <Table.Cell>
                  <span className="text-white/50 text-sm">{company.recruiterEmail || "—"}</span>
                </Table.Cell>


                {/* Industry */}
                <Table.Cell>
                  <span className="text-white/50 text-sm">{company.industry}</span>
                </Table.Cell>

                {/* Status */}
                <Table.Cell>
                  <Chip size="sm" className={statusConfig[company.status]?.class}>
                    {statusConfig[company.status]?.label}
                  </Chip>
                </Table.Cell>

                {/* Date */}
                <Table.Cell>
                  <span className="text-white/40 text-sm">
                    {new Date(company.createdAt).toLocaleDateString("en-US", {
                      month: "short", day: "2-digit", year: "numeric",
                    })}
                  </span>
                </Table.Cell>

                {/* Actions */}
                <Table.Cell>
                  <div className="flex items-center gap-2">
                    {company.status?.toLowerCase() !== "approved" && (
                      <Button
                        size="sm"
                        
                        isLoading={loadingId === `${company._id}-approved`} 
                        isDisabled={loadingId !== null}
                        onClick={() => handleAction(company._id, "approved")}
                        className="bg-green-500/10 hover:bg-green-500/20 text-green-400 border border-green-500/20 text-xs px-3 rounded-lg"
                      >
                        Approve
                      </Button>
                    )}
                    {company.status?.toLowerCase() !== "rejected" && (
                      <Button
                        size="sm"
                        isLoading={loadingId === `${company._id}-rejected`}
                        isDisabled={loadingId !== null}
                        onClick={() => handleAction(company._id, "rejected")}
                        className="bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 text-xs px-3 rounded-lg"
                      >
                        Reject
                      </Button>
                    )}
                  </div>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Content>
      </Table.ScrollContainer>
    </Table>
  );
}