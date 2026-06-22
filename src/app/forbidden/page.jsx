import { Card, Button } from "@heroui/react";
import { ShieldX } from "lucide-react";
import Link from "next/link";

export default function ForbiddenPage() {
  return (
    <div className="min-h-screen bg-[#0F1117] flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <Card className="bg-white/[0.03] border-purple-500/10">
          <Card.Content className="flex flex-col items-center text-center py-10 space-y-6">

            <div className="w-20 h-20 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center">
              <ShieldX size={40} className="text-red-400" />
            </div>

            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-white">Access Denied</h1>
              <p className="text-white/40 text-sm leading-relaxed">
                You don&apos;t have permission to view this page. If you think this is a mistake, please contact support.
              </p>
            </div>

            <div className="flex flex-col gap-3 w-full">
              <Link href="/" className="w-full">
                <Button className="w-full bg-purple-600 hover:bg-purple-500 text-white font-medium rounded-xl shadow-lg shadow-purple-500/25 transition-all">
                  Go to Homepage
                </Button>
              </Link>
              <Link href="/dashboard" className="w-full">
                <Button className="w-full bg-white/5 hover:bg-white/10 text-white/60 border border-white/10 rounded-xl transition-all">
                  Go to Dashboard
                </Button>
              </Link>
            </div>

          </Card.Content>
        </Card>
      </div>
    </div>
  );
}