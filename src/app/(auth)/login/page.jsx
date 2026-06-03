import SignInForm from "@/components/authentication/SigninForm";
import { BriefcaseBusiness } from "lucide-react";
import Link from "next/link";


export const metadata = {
  title: "Sign In | HireLoop",
  description: "Sign in to your HireLoop account.",
};

export default function SignInPage() {
  return (
    <main className="min-h-screen bg-[#0F1117] flex items-center justify-center px-4 mt-15">
      <div className="w-full max-w-md">
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-purple-600 to-cyan-500 shadow-lg shadow-purple-500/30">
            <BriefcaseBusiness size={20} className="text-white" />
          </div>
          <h2 className="font-bold tracking-tight text-lg">
            <span className="text-white">Hire</span>
            <span className="text-purple-400">Loop</span>
          </h2>
        </div>

        <div className="rounded-2xl border border-purple-500/10 bg-black/40 backdrop-blur-xl p-8 shadow-[0_8px_32px_rgba(0,0,0,0.35)]">
          <div className="mb-6">
            <h1 className="text-xl font-bold text-white">Welcome back</h1>
            <p className="text-sm text-white/40 mt-1">Sign in to continue to HireLoop</p>
          </div>

          <SignInForm/>

          <p className="text-center text-xs text-white/30 mt-6">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-purple-400 hover:text-purple-300 transition-colors">
              Get Started
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}