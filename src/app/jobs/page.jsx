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

export default async function JobsPage() {
  const jobs = await getJobs();

  return <JobsClient jobs={jobs} />;
}