import { Link } from "react-router-dom";
import {
  ArrowRight, BookOpen, Target, Sparkles, GraduationCap, Microscope,
  CheckCircle, Zap,
} from "lucide-react";
import { Button } from "../../components/ui/button";

const features = [
  { icon: Target, title: "Skill-Based Search", description: "Filter research opportunities by skills, location, type, and deadlines to find exactly the right match." },
  { icon: GraduationCap, title: "Academic Profiles", description: "Build a detailed profile showcasing your skills, experience, and portfolio links." },
  { icon: Zap, title: "Instant Applications", description: "Apply to research positions with one click using your pre-built academic profile." },
  { icon: BookOpen, title: "Project Discovery", description: "Browse active research projects across every discipline and field of study." },
  { icon: CheckCircle, title: "Application Tracking", description: "Monitor all your submitted applications and their current status in one place." },
  { icon: Sparkles, title: "Career Growth", description: "Gain real research experience, publications, and professional connections." },
];

const steps = [
  { step: "01", icon: GraduationCap, title: "Create Your Profile", description: "Build your academic profile highlighting your skills, interests, and research goals." },
  { step: "02", icon: Microscope, title: "Discover Projects", description: "Browse and filter research projects that align with your expertise and interests." },
  { step: "03", icon: CheckCircle, title: "Start Collaborating", description: "Apply, get accepted, and begin your research collaboration journey." },
];

export default function Landing() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-background py-24 px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <div className="fade-in mx-auto max-w-3xl">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-4 py-1.5 text-xs font-medium text-muted-foreground">
              <Sparkles className="h-3.5 w-3.5 text-primary" /> Connecting students and researchers
            </span>
            <h1 className="mt-6 text-5xl font-bold leading-tight tracking-tight lg:text-6xl">
              Where <span className="italic text-primary">Research</span> Meets{" "}
              <span className="italic text-primary">Talent</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              VRMM connects students and researchers for impactful academic collaboration.
              Find your perfect research match and accelerate your academic career.
            </p>
            <div className="mt-8 flex items-center justify-center gap-3">
              <Button asChild size="lg">
                <Link to="/register">
                  Get Started <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/public-browse">Browse Projects</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight">
              Everything you need for <span className="italic text-primary">research collaboration</span>
            </h2>
            <p className="mt-3 text-muted-foreground">Powerful tools to connect, collaborate, and create impact.</p>
          </div>
          <div className="mt-14 grid grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <div key={feature.title} className={`vrmm-card p-6 fade-in fade-in-delay-${(i % 5) + 1}`}>
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
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
      <section className="py-20 px-6 lg:px-8 bg-muted/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight">
              How <span className="italic text-primary">it works</span>
            </h2>
            <p className="mt-3 text-muted-foreground">Three simple steps to start your research journey.</p>
          </div>
          <div className="mt-14 grid grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <div key={step.step} className={`relative text-center fade-in fade-in-delay-${i + 1}`}>
                <span className="text-6xl font-bold text-primary/10">{step.step}</span>
                <div className="mx-auto -mt-4 flex h-14 w-14 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <step.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="bg-primary rounded-lg p-12 text-center">
            <h2 className="text-3xl font-bold text-primary-foreground tracking-tight">
              Ready to start your research journey?
            </h2>
            <p className="mt-3 text-primary-foreground/80">
              Connect with students and researchers at your institution through VRMM.
            </p>
            <Button asChild variant="outline" size="lg" className="mt-6 bg-card text-foreground border-card hover:bg-card/90">
              <Link to="/register">
                Create Free Account <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
