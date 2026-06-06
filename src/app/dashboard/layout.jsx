import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar';
import React from 'react';

const Dashboardlayout = ({children}) => {
    return (
        <div className='mt-20 flex min-h-screen gap-6'>
            <DashboardSidebar/>
            <div className="flex-1 md:pl-60 min-w-0">{children}</div>
        </div>
    );
};

export default Dashboardlayout;