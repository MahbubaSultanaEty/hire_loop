import { getJobById } from '@/lib/api/jobs';
import { getUserSession } from '@/lib/core/session';

import { redirect } from 'next/navigation';
import JobApply from './JobApply';
import { getApplicationByApplicant } from '@/lib/api/applications';
import Link from 'next/link';
import { getPlanById } from '@/lib/api/plans';


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
    const applications = await getApplicationByApplicant(user.id);
    console.log(applications);
    const plan = await getPlanById(user?.plan || 'seeker_free');
   

    const job = await getJobById(id);
   return (
       <div className='bg-[#0F1117]'>
           <h2 className='font-bold justify-center mt-25 mb-8 text-center text-lg '>You have applied so far for {applications.length} out of {plan.maxApplicationsPerMonth} jobs</h2>
           
           {
               applications.length < plan.maxApplicationsPerMonth ? <JobApply applicant={user} job={job}></JobApply>: <p className='h-50vh flex items-center justify-center gap-4 bg-black/60  mx-20 my-4 p-8 rounded-b-xl shadow-fuchsia-950 shadow-2xs  '>Purchase plan to apply for more jobs. <Link className='text-fuchsia-500 font-bold' href="/plans">Plans</Link></p>} 
        </div>
    );
};

export default ApplyPage;