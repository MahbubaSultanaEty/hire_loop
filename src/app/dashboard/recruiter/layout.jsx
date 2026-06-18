import {  requireRole } from "@/lib/core/session";

export const metadata = {
  title: "Recruiter Dashboard | HireLoop",
  description:
    "Manage your company, post jobs, track applicants, and streamline your hiring process from the Recruiter Dashboard.",
};

const RecruiterLayout = async({ children }) => {
    await requireRole('recruiter')
    return children
};

export default RecruiterLayout;