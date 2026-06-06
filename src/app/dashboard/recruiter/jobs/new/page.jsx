"use client";

import { useState } from "react";
import {
  Form,
  TextField,
  Label,
  FieldError,
  Button,
  InputGroup,
} from "@heroui/react";
import {
  Briefcase,
  MapPin,
  DollarSign,
  Calendar,
  Building2,
  FileText,
  Star,
  ChevronRight,
  Globe,
} from "lucide-react";

const jobCategories = [
  "Engineering", "Design", "Marketing", "Sales", "Finance",
  "HR", "Operations", "Product", "Data", "Customer Support",
];

const jobTypes = ["Full-time", "Part-time", "Contract", "Internship"];
const currencies = ["USD", "BDT", "EUR", "GBP", "INR"];

export default function PostJobForm() {
  const [isRemote, setIsRemote] = useState(false);
  const [jobType, setJobType] = useState("Full-time");
  const [currency, setCurrency] = useState("USD");
  const [category, setCategory] = useState("");

  return (
    <div className="w-full px-6 py-10">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-white">Post a New Job</h1>
        <p className="text-white/40 text-sm mt-1">Fill in the details below to publish your job listing.</p>
      </div>

      <Form className="space-y-8">

        {/* Section 1 — Job Info */}
        <section className="rounded-2xl border border-purple-500/10 bg-white/[0.03] p-6 space-y-6">
          <div>
            <h2 className="text-lg font-semibold text-white flex items-center gap-2">
              <Briefcase size={18} className="text-purple-400" />
              Job Info
            </h2>
            <p className="text-white/40 text-xs mt-1">Basic information about the position.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Job Title */}
            <TextField isRequired name="title" className="w-full md:col-span-2">
              <Label className="text-sm text-white/60 mb-1.5 block">Job Title</Label>
              <InputGroup className="w-full">
                <InputGroup.Prefix className="px-3 text-white/30">
                  <Briefcase size={15} />
                </InputGroup.Prefix>
                <InputGroup.Input placeholder="e.g. Senior Frontend Developer" className="bg-white/5 border border-purple-500/10 text-white placeholder-white/20 rounded-xl" />
              </InputGroup>
              <FieldError className="text-xs text-red-400 mt-1" />
            </TextField>

            {/* Category */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm text-white/60">Job Category</label>
              <select
                name="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-white/5 border border-purple-500/10 text-white rounded-xl px-4 py-2.5 text-sm outline-none focus:border-purple-500/40 transition-colors"
              >
                <option value="" disabled className="bg-[#0F1117]">Select category</option>
                {jobCategories.map((c) => (
                  <option key={c} value={c} className="bg-[#0F1117]">{c}</option>
                ))}
              </select>
            </div>

            {/* Job Type */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm text-white/60">Job Type</label>
              <div className="flex flex-wrap gap-2">
                {jobTypes.map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setJobType(type)}
                    className={`px-4 py-2 rounded-xl text-sm border transition-all ${
                      jobType === type
                        ? "bg-purple-600 border-purple-500 text-white"
                        : "bg-white/5 border-purple-500/10 text-white/50 hover:text-white hover:border-purple-500/30"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Salary Min */}
            <TextField name="salaryMin" className="w-full">
              <Label className="text-sm text-white/60 mb-1.5 block">Min Salary</Label>
              <InputGroup className="w-full">
                <InputGroup.Prefix className="px-3 text-white/30">
                  <DollarSign size={15} />
                </InputGroup.Prefix>
                <InputGroup.Input type="number" placeholder="e.g. 50000" className="bg-white/5 border border-purple-500/10 text-white placeholder-white/20 rounded-xl" />
              </InputGroup>
            </TextField>

            {/* Salary Max */}
            <TextField name="salaryMax" className="w-full">
              <Label className="text-sm text-white/60 mb-1.5 block">Max Salary</Label>
              <InputGroup className="w-full">
                <InputGroup.Prefix className="px-3 text-white/30">
                  <DollarSign size={15} />
                </InputGroup.Prefix>
                <InputGroup.Input type="number" placeholder="e.g. 80000" className="bg-white/5 border border-purple-500/10 text-white placeholder-white/20 rounded-xl" />
              </InputGroup>
            </TextField>

            {/* Currency */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm text-white/60">Currency</label>
              <select
                name="currency"
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="w-full bg-white/5 border border-purple-500/10 text-white rounded-xl px-4 py-2.5 text-sm outline-none focus:border-purple-500/40 transition-colors"
              >
                {currencies.map((c) => (
                  <option key={c} value={c} className="bg-[#0F1117]">{c}</option>
                ))}
              </select>
            </div>

            {/* Deadline */}
            <TextField name="deadline" className="w-full">
              <Label className="text-sm text-white/60 mb-1.5 block">Application Deadline</Label>
              <InputGroup className="w-full">
                <InputGroup.Prefix className="px-3 text-white/30">
                  <Calendar size={15} />
                </InputGroup.Prefix>
                <InputGroup.Input type="date" className="bg-white/5 border border-purple-500/10 text-white rounded-xl" />
              </InputGroup>
            </TextField>

            {/* Remote Toggle */}
            <div className="flex flex-col gap-1.5 md:col-span-2">
              <label className="text-sm text-white/60">Location</label>
              <div className="flex items-center gap-3 mb-3">
                <button
                  type="button"
                  onClick={() => setIsRemote(!isRemote)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm border transition-all ${
                    isRemote
                      ? "bg-purple-600 border-purple-500 text-white"
                      : "bg-white/5 border-purple-500/10 text-white/50 hover:text-white"
                  }`}
                >
                  <Globe size={14} />
                  Remote
                </button>
                {isRemote && <span className="text-xs text-white/30">Location fields disabled for remote jobs</span>}
              </div>

              {!isRemote && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <TextField name="city" className="w-full">
                    <Label className="text-sm text-white/60 mb-1.5 block">City</Label>
                    <InputGroup className="w-full">
                      <InputGroup.Prefix className="px-3 text-white/30">
                        <MapPin size={15} />
                      </InputGroup.Prefix>
                      <InputGroup.Input placeholder="e.g. Dhaka" className="bg-white/5 border border-purple-500/10 text-white placeholder-white/20 rounded-xl" />
                    </InputGroup>
                  </TextField>

                  <TextField name="country" className="w-full">
                    <Label className="text-sm text-white/60 mb-1.5 block">Country</Label>
                    <InputGroup className="w-full">
                      <InputGroup.Prefix className="px-3 text-white/30">
                        <MapPin size={15} />
                      </InputGroup.Prefix>
                      <InputGroup.Input placeholder="e.g. Bangladesh" className="bg-white/5 border border-purple-500/10 text-white placeholder-white/20 rounded-xl" />
                    </InputGroup>
                  </TextField>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Section 2 — Job Description */}
        <section className="rounded-2xl border border-purple-500/10 bg-white/[0.03] p-6 space-y-6">
          <div>
            <h2 className="text-lg font-semibold text-white flex items-center gap-2">
              <FileText size={18} className="text-purple-400" />
              Job Description
            </h2>
            <p className="text-white/40 text-xs mt-1">Describe the role in detail.</p>
          </div>

          <div className="space-y-5">
            {/* Responsibilities */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm text-white/60">
                Responsibilities <span className="text-red-400">*</span>
              </label>
              <textarea
                name="responsibilities"
                rows={5}
                placeholder="List the key responsibilities of this role..."
                className="w-full bg-white/5 border border-purple-500/10 text-white placeholder-white/20 rounded-xl px-4 py-3 text-sm outline-none focus:border-purple-500/40 transition-colors resize-none"
              />
            </div>

            {/* Requirements */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm text-white/60">
                Requirements <span className="text-red-400">*</span>
              </label>
              <textarea
                name="requirements"
                rows={5}
                placeholder="List the skills, experience, and qualifications required..."
                className="w-full bg-white/5 border border-purple-500/10 text-white placeholder-white/20 rounded-xl px-4 py-3 text-sm outline-none focus:border-purple-500/40 transition-colors resize-none"
              />
            </div>

            {/* Benefits */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm text-white/60">
                Benefits <span className="text-white/30 text-xs">(optional)</span>
              </label>
              <textarea
                name="benefits"
                rows={4}
                placeholder="e.g. Health insurance, remote work, flexible hours..."
                className="w-full bg-white/5 border border-purple-500/10 text-white placeholder-white/20 rounded-xl px-4 py-3 text-sm outline-none focus:border-purple-500/40 transition-colors resize-none"
              />
            </div>
          </div>
        </section>

        {/* Section 3 — Company */}
        <section className="rounded-2xl border border-purple-500/10 bg-white/[0.03] p-6 space-y-4">
          <div>
            <h2 className="text-lg font-semibold text-white flex items-center gap-2">
              <Building2 size={18} className="text-purple-400" />
              Company
            </h2>
            <p className="text-white/40 text-xs mt-1">Auto-filled from your registered company.</p>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-xl border border-purple-500/10 bg-white/[0.02]">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
              <Building2 size={18} className="text-purple-400" />
            </div>
            <div>
              <p className="text-white text-sm font-medium">Your Company Name</p>
              <p className="text-white/30 text-xs">Plan: Growth · 4 of 10 active jobs used</p>
            </div>
            <div className="ml-auto flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-green-400" />
              <span className="text-green-400 text-xs">Approved</span>
            </div>
          </div>
        </section>

        {/* Submit */}
        <div className="flex justify-end">
          <Button
            type="submit"
            className="bg-purple-600 hover:bg-purple-500 text-white font-medium px-8 py-2.5 rounded-xl shadow-lg shadow-purple-500/25 transition-all flex items-center gap-2"
          >
            Publish Job
            <ChevronRight size={16} />
          </Button>
        </div>

      </Form>
    </div>
  );
}