import { Link } from "react-router-dom";
import { Mail, FileQuestion, ExternalLink } from "lucide-react";

export default function Support() {
  return (
    <div>
      <section className="bg-background py-20 px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tight">
              <span className="italic text-primary">Support</span>
            </h1>
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
              We're here to help. Reach out through the appropriate channel below depending on the nature of your issue.
            </p>
          </div>

          <div className="space-y-4">
            {/* Platform support */}
            <div className="vrmm-card p-6 flex gap-5">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <Mail className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h2 className="font-semibold">Platform Questions & Bug Reports</h2>
                <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                  Issues with the VRMM platform itself — broken features, account problems, incorrect postings, or anything application-related.
                </p>
                <a
                  href="mailto:support@vrmm.eng.uwo.ca"
                  className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
                >
                  support@vrmm.eng.uwo.ca
                </a>
              </div>
            </div>

            {/* SSO / Login */}
            <div className="vrmm-card p-6 flex gap-5">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <ExternalLink className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h2 className="font-semibold">Login & SSO Issues</h2>
                <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                  Can't sign in with your Western credentials? Problems with your Western account (password, MFA, account locked) are handled by Western Technology Services, not VRMM.
                </p>
                <a
                  href="https://wts.uwo.ca"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
                >
                  Western Technology Services (WTS) <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>

            {/* FAQ */}
            <div className="vrmm-card p-6 flex gap-5">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <FileQuestion className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h2 className="font-semibold">General Questions</h2>
                <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                  Have a general question about how the platform works? Check the FAQ first — most common questions are answered there.
                </p>
                <Link
                  to="/faq"
                  className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
                >
                  View FAQ
                </Link>
              </div>
            </div>
          </div>

          <p className="mt-8 text-center text-xs text-muted-foreground">
            VRMM is an internal Western University platform. Support is provided on a best-effort basis by the development team.
          </p>
        </div>
      </section>
    </div>
  );
}
