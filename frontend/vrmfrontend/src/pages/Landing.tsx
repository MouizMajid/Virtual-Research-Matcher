import { Link } from "react-router-dom";
import {
  ArrowRight, BookOpen, Users, Target, Sparkles, GraduationCap, Microscope,
  CheckCircle, Star, Zap, Shield,
} from "lucide-react";
import { mockTestimonials } from "../data/mockData";

const features = [
  { icon: Target, title: "Smart Matching", description: "AI-powered algorithms match students with research projects based on skills, interests, and goals." },
  { icon: Shield, title: "Verified Profiles", description: "All researchers and institutions are verified to ensure legitimate academic collaboration." },
  { icon: Zap, title: "Instant Applications", description: "Apply to research positions with one click using your pre-built academic profile." },
  { icon: BookOpen, title: "Project Discovery", description: "Browse hundreds of active research projects across every discipline and field of study." },
  { icon: Users, title: "Team Building", description: "Build diverse research teams with complementary skills and expertise." },
  { icon: Sparkles, title: "Career Growth", description: "Gain real research experience, publications, and professional connections." },
];

const stats = [
  { value: "500+", label: "Research Projects" },
  { value: "1,200+", label: "Active Students" },
  { value: "95%", label: "Match Rate" },
  { value: "150+", label: "Universities" },
];

const steps = [
  { step: "01", icon: GraduationCap, title: "Create Your Profile", description: "Build your academic profile highlighting your skills, interests, and research goals." },
  { step: "02", icon: Microscope, title: "Discover Projects", description: "Browse and get matched with research projects that align with your expertise." },
  { step: "03", icon: CheckCircle, title: "Start Collaborating", description: "Apply, get accepted, and begin your research collaboration journey." },
];

export default function Landing() {
  return (
    <div>
      {/* Hero */}
      <section className="gradient-hero-bg section-padding">
        <div className="container-narrow text-center">
          <div className="fade-in mx-auto max-w-3xl">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-medium text-primary">
              <Sparkles className="h-3.5 w-3.5" /> Now matching researchers worldwide
            </span>
            <h1 className="mt-6 text-5xl font-bold leading-tight lg:text-6xl">
              Where <span className="font-accent italic gradient-text">Research</span> Meets{" "}
              <span className="font-accent italic gradient-text">Talent</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              VRMM connects students and researchers for impactful academic collaboration.
              Find your perfect research match and accelerate your academic career.
            </p>
            <div className="mt-8 flex items-center justify-center gap-4">
              <Link
                to="/register"
                className="gradient-bg inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90 hover-lift"
              >
                Get Started <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/public-browse"
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-6 py-3 text-sm font-semibold transition-all hover:bg-muted hover-lift"
              >
                Browse Projects
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-border bg-card">
        <div className="container-narrow py-12">
          <div className="grid grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div key={stat.label} className={`text-center fade-in fade-in-delay-${i + 1}`}>
                <p className="text-4xl font-bold gradient-text">{stat.value}</p>
                <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section-padding">
        <div className="container-narrow">
          <div className="text-center">
            <h2 className="text-3xl font-bold">
              Everything you need for <span className="font-accent italic gradient-text">research collaboration</span>
            </h2>
            <p className="mt-3 text-muted-foreground">Powerful tools to connect, collaborate, and create impact.</p>
          </div>
          <div className="mt-14 grid grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <div key={feature.title} className={`glass-card p-6 hover-lift fade-in fade-in-delay-${(i % 5) + 1}`}>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                  <feature.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="mt-4 font-semibold">{feature.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section-padding bg-muted/50">
        <div className="container-narrow">
          <div className="text-center">
            <h2 className="text-3xl font-bold">
              How <span className="font-accent italic gradient-text">it works</span>
            </h2>
            <p className="mt-3 text-muted-foreground">Three simple steps to start your research journey.</p>
          </div>
          <div className="mt-14 grid grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <div key={step.step} className={`relative text-center fade-in fade-in-delay-${i + 1}`}>
                <span className="text-6xl font-bold text-primary/10">{step.step}</span>
                <div className="mx-auto -mt-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
                  <step.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding">
        <div className="container-narrow">
          <div className="text-center">
            <h2 className="text-3xl font-bold">
              Loved by <span className="font-accent italic gradient-text">researchers</span>
            </h2>
            <p className="mt-3 text-muted-foreground">Hear from the community that uses VRMM every day.</p>
          </div>
          <div className="mt-14 grid grid-cols-3 gap-6">
            {mockTestimonials.map((t, i) => (
              <div key={t.name} className={`glass-card p-6 fade-in fade-in-delay-${i + 1}`}>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="mt-4 text-sm text-muted-foreground leading-relaxed italic">"{t.text}"</p>
                <div className="mt-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding">
        <div className="container-narrow">
          <div className="gradient-bg rounded-2xl p-12 text-center text-primary-foreground">
            <h2 className="text-3xl font-bold">Ready to start your research journey?</h2>
            <p className="mt-3 text-primary-foreground/80">Join thousands of students and researchers already collaborating on VRMM.</p>
            <Link
              to="/register"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-background px-6 py-3 text-sm font-semibold text-foreground transition-all hover:opacity-90"
            >
              Create Free Account <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
