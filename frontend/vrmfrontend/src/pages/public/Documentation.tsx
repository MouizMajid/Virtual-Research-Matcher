import { GraduationCap, Microscope } from "lucide-react";

const studentSteps = [
  {
    step: "01",
    title: "Sign In",
    body: "Click Get Started and authenticate with your Western University account via SSO. Your role (student) is determined automatically from your Western affiliation.",
  },
  {
    step: "02",
    title: "Complete Your Profile",
    body: "Go to Edit Profile and fill in your headline, bio, skills, and work experience. Researchers see your profile when you apply — a complete profile makes a strong first impression.",
  },
  {
    step: "03",
    title: "Browse Postings",
    body: "Use the Browse page to explore open research positions. Filter by type (volunteer, paid, thesis), location, deadline, or search by keyword.",
  },
  {
    step: "04",
    title: "Apply",
    body: "Open a posting that interests you and click Apply. Your profile information is sent directly to the researcher. You can track the status of your application in My Applications.",
  },
];

const researcherSteps = [
  {
    step: "01",
    title: "Sign In",
    body: "Sign in with your Western University faculty or staff account via SSO. Your researcher role is assigned automatically based on your Western affiliation.",
  },
  {
    step: "02",
    title: "Create a Posting",
    body: "Go to My Postings → Create Posting. Fill in the title, type, description, requirements, deadline, and location. Published postings are visible to all Western students immediately.",
  },
  {
    step: "03",
    title: "Review Applicants",
    body: "When students apply, they appear in the Applicants list for each of your postings. Click an applicant to view their full profile, bio, skills, and experience.",
  },
  {
    step: "04",
    title: "Manage Your Postings",
    body: "Edit or delete postings at any time from My Postings. Deleting a posting also removes all associated applications, so confirm before doing so.",
  },
];

function StepCard({ step, title, body }: { step: string; title: string; body: string }) {
  return (
    <div className="vrmm-card p-5 flex gap-4">
      <span className="text-3xl font-bold text-primary/20 leading-none shrink-0">{step}</span>
      <div>
        <p className="font-semibold">{title}</p>
        <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{body}</p>
      </div>
    </div>
  );
}

export default function Documentation() {
  return (
    <div>
      <section className="bg-background py-20 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <h1 className="text-4xl font-bold tracking-tight">
              <span className="italic text-primary">Documentation</span>
            </h1>
            <p className="mt-4 text-muted-foreground">Everything you need to get up and running on VRMM.</p>
          </div>

          {/* Students */}
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-6">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                <GraduationCap className="h-5 w-5 text-primary" />
              </div>
              <h2 className="text-xl font-bold">For Students</h2>
            </div>
            <div className="space-y-3">
              {studentSteps.map((s) => (
                <StepCard key={s.step} {...s} />
              ))}
            </div>
          </div>

          {/* Researchers */}
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-6">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                <Microscope className="h-5 w-5 text-primary" />
              </div>
              <h2 className="text-xl font-bold">For Researchers</h2>
            </div>
            <div className="space-y-3">
              {researcherSteps.map((s) => (
                <StepCard key={s.step} {...s} />
              ))}
            </div>
          </div>

          {/* Tips */}
          <div className="vrmm-card p-6 bg-primary/5 border-primary/20">
            <h2 className="font-semibold mb-3">Tips for a Strong Profile</h2>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><strong className="text-foreground">Headline</strong> — Keep it specific: "3rd year CS student interested in ML research" beats "Student".</li>
              <li><strong className="text-foreground">Bio</strong> — Two or three sentences about your background, research interests, and what you're hoping to gain.</li>
              <li><strong className="text-foreground">Skills</strong> — List technical skills relevant to research (programming languages, lab techniques, tools).</li>
              <li><strong className="text-foreground">Experience</strong> — Include course projects, co-ops, and volunteer work — not just formal jobs.</li>
              <li><strong className="text-foreground">Links</strong> — A GitHub or portfolio link gives researchers direct evidence of your work.</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
