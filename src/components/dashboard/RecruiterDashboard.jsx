"use client";
import { authClient } from "@/lib/auth-client";
import {  Sparkles } from "lucide-react";
import DashboardStats from "./DashboardStats";



const RecruiterDashboard = () => {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return (
      <div className="min-h-screen w-full bg-[#0F1117] flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-purple-500 border-t-transparent animate-spin" />
      </div>
    );
  }

  const user = session?.user;

  return (
    <div className="min-h-screen w-full bg-[#0F1117] px-6 py-10">
      <div className="w-full max-w-none mx-auto">

        {/* Welcome */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-2">
            Welcome back, <span className="text-purple-400">{user?.name}</span>
            <Sparkles size={24} className="text-purple-400" />
          </h1>
          <p className="text-white/40 text-sm mt-1">Here&apos;s what&apos;s happening with your jobs today.</p>
        </div>

        {/* Stats */}
       <DashboardStats/>

      </div>
    </div>
  );
};

export default RecruiterDashboard;