"use client";

import { useState } from "react";
import {
  Card, Chip, Button, Form, TextField, Label, Input, FieldError,
} from "@heroui/react";
import { Building2, FileText, Globe, Send, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import { submitApplication } from "@/lib/actions/applications";

export default function JobApply({ job, applicant }) {
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus({ type: "", message: "" });

    const formData = new FormData(e.currentTarget);

    const applicationData = {
      jobId: job?._id,
      applicantId: applicant?.id,
      applicantName: applicant?.name,
      applicantEmail: applicant?.email,
      resumeLink: formData.get("resumeLink"),
      portfolioLink: formData.get("portfolioLink"),
      coverNote: formData.get("coverNote"),
      appliedAt: new Date().toISOString(),
      status: "pending",
    };

    try {
      console.log(applicationData);
      // TODO: POST /api/applications
        const res= await submitApplication(applicationData)
      setStatus({ type: "success", message: "Application submitted successfully!" });
    } catch {
      setStatus({ type: "error", message: "Something went wrong. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0F1117] px-6 py-10 mt-20">
      <div className="max-w-2xl mx-auto space-y-6">

        {/* Job Summary */}
        <Card className="bg-white/[0.03] border-purple-500/10">
          <Card.Content className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl border border-white/10 bg-white/5 flex items-center justify-center overflow-hidden shrink-0">
              {job?.companyLogo ? (
                <Image src={job.companyLogo} alt={job.companyName} width={56} height={56} className="object-cover" />
              ) : (
                <Building2 size={22} className="text-white/20" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <Card.Title className="text-white text-lg font-semibold truncate">{job?.title}</Card.Title>
              <Card.Description className="text-white/40 text-sm">{job?.companyName}</Card.Description>
            </div>
            <Chip size="sm" className="bg-purple-500/10 text-purple-300 border border-purple-500/20 shrink-0">
              {job?.type}
            </Chip>
          </Card.Content>
        </Card>

        {/* Application Form */}
        <Card className="bg-white/[0.03] border-purple-500/10">
          <Card.Header>
            <Card.Title className="text-white font-semibold text-lg">Apply for this position</Card.Title>
            <Card.Description className="text-white/40 text-sm">
              Fill in the details below to submit your application.
            </Card.Description>
          </Card.Header>

          <Card.Content className="pt-0">
            <Form onSubmit={handleSubmit} className="space-y-5">

              {/* Applicant info (read-only display) */}
              <div className="rounded-xl border border-purple-500/10 bg-white/[0.02] p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-cyan-500 flex items-center justify-center text-white text-sm font-semibold shrink-0">
                  {applicant?.name?.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="text-white text-sm font-medium">{applicant?.name}</p>
                  <p className="text-white/40 text-xs">{applicant?.email}</p>
                </div>
              </div>

              {/* Resume Link */}
              <TextField
                isRequired
                name="resumeLink"
                type="url"
                className="w-full"
                validate={(value) =>
                  value.startsWith("http") ? null : "Please enter a valid URL"
                }
              >
                <Label className="text-sm text-white/60 mb-1.5 flex items-center gap-1.5">
                  <FileText size={14} className="text-purple-400" />
                  Resume Link
                </Label>
                <Input
                  placeholder="https://drive.google.com/your-resume"
                  className="bg-white/5 border border-purple-500/10 text-white placeholder-white/20 rounded-xl"
                />
                <FieldError className="text-xs text-red-400 mt-1" />
              </TextField>

              {/* Portfolio / Website */}
              <TextField name="portfolioLink" type="url" className="w-full">
                <Label className="text-sm text-white/60 mb-1.5 flex items-center gap-1.5">
                  <Globe size={14} className="text-purple-400" />
                  Portfolio / Website
                  <span className="text-white/30 text-xs font-normal ml-1">(optional)</span>
                </Label>
                <Input
                  placeholder="https://yourportfolio.com"
                  className="bg-white/5 border border-purple-500/10 text-white placeholder-white/20 rounded-xl"
                />
              </TextField>

              {/* Why hire me */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm text-white/60 flex items-center gap-1.5">
                  <CheckCircle2 size={14} className="text-purple-400" />
                  Why should we hire you?
                </label>
                              <textarea                               
                  name="coverNote"
                  required
                  rows={5}
                  placeholder="Tell us why you're a great fit for this role..."
                  className="w-full bg-white/5 border border-purple-500/10 text-white placeholder-white/20 rounded-xl px-4 py-3 text-sm outline-none focus:border-purple-500/40 transition-colors resize-none"
                />
              </div>

              {status.message && (
                <div className={`text-sm px-4 py-3 rounded-xl border ${
                  status.type === "success"
                    ? "bg-green-500/10 border-green-500/30 text-green-300"
                    : "bg-red-500/10 border-red-500/30 text-red-300"
                }`}>
                  {status.message}
                </div>
              )}

              <Button
                type="submit"
                isDisabled={isLoading}
                className="w-full bg-purple-600 hover:bg-purple-500 text-white font-medium py-2.5 rounded-xl shadow-lg shadow-purple-500/25 transition-all flex items-center justify-center gap-2"
              >
                <Send size={15} />
                {isLoading ? "Submitting..." : "Submit Application"}
              </Button>
            </Form>
          </Card.Content>
        </Card>

      </div>
    </div>
  );
}