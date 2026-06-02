"use client";

import { useState } from "react";
import {
  Button,
  Form,
  Input,
  TextField,
  Label,
  FieldError,
  Description,
} from "@heroui/react";

import {
  BriefcaseBusiness,
  User,
  Mail,
  Lock,
  Image,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

import { motion } from "framer-motion";
import { authClient } from "@/lib/auth-client";
import GoogleSignInBtn from "@/components/btns/GoogleSignInBtn";

export default function SignupPage() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({
    type: "",
    message: "",
  });

const onSubmit = async (e) => {
  e.preventDefault();

  const formData = new FormData(e.currentTarget);
  const user = Object.fromEntries(formData.entries());

  const { data, error } = await authClient.signUp.email({
    email: user.email,
    name: user.name,
    image: user.image,
    password: user.password,
  });

  if (data) {
    toast.success("Account Created ✨");
    window.location.href = "/profile";
  }

  if (error) {
    toast.error(error.message);
  }
};
  return (
    <section className="min-h-screen bg-[#0B1220] flex items-center justify-center px-4 py-20">
      <div className="w-full max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 items-center">
        {/* LEFT SIDE */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-8"
        >
         

          <div>
            <h1 className="text-3xl font-bold text-white leading-tight">
              Build your career with the right opportunities.
            </h1>

            <p className="text-white/60 mt-5 text-lg max-w-xl">
              Create your account and discover companies, jobs and
              opportunities that match your skills and ambitions.
            </p>
          </div>

          <div className="space-y-4">
            {[
              "Apply to jobs in one click",
              "Track your applications",
              "Connect with top companies",
              "Create a professional profile",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <CheckCircle2
                  size={20}
                  className="text-purple-400 shrink-0"
                />

                <span className="text-white/80">{item}</span>
              </div>
            ))}
          </div>

          <div className="inline-flex items-center gap-2 text-purple-400 font-medium">
            Get started today
            <ArrowRight size={18} />
          </div>
        </motion.div>

        {/* RIGHT SIDE */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-8 backdrop-blur-sm">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-white">
                Create Account
              </h2>

              <p className="text-white/50 mt-2">
                Start your journey with HireLoop.
              </p>
            </div>

            {status.message && (
              <div
                className={`mb-5 rounded-xl border px-4 py-3 text-sm ${
                  status.type === "success"
                    ? "border-green-500/30 bg-green-500/10 text-green-300"
                    : "border-red-500/30 bg-red-500/10 text-red-300"
                }`}
              >
                {status.message}
              </div>
            )}

            <Form
              onSubmit={onSubmit}
              className="flex flex-col gap-5"
            >
              <TextField name="name" isRequired>
                <Label className="text-white/80">
                  Full Name
                </Label>

                <Input
                  startcontent={
                    <User
                      size={18}
                      className="text-white/40"
                    />
                  }
                  name="name"
                  placeholder="enter your name"
                />

                <FieldError />
              </TextField>

              <TextField name="image" isRequired>
                <Label className="text-white/80">
                  Profile Image URL
                </Label>

                <Input
                  startcontent={
                    <Image
                      size={18}
                      className="text-white/40"
                    />
                  }
                  name="image"
                  placeholder="https://..."
                />

                <FieldError />
              </TextField>

              <TextField
                name="email"
                type="email"
                isRequired
              >
                <Label className="text-white/80">
                  Email
                </Label>

                <Input
                  startcontent={
                    <Mail
                      size={18}
                      className="text-white/40"
                    />
                  }
                  name="email"
                  placeholder="you@example.com"
                />

                <FieldError />
              </TextField>

              <TextField
                name="password"
                type="password"
                isRequired
              >
                <Label className="text-white/80">
                  Password
                </Label>

                <Input
                  type="password"
                  startcontent={
                    <Lock
                      size={18}
                      className="text-white/40"
                    />
                  }
                  name="password"
                  placeholder="Enter password"
                />

                <Description>
                  Minimum 8 characters.
                </Description>

                <FieldError />
              </TextField>

              <Button
                type="submit"
                isDisabled={loading}
                className="w-full bg-purple-600 text-white h-12 font-semibold"
              >
                {loading
                  ? "Creating Account..."
                  : "Create Account"}
              </Button>
            </Form>

            <div className="relative my-6">
              <div className="border-t border-white/10" />
              <span className="absolute left-1/2 -translate-x-1/2 -top-3 bg-[#0B1220] px-3 text-xs text-white/40">
                OR
              </span>
            </div>

            <GoogleSignInBtn />

            <p className="text-center text-white/50 text-sm mt-6">
              Already have an account?{" "}
              <a
                href="/login"
                className="text-purple-400 hover:text-purple-300"
              >
                Sign In
              </a>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}