import React from 'react';
import { getUserSession } from '@/lib/core/session';
import CompanyProfile from './CompanyProfile';

const CompanyPage = async() => {

    const user = await getUserSession();
    console.log("user sesion in th compnay page", user);
    return (
        <div>
            <CompanyProfile recruiter={ user} />
        </div>
    );
};

export default CompanyPage;