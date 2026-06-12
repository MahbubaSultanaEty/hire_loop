import { getUserSession } from '@/lib/core/session';

import { redirect } from 'next/navigation';


const ApplyPage = async ({ params }) => {
    const { id } = await params;

    const user = await getUserSession();
    if (!user) { 
              redirect(`/login?redirect=/jobs/${id}/apply`)
    }
    return (
        <div>
            
        </div>
    );
};

export default ApplyPage;