import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ShieldCheck, Lock, Fingerprint, Zap, ArrowRight } from "lucide-react";
function FuturisticAuthHome() {
    return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/40 to-background text-foreground">
      {/* HERO SECTION */}
      <section className="container mx-auto px-6 py-24 text-center">
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
          Secure Authentication for the
          <span className="block bg-gradient-to-r from-cyan-500 to-violet-500 bg-clip-text text-transparent">
            Future Web
          </span>
        </h1>
        <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
          Modern, scalable and blazing-fast authentication system with JWT, refresh tokens and enterprise-grade security.
        </p>
        <div className="mt-10 flex justify-center gap-4">
          <Button size="lg" className="gap-2">
            Get Started <ArrowRight size={18} />
          </Button>
          <Button size="lg" variant="outline">
            View Docs
          </Button>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="container mx-auto px-6 py-20">
        <h2 className="text-4xl font-semibold text-center mb-14">Why Choose Our Auth?</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <FeatureCard
            icon={<ShieldCheck />}
            title="Enterprise Security"
            description="Industry-standard encryption and secure token handling."
          />
          <FeatureCard
            icon={<Lock />}
            title="JWT + Refresh Tokens"
            description="Short-lived access tokens with safe rotation."
          />
          <FeatureCard
            icon={<Fingerprint />}
            title="Multi-Factor Ready"
            description="OTP, biometric and device-based authentication support."
          />
          <FeatureCard
            icon={<Zap />}
            title="Lightning Fast"
            description="Optimized for performance with minimal latency."
          />
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-muted/40 py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-semibold text-center mb-14">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <StepCard step="01" title="User Login" description="User signs in with credentials or OAuth provider." />
            <StepCard step="02" title="Token Issued" description="Access & refresh tokens are securely generated." />
            <StepCard step="03" title="Secure Access" description="Protected APIs validate tokens seamlessly." />
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="container mx-auto px-6 py-24 text-center">
        <h2 className="text-4xl font-bold">Ready to Secure Your App?</h2>
        <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
          Integrate our authentication system in minutes and scale without worry.
        </p>
        <div className="mt-8">
          <Button size="lg" className="gap-2">
            Start Building Now <ArrowRight size={18} />
          </Button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border py-6 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} AuthX. All rights reserved.
      </footer>
    </div>
  );
}

/* ---------- Components ---------- */

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <Card className="bg-card border-border hover:border-cyan-500/40 transition">
      <CardContent className="p-6 text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
          {icon}
        </div>
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="mt-2 text-sm text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}

interface StepCardProps {
  step: string;
  title: string;
  description: string;
}

function StepCard({ step, title, description }: StepCardProps) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <span className="text-cyan-600 dark:text-cyan-400 font-mono">{step}</span>
      <h3 className="mt-2 text-xl font-semibold">{title}</h3>
      <p className="mt-2 text-muted-foreground">{description}</p>
    </div>
  );
}

export default FuturisticAuthHome;