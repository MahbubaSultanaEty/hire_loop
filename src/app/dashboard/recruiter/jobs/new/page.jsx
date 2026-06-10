import React from 'react';
import PostJobForm from './PostJobForm';
import { getLoggedInRecruiterCompany } from '@/lib/api/companies';

const PostJobPage = async() => {

const companies= await getLoggedInRecruiterCompany()
    const company = companies[0]
    // console.log(company);
    return (
        <div>
            <PostJobForm company={ company} />
        </div>
    );
};

export default PostJobPage;