import JobsClient from "@/components/jobs/JobsClient";
import { getJobs } from "@/lib/api/jobs";


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

  const query = new URLSearchParams();

  if (sp.search) query.set("search", sp.search);
  if (sp.jobType) query.set("jobType", sp.jobType);
  if (sp.category) query.set("category", sp.category);
  if (sp.isRemote) query.set("isRemote", sp.isRemote);
  if (sp.salary) query.set("salary", sp.salary);

  const jobs = await getJobs(query.toString());

  return <JobsClient jobs={jobs} />;
}