import RecruiterDashboard from '@/components/dashboard/RecruiterDashboard';
import React from 'react';
export const metadata = {
  title: "Recruiter Dashboard | HireLoop",
  description: "Manage your job postings, track applications, and find the best candidates on HireLoop.",
};

const RecruiterDashboardPage = () => {
    return (
        <div>
           <RecruiterDashboard/>
        </div>
    );
};

export default RecruiterDashboardPage;