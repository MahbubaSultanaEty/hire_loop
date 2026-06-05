import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar';
import React from 'react';

const Dashboardlayout = ({children}) => {
    return (
        <div className='mt-20 flex min-h-screen'>
            <DashboardSidebar/>
            <div>{ children}</div>
        </div>
    );
};

export default Dashboardlayout;