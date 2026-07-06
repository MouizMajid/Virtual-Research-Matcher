import { Link } from "react-router-dom";
import { FlaskConical, Users, Shield, ArrowRight } from "lucide-react";
import { Button } from "../components/ui/button";

const values = [
  {
    icon: FlaskConical,
    title: "Research-First",
    description: "Built by researchers for researchers — every feature is designed around the realities of academic collaboration.",
  },
  {
    icon: Users,
    title: "Student-Centred",
    description: "We make it easy for students to discover meaningful opportunities and build their academic careers.",
  },
  {
    icon: Shield,
    title: "Privacy by Design",
    description: "Hosted entirely on Western University infrastructure. No passwords stored. Fully FIPPA compliant.",
  },
];

export default function About() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-background py-20 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">
            About <span className="italic text-primary">VRMM</span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            The Virtual Research Match Maker is an internal platform built for Western University — connecting faculty researchers with students who want hands-on research experience.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 px-6 lg:px-8 bg-muted/50">
        <div className="max-w-4xl mx-auto">
          <div className="vrmm-card p-10">
            <h2 className="text-2xl font-bold tracking-tight">Our Mission</h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Research thrives when the right people find each other. VRMM exists to remove the friction from that process — replacing informal hallway conversations and email chains with a structured, searchable platform that gives every student fair visibility into available research opportunities across every department at Western University.
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              For researchers, it means a single place to post openings, review applicants, and build collaborative teams. For students, it means discovering opportunities beyond their immediate circle — and applying with a profile that speaks for itself.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold tracking-tight text-center">What we stand for</h2>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {values.map((v) => (
              <div key={v.title} className="vrmm-card p-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <v.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="mt-4 font-semibold">{v.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 px-6 lg:px-8 bg-muted/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold tracking-tight">The Team</h2>
          <div className="mt-8 space-y-4">
            <div className="vrmm-card p-6">
              <p className="font-semibold">Dr. Joshua Pearce</p>
              <p className="text-sm text-muted-foreground">Principal Investigator — Department of Electrical & Computer Engineering, Western University</p>
              <p className="mt-2 text-sm text-muted-foreground">Conceptualized and sponsored the VRMM project to improve research-student matching across the Faculty of Engineering.</p>
            </div>
            <div className="vrmm-card p-6">
              <p className="font-semibold">Mouiz Majid</p>
              <p className="text-sm text-muted-foreground">Lead Developer — Western University</p>
              <p className="mt-2 text-sm text-muted-foreground">Designed and built the platform end-to-end: system architecture, backend API, frontend, and infrastructure deployment.</p>
            </div>
          </div>
          <p className="mt-6 text-sm text-muted-foreground">
            Infrastructure provided by Western Engineering IT. SSO authentication provided by Western Technology Services (WTS).
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold tracking-tight">Ready to get started?</h2>
          <p className="mt-3 text-muted-foreground">Sign in with your Western University account to explore research opportunities.</p>
          <div className="mt-6 flex items-center justify-center gap-3">
            <Button asChild size="lg">
              <Link to="/register">Get Started <ArrowRight className="h-4 w-4" /></Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/public-browse">Browse Projects</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
