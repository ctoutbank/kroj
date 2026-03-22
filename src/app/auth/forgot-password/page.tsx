"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, ArrowLeft, ArrowRight, Check } from "lucide-react";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setIsLoading(false);
    setSent(true);
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-6 bg-gradient-to-br from-background via-background to-muted/30">
      <div className="w-full max-w-sm space-y-6">
        <Link href="/auth/sign-in" className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="h-3.5 w-3.5" /> Back to sign in
        </Link>

        <div className="flex items-center gap-3 mb-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground font-bold text-sm">K</div>
          <span className="font-bold text-xl tracking-tight">Kroj</span>
        </div>

        {!sent ? (
          <>
            <div>
              <h2 className="text-2xl font-bold">Reset password</h2>
              <p className="text-sm text-muted-foreground mt-1">
                Enter your email and we&apos;ll send you a link to reset your password.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="text-xs font-medium mb-1 block text-muted-foreground">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input type="email" placeholder="you@email.com" value={email} onChange={(e) => setEmail(e.target.value)} className="pl-9 h-10" autoFocus />
                </div>
              </div>

              <Button type="submit" className="w-full h-10 gap-2" disabled={isLoading || !email}>
                {isLoading ? <span className="h-4 w-4 border-2 border-current border-r-transparent rounded-full animate-spin" /> : <ArrowRight className="h-4 w-4" />}
                {isLoading ? "Sending..." : "Send reset link"}
              </Button>
            </form>
          </>
        ) : (
          <div className="space-y-4">
            <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-500/10 flex items-center justify-center">
              <Check className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Check your email</h2>
              <p className="text-sm text-muted-foreground mt-1">
                We sent a password reset link to <span className="font-medium text-foreground">{email}</span>
              </p>
            </div>
            <p className="text-xs text-muted-foreground">
              Didn&apos;t receive the email? Check your spam folder or{" "}
              <button className="text-primary hover:underline" onClick={() => setSent(false)}>try again</button>.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
