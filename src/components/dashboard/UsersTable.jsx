"use client";

import React, { useState } from "react";
import { Person, Briefcase, ChevronLeft, ChevronRight } from "@gravity-ui/icons";
import { Button, Chip, Card } from "@heroui/react";
import { updateUserRole } from "@/lib/actions/users";

export default function UsersTable({ users }) {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [pendingChange, setPendingChange] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);

  const formatDate = (dateObj) => {
    if (!dateObj || !dateObj.$date) return "N/A";
    const date = new Date(dateObj.$date);
    return date.toLocaleDateString("en-US", {
      month: "short", day: "2-digit", year: "numeric",
    });
  };

  const getUserId = (user) => user._id?.$oid || user.id;

  const initiateRoleChange = (userId, userName, newRole) => {
    setPendingChange({ userId, userName, newRole });
    setIsConfirmOpen(true);
  };

  const confirmRoleChange = async () => {
    if (!pendingChange) return;
    setIsUpdating(true);
    try {
      const { userId, newRole } = pendingChange;
      // TODO: server action
        console.log(userId, newRole);
        await updateUserRole(userId, newRole)
    } catch (error) {
      console.error("Failed to update user role:", error);
    } finally {
      setIsUpdating(false);
      setIsConfirmOpen(false);
      setPendingChange(null);
    }
  };

  const handleStatusChange = async (userId, newStatus) => {
    console.log(`Status change triggered for ${userId} to ${newStatus}`);
  };

  const handleDelete = async (userId) => {
    console.log(`Delete triggered for user ${userId}`);
  };

  return (
    <div className="relative w-full">
      <Card className="bg-white/[0.03] border-purple-500/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-white/5 text-white/40 font-medium select-none">
                <th className="py-5 px-6 font-normal">User Name</th>
                <th className="py-5 px-6 font-normal">Email Address</th>
                <th className="py-5 px-6 font-normal">Role</th>
                <th className="py-5 px-6 font-normal">Join Date</th>
                <th className="py-5 px-6 font-normal">Status</th>
                <th className="py-5 px-6 font-normal text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-white/5">
              {users.map((user) => {
                const userId = getUserId(user);
                const userRole = user.role?.toLowerCase() || "seeker";
                const userStatus = user.status || "Active";

                return (
                  <tr key={userId} className="hover:bg-white/[0.02] transition-colors duration-150">

                    {/* User Name */}
                    <td className="py-4 px-6 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-xs text-white/50 font-bold">
                          {user.name ? user.name.split(" ").map((n) => n[0]).join("").toUpperCase() : "U"}
                        </div>
                        <span className="text-white font-medium">{user.name || "Unknown User"}</span>
                      </div>
                    </td>

                    {/* Email */}
                    <td className="py-4 px-6 text-white/40 whitespace-nowrap">{user.email}</td>

                    {/* Role */}
                    <td className="py-4 px-6 whitespace-nowrap">
                      {userRole === "recruiter" ? (
                        <Chip size="sm" className="bg-blue-500/10 text-blue-300 border border-blue-500/20">
                          <span className="flex items-center gap-1"><Briefcase width={11} height={11} /> Recruiter</span>
                        </Chip>
                      ) : userRole === "admin" ? (
                        <Chip size="sm" className="bg-purple-500/10 text-purple-300 border border-purple-500/20">
                          Admin
                        </Chip>
                      ) : (
                        <Chip size="sm" className="bg-white/5 text-white/50 border border-white/10">
                          <span className="flex items-center gap-1"><Person width={11} height={11} /> Seeker</span>
                        </Chip>
                      )}
                    </td>

                    {/* Join Date */}
                    <td className="py-4 px-6 text-white/40 whitespace-nowrap">{formatDate(user.createdAt)}</td>

                    {/* Status */}
                    <td className="py-4 px-6 whitespace-nowrap">
                      {userStatus === "Active" ? (
                        <Chip size="sm" className="bg-green-500/10 text-green-400 border border-green-500/20">
                          <span className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                            Active
                          </span>
                        </Chip>
                      ) : (
                        <Chip size="sm" className="bg-red-500/10 text-red-400 border border-red-500/20">
                          <span className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                            Suspended
                          </span>
                        </Chip>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-6 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-2">
                        {userRole !== "admin" && (
                          <Button
                            size="sm"
                            onPress={() => initiateRoleChange(userId, user.name, "admin")}
                            className="bg-white/5 hover:bg-white/10 text-white/50 border border-white/10 text-xs px-3 rounded-lg"
                          >
                            Make Admin
                          </Button>
                        )}
                        {userRole !== "recruiter" && (
                          <Button
                            size="sm"
                            onPress={() => initiateRoleChange(userId, user.name, "recruiter")}
                            className="bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border border-blue-500/20 text-xs px-3 rounded-lg"
                          >
                            Make Recruiter
                          </Button>
                        )}
                        {userRole !== "seeker" && (
                          <Button
                            size="sm"
                            onPress={() => initiateRoleChange(userId, user.name, "seeker")}
                            className="bg-white/5 hover:bg-white/10 text-white/50 border border-white/10 text-xs px-3 rounded-lg"
                          >
                            Make Seeker
                          </Button>
                        )}

                        <div className="w-px h-4 bg-white/10 mx-1" />

                        {userStatus === "Active" ? (
                          <Button
                            size="sm"
                            onPress={() => handleStatusChange(userId, "Suspended")}
                            className="bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 text-xs px-3 rounded-lg"
                          >
                            Suspend
                          </Button>
                        ) : (
                          <>
                            <Button
                              size="sm"
                              onPress={() => handleStatusChange(userId, "Active")}
                              className="bg-green-500/10 hover:bg-green-500/20 text-green-400 border border-green-500/20 text-xs px-3 rounded-lg"
                            >
                              Activate
                            </Button>
                            <Button
                              size="sm"
                              onPress={() => handleDelete(userId)}
                              className="bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 text-xs px-3 rounded-lg"
                            >
                              Delete
                            </Button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-white/5 text-xs text-white/40 select-none">
          <div>Showing 1 to {users.length} of 12,842 users</div>
          <div className="flex items-center gap-1">
            <Button size="sm" variant="ghost" className="p-1 text-white/40 hover:text-white min-w-0">
              <ChevronLeft width={16} height={16} />
            </Button>
            <Button size="sm" className="w-6 h-6 min-w-0 bg-purple-600 text-white text-xs rounded-md p-0">1</Button>
            <Button size="sm" variant="ghost" className="w-6 h-6 min-w-0 text-white/40 hover:text-white text-xs rounded-md p-0">2</Button>
            <Button size="sm" variant="ghost" className="w-6 h-6 min-w-0 text-white/40 hover:text-white text-xs rounded-md p-0">3</Button>
            <span className="px-1 text-white/20">...</span>
            <Button size="sm" variant="ghost" className="px-2 h-6 min-w-0 text-white/40 hover:text-white text-xs rounded-md">1285</Button>
            <Button size="sm" variant="ghost" className="p-1 text-white/40 hover:text-white min-w-0">
              <ChevronRight width={16} height={16} />
            </Button>
          </div>
        </div>
      </Card>

      {/* Confirmation Modal */}
      {isConfirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm bg-black/60">
          <Card className="w-full max-w-sm bg-[#0F1117] border-purple-500/10 p-6 space-y-6">
            <Card.Header className="p-0">
              <Card.Title className="text-white text-base">Confirm Role Change</Card.Title>
              <Card.Description className="text-white/40 text-xs leading-relaxed">
                Are you sure you want to change the role of{" "}
                <span className="text-white font-medium">{pendingChange?.userName}</span>{" "}
                to{" "}
                <span className="text-white font-medium capitalize">{pendingChange?.newRole}</span>?
                This alters system access and permissions immediately.
              </Card.Description>
            </Card.Header>

            <Card.Footer className="p-0 flex items-center justify-end gap-3">
              <Button
                isDisabled={isUpdating}
                onPress={() => { setIsConfirmOpen(false); setPendingChange(null); }}
                className="bg-white/5 hover:bg-white/10 text-white/60 border border-white/10 text-xs rounded-xl"
              >
                Cancel
              </Button>
              <Button
                isDisabled={isUpdating}
                onPress={confirmRoleChange}
                className="bg-purple-600 hover:bg-purple-500 text-white text-xs rounded-xl shadow-lg shadow-purple-500/25 min-w-[76px]"
              >
                {isUpdating ? (
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : "Confirm"}
              </Button>
            </Card.Footer>
          </Card>
        </div>
      )}
    </div>
  );
}