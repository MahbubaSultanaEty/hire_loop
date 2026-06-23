
import RegisterForm from "@/components/authentication/RegisterForm";
import { Suspense } from "react";


export default function SignupPage() {
  return (
    <Suspense 
      fallback={
        <div className="min-h-screen bg-[#0B1220] flex items-center justify-center text-white text-lg">
          Loading...
        </div>
      }
    >
      <RegisterForm />
    </Suspense>
  );
}