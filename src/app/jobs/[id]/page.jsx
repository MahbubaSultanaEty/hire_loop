import { getJobById } from '@/lib/api/jobs';
import React from 'react';

const JobDetailsPage = async({ params }) => {
    const { id } = await params;
    // console.log(id);
    const job = await getJobById(id);
    console.log(job);

    return (
        <div>
            JobDetailsPage 4{id}
        </div>
    );
};

export default JobDetailsPage;