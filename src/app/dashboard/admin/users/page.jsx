// app/dashboard/admin/users/page.jsx
import UsersTable from '@/components/dashboard/UsersTable';
import { getUsersList } from '@/lib/api/users';
import { Card } from '@heroui/react';
import { Users, Briefcase, UserX, UserPlus } from 'lucide-react';

export const metadata = {
  title: "User Management | Admin | HireLoop",
  description: "Review, filter, and manage platform access for all users.",
};

export default async function AdminUsersPage() {
  const data = await getUsersList();
  const users = data?.users || [];

  const totalActive = users.filter((u) => u.role !== "suspended").length;
  const recruiters = users.filter((u) => u.role === "recruiter").length;
  const suspended = users.filter((u) => u.role === "suspended").length;
  const today = new Date().toDateString();
  const newSignups = users.filter((u) => new Date(u.createdAt).toDateString() === today).length;

  return (
    <div className="w-full px-6 py-10 space-y-6">

      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-white">User Management</h1>
        <p className="text-white/40 text-sm mt-1">
          Review, filter, and manage platform access for all users.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-white/[0.03] border-purple-500/10">
          <Card.Content className="py-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center">
                <Users size={15} className="text-purple-400" />
              </div>
              <p className="text-white/40 text-xs">Total Active Users</p>
            </div>
            <p className="text-2xl font-bold text-white">{totalActive.toLocaleString()}</p>
            <p className="text-green-400 text-xs mt-1">+12% vs last month</p>
          </Card.Content>
        </Card>

        <Card className="bg-white/[0.03] border-purple-500/10">
          <Card.Content className="py-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                <Briefcase size={15} className="text-blue-400" />
              </div>
              <p className="text-white/40 text-xs">Recruiter Growth</p>
            </div>
            <p className="text-2xl font-bold text-white">{recruiters.toLocaleString()}</p>
            <p className="text-blue-400 text-xs mt-1">High demand</p>
          </Card.Content>
        </Card>

        <Card className="bg-white/[0.03] border-purple-500/10">
          <Card.Content className="py-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center">
                <UserX size={15} className="text-red-400" />
              </div>
              <p className="text-white/40 text-xs">Suspended Accounts</p>
            </div>
            <p className="text-2xl font-bold text-white">{suspended.toLocaleString()}</p>
            <p className="text-white/30 text-xs mt-1">{((suspended / users.length) * 100).toFixed(1)}% of total</p>
          </Card.Content>
        </Card>

        <Card className="bg-white/[0.03] border-purple-500/10">
          <Card.Content className="py-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center">
                <UserPlus size={15} className="text-green-400" />
              </div>
              <p className="text-white/40 text-xs">New Signups (24h)</p>
            </div>
            <p className="text-2xl font-bold text-white">{newSignups.toLocaleString()}</p>
            <p className="text-yellow-400 text-xs mt-1">Steady activity</p>
          </Card.Content>
        </Card>
      </div>

      {/* Table */}
      <Card className="bg-white/[0.03] border-purple-500/10">
        <Card.Header>
          <Card.Title className="text-white font-semibold">
            All Users
            <span className="text-white/30 text-sm font-normal ml-2">
              {users.length} total
            </span>
          </Card.Title>
        </Card.Header>
        <Card.Content className="pt-0">
          {users.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-14 h-14 rounded-2xl bg-purple-500/10 flex items-center justify-center mb-4">
                <Users size={24} className="text-purple-400" />
              </div>
              <p className="text-white/40 text-sm">No users found.</p>
            </div>
          ) : (
            <UsersTable users={users} />
          )}
        </Card.Content>
      </Card>

    </div>
  );
}