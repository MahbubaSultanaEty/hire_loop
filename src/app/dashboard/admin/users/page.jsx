import { getUsersList } from '@/lib/api/users';
import React from 'react';

const AdminUsersPage = async() => {
    const data = await getUsersList();
    const users = data?.users;
    console.log(users);
    return (
        <div>
            
        </div>
    );
};

export default AdminUsersPage;