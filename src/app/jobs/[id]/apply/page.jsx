import { getJobById } from '@/lib/api/jobs';
import { getUserSession } from '@/lib/core/session';

import { redirect } from 'next/navigation';
import JobApply from './JobApply';


const ApplyPage = async ({ params }) => {
    const { id } = await params;

    const user = await getUserSession();
    if (!user) { 
              redirect(`/signin?redirect=/jobs/${id}/apply`)
    }

    if (user.role !== "seeker") { 
        return (
            <div className='w-full h-[80vh] flex flex-col items-center justify-center gap-4'>    
                <p className='text-gray-400'>Only job seekers can apply for jobs. Please sign in as a job seeker to apply.</p>
            </div>  
        )
    }

    const job = await getJobById(id);
   return (
        <div>
            <JobApply job={job}></JobApply>
        </div>
    );
};

export default ApplyPage;