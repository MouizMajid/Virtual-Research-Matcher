export default function TermsOfService() {
  return (
    <div>
      <section className="bg-background py-20 px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="mb-10">
            <h1 className="text-4xl font-bold tracking-tight">Terms of Service</h1>
            <p className="mt-2 text-sm text-muted-foreground">Last updated: July 2026</p>
          </div>

          <div className="space-y-8 text-sm text-muted-foreground leading-relaxed">
            <div className="vrmm-card p-6 space-y-3">
              <h2 className="text-base font-semibold text-foreground">1. Eligibility</h2>
              <p>
                VRMM is available exclusively to current Western University students and faculty/staff with an active Western University account. Access is provided through Western's Single Sign-On (SSO) system. By logging in, you confirm that you are authorized to use Western University's digital services.
              </p>
            </div>

            <div className="vrmm-card p-6 space-y-3">
              <h2 className="text-base font-semibold text-foreground">2. Acceptable Use</h2>
              <p>You agree to use VRMM only for its intended purpose: facilitating legitimate research connections between Western University students and researchers. You must not:</p>
              <ul className="list-disc list-inside space-y-1.5 ml-2">
                <li>Post or submit false, misleading, or fraudulent information.</li>
                <li>Use the platform to harass, spam, or contact other users outside the scope of research collaboration.</li>
                <li>Attempt to gain unauthorized access to other accounts or platform systems.</li>
                <li>Post research positions that misrepresent the nature of the work or compensation.</li>
                <li>Use the platform for commercial purposes unrelated to academic research.</li>
              </ul>
            </div>

            <div className="vrmm-card p-6 space-y-3">
              <h2 className="text-base font-semibold text-foreground">3. Researcher Responsibilities</h2>
              <p>
                Researchers who post positions are responsible for ensuring their postings are accurate, current, and compliant with Western University's policies on student employment and volunteer work. Researchers must handle applicant information with discretion and in accordance with FIPPA.
              </p>
            </div>

            <div className="vrmm-card p-6 space-y-3">
              <h2 className="text-base font-semibold text-foreground">4. Student Responsibilities</h2>
              <p>
                Students are responsible for ensuring the accuracy of their profiles and application materials. Submitting false qualifications or fabricated experience is grounds for account suspension and may be subject to Western University's academic integrity policies.
              </p>
            </div>

            <div className="vrmm-card p-6 space-y-3">
              <h2 className="text-base font-semibold text-foreground">5. Platform Availability</h2>
              <p>
                VRMM is provided as-is by Western University Engineering. We make reasonable efforts to keep the platform operational but do not guarantee uninterrupted availability. Maintenance windows, infrastructure changes, or unforeseen issues may result in temporary downtime.
              </p>
            </div>

            <div className="vrmm-card p-6 space-y-3">
              <h2 className="text-base font-semibold text-foreground">6. Account Suspension</h2>
              <p>
                The platform administrators reserve the right to suspend or terminate accounts that violate these terms, without prior notice. Decisions may be appealed by contacting support.
              </p>
            </div>

            <div className="vrmm-card p-6 space-y-3">
              <h2 className="text-base font-semibold text-foreground">7. Limitation of Liability</h2>
              <p>
                VRMM facilitates connections between students and researchers but is not a party to any employment, volunteer, or collaboration agreement that results from use of the platform. Western University is not liable for disputes arising from those arrangements.
              </p>
            </div>

            <div className="vrmm-card p-6 space-y-3">
              <h2 className="text-base font-semibold text-foreground">8. Changes to These Terms</h2>
              <p>
                These terms may be updated periodically. Continued use of the platform after changes are posted constitutes acceptance of the revised terms. Significant changes will be communicated via email.
              </p>
            </div>

            <div className="vrmm-card p-6 space-y-3">
              <h2 className="text-base font-semibold text-foreground">9. Contact</h2>
              <p>
                Questions about these terms:{" "}
                <a href="mailto:support@vrmm.eng.uwo.ca" className="text-primary hover:underline">support@vrmm.eng.uwo.ca</a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
