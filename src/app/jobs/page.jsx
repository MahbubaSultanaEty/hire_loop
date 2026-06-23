import JobsClient from "@/components/jobs/JobsClient";
import { getJobs } from "@/lib/api/jobs";
import { CloudGear } from "@gravity-ui/icons";


export const metadata = {
  title: "Browse Jobs | HireLoop",
  description: "Explore thousands of job opportunities across top companies. Filter by location, type, category and salary to find your perfect role.",
  keywords: "jobs, hiring, remote jobs, full-time, part-time, contract, internship, career",
  openGraph: {
    title: "Browse Jobs | HireLoop",
    description: "Explore thousands of job opportunities across top companies.",
    type: "website",
  },
};

export default async function JobsPage({ searchParams }) {

  const sp = await searchParams;
  console.log("search p", sp)

  const query = new URLSearchParams();

  if (sp.search) query.set("search", sp.search);
  if (sp.jobType) query.set("jobType", sp.jobType);
  if (sp.category) query.set("category", sp.category);
  if (sp.isRemote) query.set("isRemote", sp.isRemote);
  if (sp.salary) query.set("salary", sp.salary);
  if (sp.page) query.set("page", sp.page);

  const filters = {
  search: sp.search || "",
  type: sp.jobType || "",
  category: sp.category || "",
  isRemote: sp.isRemote || "",
    salary: sp.salary || "",
  page: Number(sp.page) || 1,
  };
    console.log("query",query.toString())
  const { jobs, total } = await getJobs(query.toString());
  console.log(jobs, total);

  return <JobsClient jobs={jobs} total={total} initialFilters={filters} />;
}