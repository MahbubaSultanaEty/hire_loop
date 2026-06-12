"use client";

import { useState } from "react";
import { Envelope, Lock } from "@gravity-ui/icons";
import {
  Form,
  TextField,
  Label,
  FieldError,
  Button,
  InputGroup,
} from "@heroui/react";
import { Eye, EyeOff } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState({
    type: "",
    message: "",
  });
  const router = useRouter();


    const searchParams = useSearchParams();
  const redirectTo= searchParams.get("redirect") || "/"


  async function handleSubmit(e) {
    e.preventDefault();
    setStatus({ type: "", message: "" });
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    const { data, error } = await authClient.signIn.email({
      email,
      password,
      
    });

    if (data) {
      setStatus({
        type: "success",
        message: "Signed in successfully! Redirecting...",
      });
      setTimeout(() => {
        router.push(redirectTo);
      }, 1200);
      return;
    }

    if (error) {
      setStatus({
        type: "error",
        message: error.message || "Invalid email or password.",
      });
    }

    setIsLoading(false);
  }

  return (
    <Form onSubmit={handleSubmit} className="w-full space-y-4">
      <TextField name="email" type="email" isRequired className="w-full">
        <Label className="text-sm text-white/60 mb-1.5 block">Email</Label>
        <InputGroup className="w-full">
          <InputGroup.Prefix className="px-3 text-white/30">
            <Envelope width={16} height={16} />
          </InputGroup.Prefix>
          <InputGroup.Input
            placeholder="you@example.com"
            className="bg-white/5 border border-purple-500/10 text-white placeholder-white/20 rounded-xl"
          />
        </InputGroup>
        <FieldError className="text-xs text-red-400 mt-1" />
      </TextField>

      <TextField
        name="password"
        type={showPassword ? "text" : "password"}
        isRequired
        className="w-full"
      >
        <Label className="text-sm text-white/60 mb-1.5 block">Password</Label>
        <InputGroup className="w-full">
          <InputGroup.Prefix className="px-3 text-white/30">
            <Lock width={16} height={16} />
          </InputGroup.Prefix>
          <InputGroup.Input
            placeholder="••••••••"
            className="bg-white/5 border border-purple-500/10 text-white placeholder-white/20 rounded-xl"
          />
          <InputGroup.Suffix
            className="px-3 text-white/30 cursor-pointer hover:text-white/60 transition-colors"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </InputGroup.Suffix>
        </InputGroup>
        <FieldError className="text-xs text-red-400 mt-1" />
      </TextField>

      

      {status.message && (
        <div
          className={`text-sm px-4 py-3 rounded-xl border ${
            status.type === "success"
              ? "bg-green-500/10 border-green-500/30 text-green-300"
              : "bg-red-500/10 border-red-500/30 text-red-300"
          }`}
        >
          {status.message}
        </div>
      )}

      <Button
        type="submit"
        isDisabled={isLoading}
        className="w-full bg-purple-600 hover:bg-purple-500 text-white font-medium py-2.5 rounded-xl shadow-lg shadow-purple-500/25 transition-all"
      >
        {isLoading ? "Signing in..." : "Sign In"}
      </Button>
      <p className="text-center text-xs text-white/30 mt-6">
            Don&apos;t have an account?{" "}
            <Link href={`/register?redirect=${redirectTo}`} className="text-purple-400 hover:text-purple-300 transition-colors">
              Get Started
            </Link>
          </p>
    </Form>
    
  );
}