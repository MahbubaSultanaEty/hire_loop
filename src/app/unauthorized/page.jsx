import Link from "next/link";
import { ShieldX, ArrowLeft } from "lucide-react";

// সার্ভার কম্পোনেন্ট হওয়ায় এই মেটাডেটা এখন পারফেক্টলি কাজ করবে
export const metadata = {
  title: "Unauthorized | HireLoop",
  description: "You do not have permission to access this page.",
};

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen bg-[#0F1117] flex items-center justify-center px-6 pt-22">
      <div className="max-w-lg w-full text-center">

        {/* আইকন বক্স */}
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-red-500/10 border border-red-500/20">
          <ShieldX className="h-10 w-10 text-red-400" />
        </div>

        <h1 className="text-4xl font-bold text-white mb-4">
          Access Denied
        </h1>

        <p className="text-white/50 leading-relaxed mb-8">
          You don&apos;t have permission to access this page.
          <br />
          This area is restricted to users with a different role.
        </p>

        {/* কারণসমূহের লিস্ট */}
        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-5 text-left mb-8">
          <h3 className="text-white font-medium mb-3">
            Possible reasons:
          </h3>

          <ul className="space-y-2 text-sm text-white/50">
            <li>• A Job Seeker tried to access Recruiter resources.</li>
            <li>• A Recruiter tried to access Job Seeker resources.</li>
            <li>• A non-admin user tried to access Admin resources.</li>
            <li>• Your account doesn&apos;t have sufficient permissions.</li>
          </ul>
        </div>

        {/* বাটন সেকশন (Tailwind দিয়ে কাস্টমাইজড) */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          
          {/* Back to Home Button */}
          <Link 
            href="/" 
            className="inline-flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-500 text-white font-medium h-10 px-4 rounded-xl transition-colors text-sm"
          >
            <ArrowLeft size={16} />
            Back to Home
          </Link>

          {/* Browse Jobs Button */}
          <Link 
            href="/jobs" 
            className="inline-flex items-center justify-center border border-white/20 hover:bg-white/[0.05] text-white font-medium h-10 px-4 rounded-xl transition-colors text-sm"
          >
            Browse Jobs
          </Link>
          
        </div>

      </div>
    </div>
  );
}