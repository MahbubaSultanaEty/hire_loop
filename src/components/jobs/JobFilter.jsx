"use client";

import { useState, useMemo, useEffect } from "react";
import { SearchField } from "@heroui/react";
import { SlidersHorizontal } from "lucide-react";

const jobTypes = ["Full-time", "Part-time", "Contract", "Internship"];
const categories = [
  "Engineering", "Design", "Marketing", "Sales", "Finance",
  "HR", "Operations", "Product", "Data", "Customer Support",
];
const salaryRanges = [
  { label: "Any", value: "" },
  { label: "Under $50K", value: "0-50000" },
  { label: "$50K – $100K", value: "50000-100000" },
  { label: "$100K – $150K", value: "100000-150000" },
  { label: "$150K+", value: "150000-999999" },
];

const selectClass = "w-full bg-white/5 border border-purple-500/10 text-white/60 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-purple-500/40 transition-colors appearance-none cursor-pointer";

export default function JobFilter({ onFilterChange , filters}) {
  const [search, setSearch] = useState(filters.search || "");
  const [type, setType] = useState(filters.type || "");
  const [category, setCategory] = useState(filters.category || "");
  const [isRemote, setIsRemote] = useState(filters.isRemote ||"");
  const [salary, setSalary] = useState(filters.salary || "");



  const handleChange = (key, value) => {
    const updated = { search, type, category, isRemote, salary, [key]: value };
    if (key === "search") setSearch(value);
    if (key === "type") setType(value);
    if (key === "category") setCategory(value);
    if (key === "isRemote") setIsRemote(value);
    if (key === "salary") setSalary(value);
    onFilterChange?.(updated);
  };

  

  const handleReset = () => {
    setSearch(""); setType(""); setCategory(""); setIsRemote(""); setSalary("");
    onFilterChange?.({ search: "", type: "", category: "", isRemote: "", salary: "" });
  };

  const hasFilter = search || type || category || isRemote || salary;

  return (
    <div className="rounded-2xl border border-purple-500/10 bg-white/[0.03] p-5 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-white/60 text-sm font-medium">
          <SlidersHorizontal size={15} />
          Filter Jobs
        </div>
        {hasFilter && (
          <button
            onClick={handleReset}
            className="text-xs text-purple-400 hover:text-purple-300 transition-colors"
          >
            Reset all
          </button>
        )}
      </div>

      {/* Search */}
      <SearchField
        value={search}
        onChange={(val) => handleChange("search", val)}
        className="w-full"
      >
        <SearchField.Group className="bg-white/5 border border-purple-500/10 rounded-xl px-3">
          <SearchField.SearchIcon className="text-white/30" />
          <SearchField.Input
            placeholder="Search job title or company..."
            className="text-white placeholder-white/20 text-sm py-2.5"
          />
          <SearchField.ClearButton className="text-white/30 hover:text-white" />
        </SearchField.Group>
      </SearchField>

      {/* Filters */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <select value={type} onChange={(e) => handleChange("type", e.target.value)} className={selectClass}>
          <option value="" className="bg-[#0F1117]">Job Type</option>
          {jobTypes.map((t) => <option key={t} value={t} className="bg-[#0F1117]">{t}</option>)}
        </select>

        <select value={category} onChange={(e) => handleChange("category", e.target.value)} className={selectClass}>
          <option value="" className="bg-[#0F1117]">Category</option>
          {categories.map((c) => <option key={c} value={c} className="bg-[#0F1117]">{c}</option>)}
        </select>

        <select value={isRemote} onChange={(e) => handleChange("isRemote", e.target.value)} className={selectClass}>
          <option value="" className="bg-[#0F1117]">Location</option>
          <option value="true" className="bg-[#0F1117]">Remote</option>
          <option value="false" className="bg-[#0F1117]">On-site</option>
        </select>

        <select value={salary} onChange={(e) => handleChange("salary", e.target.value)} className={selectClass}>
          <option value="" className="bg-[#0F1117]">Salary Range</option>
          {salaryRanges.filter(s => s.value).map((s) => (
            <option key={s.value} value={s.value} className="bg-[#0F1117]">{s.label}</option>
          ))}
        </select>
      </div>
    </div>
  );
}