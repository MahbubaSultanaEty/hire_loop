"use client";
import {Description, Label, Radio, RadioGroup} from "@heroui/react";
import { useState } from "react";

import { Check, Eye, EyeSlash } from "@gravity-ui/icons";
import {
  Button, 
  FieldError,
  Form,
  Input, 
  TextField,
} from "@heroui/react";

import { BriefcaseBusiness, ArrowRight, CheckCircle2 } from "lucide-react";

import { motion } from "framer-motion";
import { authClient } from "@/lib/auth-client";
import GoogleSignInBtn from "@/components/authentication/GoogleSignInBtn";

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("seeker")
  const [status, setStatus] = useState({
    type: "", // success | error
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
      role
    });

    console.log(data, error);

    if (data) {
      setStatus({
        type: "success",
        message: "Account created successfully 🎉 Redirecting...",
      });

      setTimeout(() => {
        window.location.href = "/";
      }, 1200);

      return;
    }

    if (error) {
      setStatus({
        type: "error",
        message: error.message || "Invalid Credentials",
      });
    }
  };

  return (
    <section className="min-h-screen bg-[#0B1220] flex items-center justify-center px-6 py-16">
      <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-14 items-center">
        {/* LEFT SIDE */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          className="hidden lg:block"
        >
          <div className="max-w-xl">
            <div className="flex items-center gap-4 mb-8">
              <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-purple-600 to-cyan-500 flex items-center justify-center">
                <BriefcaseBusiness className="text-white" />
              </div>

              <h2 className="text-3xl font-bold text-white">
                Hire<span className="text-purple-400">Loop</span>
              </h2>
            </div>

            <h1 className="text-5xl font-bold text-white leading-tight">
              Build your career with the right opportunities.
            </h1>

            <p className="text-white/60 text-lg mt-6 leading-relaxed">
              Create your account and discover companies, jobs and
              opportunities.
            </p>

            <div className="mt-10 space-y-5">
              {[
                "Apply to jobs instantly",
                "Track applications in real time",
                "Connect with top employers",
                "Build your professional profile",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 text-white/80"
                >
                  <CheckCircle2 size={20} className="text-purple-400" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="mt-10 inline-flex items-center gap-2 text-purple-400 font-medium">
              Start your journey today
              <ArrowRight size={18} />
            </div>
          </div>
        </motion.div>

        {/* RIGHT SIDE */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full max-w-lg mx-auto"
        >
          <div className="bg-white/[0.04] border border-white/10 backdrop-blur-xl rounded-[32px] p-8">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-white">Create Account</h2>

              <p className="text-white/50 mt-2">
                Join HireLoop and unlock opportunities.
              </p>
            </div>

            <Form
              className="flex flex-col gap-6"
              render={(props) => <form {...props} />}
              onSubmit={onSubmit}
            >
              <TextField isRequired name="name">
                <Label className="text-white/80">Full Name</Label>
                <Input name="name" placeholder="Enter your name" />
                <FieldError />
              </TextField>

              <TextField                
                name="image"
                type="text"
                // validate={(value) =>
                //   value.startsWith("http")
                //     ? null
                //     : "Please enter a valid image URL"
                // }
              >
                <Label className="text-white/80">Profile Image URL</Label>
                <Input name="image" placeholder="https://..." />
                <FieldError />
              </TextField>

              <TextField
                isRequired
                name="email"
                type="email"
                validate={(value) =>
                  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)
                    ? null
                    : "Please enter a valid email"
                }
              >
                <Label className="text-white/80">Email</Label>
                <Input name="email" placeholder="you@example.com" />
                <FieldError />
              </TextField>

              <TextField
                className="relative"
                isRequired
                minLength={8}
                name="password"
                validate={(value) => {
                  if (value.length < 8) return "Minimum 8 characters";
                  if (!/[A-Z]/.test(value))
                    return "One uppercase letter required";
                  if (!/[0-9]/.test(value)) return "One number required";
                  return null;
                }}
              >
                <Label className="text-white/80">Password</Label>
                <Input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter password"
                />
                <Description className="text-white/40">
                  Must contain 1 uppercase + 1 number
                </Description>
                <FieldError />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute z-50  top-9 right-6"
                >
                  {showPassword ? (
                    <Eye color="white" />
                  ) : (
                    <EyeSlash color="white" />
                  )}
                </span>
              </TextField>

                   <div className="flex flex-col gap-4">
      <Label>You are a ?</Label>
      <RadioGroup defaultValue="job-seeker" name="role" orientation="horizontal" onChange={(value) => setRole(value)}>
        <Radio value="job-seeker">
          <Radio.Control>
            <Radio.Indicator />
          </Radio.Control>
          <Radio.Content>
            <Label>Job Seeker</Label>            
          </Radio.Content>
        </Radio>
        <Radio value="recruiter">
          <Radio.Control>
            <Radio.Indicator />
          </Radio.Control>
          <Radio.Content>
            <Label>Recruiter</Label>            
          </Radio.Content>
        </Radio>       
      </RadioGroup>
    </div>

              <Button
                type="submit"
                className="w-full h-12 bg-purple-600 hover:bg-purple-500 text-white font-semibold"
              >
                <Check />
                Create Account
              </Button>
            </Form>

            {/*  INLINE MESSAGE HERE  */}
            {status.message && (
              <div
                className={`mt-4 text-sm px-4 py-3 rounded-xl border ${
                  status.type === "success"
                    ? "bg-green-500/10 border-green-500/30 text-green-300"
                    : "bg-red-500/10 border-red-500/30 text-red-300"
                }`}
              >
                {status.message}
              </div>
            )}

            {/* Divider */}
            <div className="relative my-7">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10" />
              </div>

              <div className="relative flex justify-center">
                <span className="bg-[#0B1220] px-4 text-xs uppercase text-white/40">
                  Or Continue With
                </span>
              </div>
            </div>

            <GoogleSignInBtn />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
