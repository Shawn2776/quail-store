export const metadata = {
  title: "Privacy Policy — 2776 Quail Co.",
};

export default function PrivacyPage() {
  return (
    <div className="bg-white">
      <div className="max-w-[800px] mx-auto px-4 py-16">
        <h1 className="text-3xl md:text-4xl font-display font-extrabold mb-2">Privacy Policy</h1>
        <p className="text-black/50 text-sm mb-10">Last updated: August 2026</p>

        <div className="space-y-8 text-black/70 leading-relaxed">
          <section>
            <h2 className="text-xl font-display font-extrabold text-black mb-2">What we collect</h2>
            <p>
              When you create an account, we collect your name and email address through our account provider, Clerk. If
              you sign in with Google, Google shares your name, email, and profile photo with us for that purpose.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-display font-extrabold text-black mb-2">Site analytics</h2>
            <p>
              We use Vercel Analytics to see general traffic patterns — which pages get visited and which buttons get
              clicked (like &quot;Add to cart&quot;). This data is aggregated and not tied to your name or account.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-display font-extrabold text-black mb-2">Session recordings</h2>
            <p>
              We use Microsoft Clarity to record anonymized sessions of how visitors use our site — mouse movement,
              clicks, and scrolling — so we can spot confusing parts of the site and fix them. Clarity automatically
              masks sensitive fields like passwords and payment information. These recordings are not linked to your
              name unless you were signed in during that session.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-display font-extrabold text-black mb-2">What we don&apos;t do</h2>
            <p>
              We don&apos;t sell your information to anyone. We don&apos;t ship or share your data outside the tools
              listed on this page.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-display font-extrabold text-black mb-2">Cookies</h2>
            <p>
              Our account system, analytics, and session-recording tools each use cookies to function. By using this
              site, you consent to that use.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-display font-extrabold text-black mb-2">Contact</h2>
            <p>Questions about this policy? Reach out through the contact information on our site.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
