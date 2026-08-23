export default function PrivacyPolicy() {
  return (
    <div>
      <section className="bg-background py-20 px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="mb-10">
            <h1 className="text-4xl font-bold tracking-tight">Privacy Policy</h1>
            <p className="mt-2 text-sm text-muted-foreground">Last updated: July 2026</p>
          </div>

          <div className="space-y-8 text-sm text-muted-foreground leading-relaxed">
            <div className="vrmm-card p-6 space-y-3">
              <h2 className="text-base font-semibold text-foreground">Overview</h2>
              <p>
                The Virtual Research Match Maker (VRMM) is an internal platform operated by Western University and hosted entirely on Western University's on-premise infrastructure. This policy describes what personal information we collect, how we use it, and your rights under the <em>Freedom of Information and Protection of Privacy Act</em> (FIPPA).
              </p>
              <p>
                VRMM has been reviewed and approved by Western University's Technology Risk Assessment Committee (TRAC) and Privacy Impact Assessment (PIA) process.
              </p>
            </div>

            <div className="vrmm-card p-6 space-y-3">
              <h2 className="text-base font-semibold text-foreground">Information We Collect</h2>
              <p>We collect only the information necessary to operate the platform:</p>
              <ul className="list-disc list-inside space-y-1.5 ml-2">
                <li><strong className="text-foreground">Identity information</strong> — your name and Western email address, provided by Western University's Single Sign-On (SSO) system upon login.</li>
                <li><strong className="text-foreground">Role information</strong> — your Western affiliation (student or faculty/staff), used to determine your access level.</li>
                <li><strong className="text-foreground">Profile information</strong> — information you voluntarily enter: headline, bio, skills, experience, university department, and social links.</li>
                <li><strong className="text-foreground">Application data</strong> — the research positions you apply to and any information submitted as part of those applications.</li>
              </ul>
              <p>We do <strong className="text-foreground">not</strong> store passwords. Authentication is handled entirely by Western University's SSO.</p>
            </div>

            <div className="vrmm-card p-6 space-y-3">
              <h2 className="text-base font-semibold text-foreground">How We Use Your Information</h2>
              <ul className="list-disc list-inside space-y-1.5 ml-2">
                <li>To authenticate you and grant role-appropriate access to the platform.</li>
                <li>To display your profile to researchers when you apply to their postings.</li>
                <li>To allow researchers to manage applicants for their research positions.</li>
                <li>To send transactional emails (e.g., application status updates).</li>
              </ul>
              <p>We do not use your information for advertising, analytics sold to third parties, or any purpose unrelated to the operation of this platform.</p>
            </div>

            <div className="vrmm-card p-6 space-y-3">
              <h2 className="text-base font-semibold text-foreground">Data Storage & Security</h2>
              <p>
                All data is stored on servers located at Western University and managed by Western Engineering IT. Data is not transferred to or stored on third-party cloud services. Access to the production database is restricted to the application itself and authorized Engineering IT staff.
              </p>
              <p>
                All data transmitted between your browser and the platform is encrypted via HTTPS (TLS 1.2/1.3).
              </p>
            </div>

            <div className="vrmm-card p-6 space-y-3">
              <h2 className="text-base font-semibold text-foreground">Data Retention</h2>
              <p>
                Your account and associated profile data are retained as long as you have an active Western University affiliation. Application records are retained for the duration of the relevant research project period. You may request deletion of your profile data by contacting support.
              </p>
            </div>

            <div className="vrmm-card p-6 space-y-3">
              <h2 className="text-base font-semibold text-foreground">Your Rights (FIPPA)</h2>
              <p>Under FIPPA, you have the right to:</p>
              <ul className="list-disc list-inside space-y-1.5 ml-2">
                <li>Request access to the personal information we hold about you.</li>
                <li>Request correction of inaccurate information.</li>
                <li>File a complaint with the Information and Privacy Commissioner of Ontario.</li>
              </ul>
              <p>To exercise these rights, contact the Western University Privacy Office or email our support team.</p>
            </div>

            <div className="vrmm-card p-6 space-y-3">
              <h2 className="text-base font-semibold text-foreground">Contact</h2>
              <p>
                Questions about this privacy policy can be directed to{" "}
                <a href="mailto:support@vrmm.eng.uwo.ca" className="text-primary hover:underline">support@vrmm.eng.uwo.ca</a>.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
