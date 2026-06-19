"use client";

import { useState } from "react";
import {
  Building2,
  Upload,
  X,
} from "lucide-react";
import {
  Button,
  Form,
  TextField,
  Label,
  Input,
  FieldError,
  toast,
} from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import { redirect, useRouter } from "next/navigation";
import { createCompany } from "@/lib/actions/companies";
import { updateCompany } from "@/lib/api/companies";

const industries = [
  "Technology",
  "Finance",
  "Healthcare",
  "Education",
  "Marketing",
  "E-commerce",
  "Manufacturing",
  "Media",
  "Real Estate",
  "Other",
];

const employeeRanges = [
  "1-10 employees",
  "11-50 employees",
  "51-200 employees",
  "201-500 employees",
  "501-1000 employees",
  "1000+ employees",
];

export default function CompanyForm({
  mode ,
  company , recruiter
}) {
 

  const [industry, setIndustry] = useState(
    company?.industry || ""
  );

  const [employeeRange, setEmployeeRange] = useState(
    company?.employeeRange || ""
  );

  const [logoPreview, setLogoPreview] = useState(
    company?.logo || null
  );

  const [logoFile, setLogoFile] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  const [status, setStatus] = useState({
    type: "",
    message: "",
  });

  const handleLogoChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setLogoFile(file);
    setLogoPreview(URL.createObjectURL(file));
  };

  const uploadToImgbb = async (file) => {
    const formData = new FormData();

    formData.append("image", file);

    const IMGBB_API_KEY = process.env.NEXT_PUBLIC_IMAGE_UPLOAD_API;
    const res = await fetch(
      `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();

    return data.data.url;
  };

  const router = useRouter()
  const handleSubmit = async (e) => {
  e.preventDefault();

  setIsLoading(true);

  setStatus({
    type: "",
    message: "",
  });

  const formData = new FormData(e.currentTarget);

  try {
    let logoUrl = logoPreview;

    if (logoFile) {
      logoUrl = await uploadToImgbb(logoFile);
    }

    const companyData = {
      recruiterId: recruiter?.id,
      name: formData.get("name"),
      industry,
      website: formData.get("website"),
      location: formData.get("location"),
      employeeRange,
      logo: logoUrl,
      description: formData.get("description"),
      status: company?.status || "pending",
    };

   if (mode === "create") {
  const payload = await createCompany(companyData);

  if (payload?.insertedId) {
    const newCompany = {
      ...companyData,
      _id: payload.insertedId,
    };

    console.log(newCompany);

    toast.success("Company profile created successfully!");

    setStatus({
      type: "success",
      message: "Company registered successfully!",
    });
  }
} else {
      const payload = await updateCompany(
        company._id,
        companyData
      );

     if (payload?.modifiedCount > 0) {
        const savedCompany = {
      ...companyData,
      _id: payload.insertedId,
    };
    console.log(savedCompany);      
        toast.success("Company updated successfully!");

        setStatus({
          type: "success",
          message: "Company updated successfully!",
        });
      }
    }
  } catch (error) {
    console.error(error);

    toast.error("Something went wrong. Please try again.");

    setStatus({
      type: "error",
      message: "Something went wrong. Please try again.",
    });
  } finally {
    setIsLoading(false);

   router.push("/dashboard/recruiter/company");
  }
};

  return (
    <div className="w-full max-w-4xl mx-auto px-6 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">
          {mode === "create"
            ? "Register Company"
            : "Edit Company"}
        </h1>

        <p className="text-white/40 text-sm mt-2">
          {mode === "create"
            ? "Enter your company details to start hiring on HireLoop."
            : "Update your company information."}
        </p>
      </div>

      <div className="rounded-2xl border border-purple-500/10 bg-white/[0.03] p-6 md:p-8">
        <Form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">

            <TextField
              isRequired
              name="name"
              defaultValue={company?.name || ""}
              className="w-full"
            >
              <Label className="text-sm text-white/60 mb-1.5 block">
                Company Name
              </Label>

              <Input
                placeholder="e.g. Acme Corp"
                className="bg-white/5 border border-purple-500/10 text-white rounded-xl"
              />

              <FieldError className="text-xs text-red-400 mt-1" />
            </TextField>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm text-white/60">
                Industry / Category
              </label>

              <select
                value={industry}
                onChange={(e) =>
                  setIndustry(e.target.value)
                }
                className="w-full bg-white/5 border border-purple-500/10 text-white rounded-xl px-4 py-3 text-sm outline-none"
              >
                <option
                  value=""
                  disabled
                  className="bg-[#0F1117]"
                >
                  Select industry
                </option>

                {industries.map((item) => (
                  <option
                    key={item}
                    value={item}
                    className="bg-[#0F1117]"
                  >
                    {item}
                  </option>
                ))}
              </select>
            </div>

            <TextField
              name="website"
              defaultValue={company?.website || ""}
              className="w-full"
            >
              <Label className="text-sm text-white/60 mb-1.5 block">
                Website URL
              </Label>

              <Input
                placeholder="https://yourcompany.com"
                className="bg-white/5 border border-purple-500/10 text-white rounded-xl"
              />
            </TextField>

            <TextField
              isRequired
              name="location"
              defaultValue={company?.location || ""}
              className="w-full"
            >
              <Label className="text-sm text-white/60 mb-1.5 block">
                Location
              </Label>

              <Input
                placeholder="City, Country"
                className="bg-white/5 border border-purple-500/10 text-white rounded-xl"
              />

              <FieldError className="text-xs text-red-400 mt-1" />
            </TextField>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm text-white/60">
                Employee Count Range
              </label>

              <select
                value={employeeRange}
                onChange={(e) =>
                  setEmployeeRange(e.target.value)
                }
                className="w-full bg-white/5 border border-purple-500/10 text-white rounded-xl px-4 py-3 text-sm outline-none"
              >
                <option
                  value=""
                  disabled
                  className="bg-[#0F1117]"
                >
                  Select range
                </option>

                {employeeRanges.map((item) => (
                  <option
                    key={item}
                    value={item}
                    className="bg-[#0F1117]"
                  >
                    {item}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm text-white/60">
                Company Logo
              </label>

              <label className="flex items-center gap-3 border border-dashed border-purple-500/20 bg-white/5 hover:bg-white/[0.07] rounded-xl px-4 py-3 cursor-pointer transition-colors">
                {logoPreview ? (
                  <div className="relative">
                    <img
                      src={logoPreview}
                      alt="logo"
                      className="w-10 h-10 rounded-lg object-cover"
                    />

                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        setLogoPreview(null);
                        setLogoFile(null);
                      }}
                      className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center"
                    >
                      <X
                        size={10}
                        className="text-white"
                      />
                    </button>
                  </div>
                ) : (
                  <Upload
                    size={16}
                    className="text-white/30"
                  />
                )}

                <span className="text-white/30 text-xs">
                  {logoPreview
                    ? "Change logo"
                    : "PNG, JPG up to 5MB"}
                </span>

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleLogoChange}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          <div className="w-full mt-4">
            <label className="text-sm text-white/60 block mb-1.5">
              Brief Description
            </label>

            <textarea
              name="description"
              rows={4}
              defaultValue={company?.description || ""}
              placeholder="Tell us about your company..."
              className="w-full bg-white/5 border border-purple-500/10 text-white placeholder-white/20 rounded-xl px-4 py-3 text-sm outline-none resize-none"
            />
          </div>

          {status.message && (
            <div
              className={`w-full mt-4 text-sm px-4 py-3 rounded-xl border ${
                status.type === "success"
                  ? "bg-green-500/10 border-green-500/30 text-green-300"
                  : "bg-red-500/10 border-red-500/30 text-red-300"
              }`}
            >
              {status.message}
            </div>
          )}

          <div className="flex justify-end gap-3 w-full mt-6">
            <Button
              type="submit"
              isDisabled={isLoading}
              className="bg-purple-600 hover:bg-purple-500 text-white px-6"
            >
              {isLoading
                ? "Saving..."
                : mode === "create"
                ? "Register Company"
                : "Save Changes"}
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}