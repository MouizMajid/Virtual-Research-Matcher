import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";

const faqs: { question: string; answer: string }[] = [
  {
    question: "Who can use VRMM?",
    answer: "VRMM is available exclusively to current Western University students and faculty/staff. Access is granted through Western's Single Sign-On (SSO) — you need an active Western email account to log in.",
  },
  {
    question: "How do I sign in?",
    answer: "Click 'Get Started' or 'Sign In' and you'll be redirected to Western University's SSO portal. Log in with your Western credentials (the same ones you use for OWL, email, etc.). No separate password is needed.",
  },
  {
    question: "What's the difference between a Student and a Researcher account?",
    answer: "Your role is determined automatically by your Western affiliation. Students can browse research postings and submit applications. Researchers (faculty and staff) can create postings, review applicants, and manage their research teams. If your affiliation changes, contact support.",
  },
  {
    question: "How do I apply to a research position?",
    answer: "First, complete your student profile — the stronger your profile, the better your application. Then browse postings, open one that interests you, and click Apply. Your profile information is sent directly to the researcher.",
  },
  {
    question: "Can I see the status of my application?",
    answer: "Yes. Go to My Applications in your dashboard to see all the positions you've applied to and their current status.",
  },
  {
    question: "How do researchers review applications?",
    answer: "Researchers can view all applicants for each of their postings from their dashboard. They can click through to each applicant's full profile and application details.",
  },
  {
    question: "Is there a limit to how many positions I can apply to?",
    answer: "There is no hard limit. However, we encourage you to apply thoughtfully — a targeted, strong application is always better than applying to everything.",
  },
  {
    question: "Is my personal information secure?",
    answer: "Yes. VRMM is hosted entirely on Western University's on-premise servers managed by Engineering IT. We do not use third-party cloud storage for personal data, no passwords are stored locally, and the platform is fully compliant with FIPPA (Freedom of Information and Protection of Privacy Act).",
  },
  {
    question: "What if a posting is out of date or I have a concern about a listing?",
    answer: "Contact support using the link in the footer. Researchers are responsible for keeping their postings current, but our team can intervene if needed.",
  },
  {
    question: "I'm a researcher. Who can see my postings?",
    answer: "Postings are visible to all logged-in Western University users. The public browse page allows anyone (without login) to see open listings, but applying requires a Western account.",
  },
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="vrmm-card overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 text-left"
      >
        <span className="font-medium">{question}</span>
        <ChevronDown className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="px-5 pb-5">
          <p className="text-sm text-muted-foreground leading-relaxed border-t border-border pt-4">{answer}</p>
        </div>
      )}
    </div>
  );
}

export default function FAQ() {
  return (
    <div>
      <section className="bg-background py-20 px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tight">
              Frequently Asked <span className="italic text-primary">Questions</span>
            </h1>
            <p className="mt-4 text-muted-foreground">
              Can't find what you're looking for?{" "}
              <Link to="/support" className="text-primary hover:underline">Contact support.</Link>
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq) => (
              <FAQItem key={faq.question} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
