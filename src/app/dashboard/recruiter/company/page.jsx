import React from 'react';
import { getUserSession } from '@/lib/core/session';
import CompanyProfile from './CompanyProfile';
import { getRecruiterCompany } from '@/lib/api/companies';

const CompanyPage = async() => {

    const user = await getUserSession();
    const companies = await getRecruiterCompany(user?.id)
    // console.log("recruiter companies", companies);
    console.log("user sesion in th compnay page", user);
    return (
        <div>
            <CompanyProfile recruiter={ user} companies={companies} />
        </div>
    );
};

export default CompanyPage;