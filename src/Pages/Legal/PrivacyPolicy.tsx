import React, { useEffect } from "react";
import Main, { HeadMeta } from "../Main";

export default function PrivacyPolicy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Main>
      <HeadMeta title={"Privacy Policy"} />
      <section className="z-10 min-h-screen">
        <article className="text-main-text relative container mx-auto">
          <h1 className="text-3xl">Privacy Policy</h1>
          <p>Last Updated: [2/23/2025] </p>
          {/* 1. Introduction */}
          <section className="my-5">
            <h2 className="text-xl">1. Introduction</h2>
            <p>
              Welcome to AIbased.app (“we,” “us,” or “our”). This Privacy Policy
              explains how we handle your information when you connect your
              wallet and use our AI-based NFT services. We aim to keep your data
              safe and respect your privacy.
            </p>
          </section>
          {/* 2. Information We Collect */}
          <section className="mb-5">
            <h2 className="text-xl">2. Information We Collect</h2>
            <ul className="pl-10">
              <li className="list-decimal font-bold">Wallet Connection Only</li>
              <ul className="pl-10">
                <li className="list-disc">
                  We allow you to connect your crypto wallet to access our
                  platform. We do not request your name, email, or any other
                  personal details unless you choose to share them later (e.g.,
                  an optional email for updates).
                </li>
                <li className="list-disc">
                  We do not request any signature from your wallet for
                  authentication. This reduces the risk of malicious signature
                  requests.
                </li>
              </ul>
              <li className="list-decimal font-bold">No User Data Storage</li>
              <ul className="pl-10">
                <li className="list-disc">
                  We do not store your wallet address or any personal data on
                  our servers. Your address is used temporarily during your
                  session to enable platform features.
                </li>
              </ul>
              <li className="list-decimal font-bold">
                AI Prompts & NFT Generation{" "}
              </li>
              <ul className="pl-10">
                <li className="list-disc">
                  You can create NFT images by sending prompts to external AI
                  services. We do not see or store these prompts or images on
                  our servers; the AI provider handles them under their own
                  privacy policy.
                </li>
                <li className="list-disc">
                  Generated NFT metadata (attributes) is stored on IPFS, making
                  it publicly accessible and permanent once minted.
                </li>
              </ul>
            </ul>
          </section>
          {/* 3. How We Use (or Don’t Use) Your Information */}
          <section className="mb-5">
            <h2 className="text-xl">
              3. How We Use (or Don’t Use) Your Information
            </h2>
            <ul className="pl-10">
              <li className="list-disc">
                <strong>Service Provision:</strong> We temporarily handle your
                connected wallet session so you can access the AI-based
                generation tools and mint NFTs.
              </li>
              <li className="list-disc">
                <strong>No Internal Storage:</strong> Since we do not store
                personal data, there is no additional usage for profiling,
                analytics, or direct marketing at this time.
              </li>
              <li className="list-disc">
                <strong>Future Optional Email:</strong> If you provide an email
                address in the future (purely optional), we may use it to send
                you updates or announcements.
              </li>
            </ul>
          </section>
          {/* 4. Data Sharing & Disclosure */}
          <section className="mb-5">
            <h2 className="text-xl">4. Data Sharing & Disclosure </h2>
            <ul className="pl-10">
              <li className="list-disc">
                <strong>Third-Party AI Services:</strong> All AI prompts are
                processed by external providers. For details on how they handle
                user data, please refer to their respective privacy policies.
              </li>
              <li className="list-disc">
                <strong>IPFS</strong> Once NFT metadata is stored on IPFS or the
                blockchain, it cannot be removed or altered by us.
              </li>
              <li className="list-disc">
                <strong>Business Transfers or Legal Reasons:</strong> If
                required by law, or in the event of a business change
                (merger/acquisition), minimal information we hold (if any) could
                be transferred or disclosed.
              </li>
            </ul>
          </section>
          {/* 5. User Rights & On-Chain Limitations*/}
          <section className="mb-5">
            <h2 className="text-xl">5. User Rights & On-Chain Limitations</h2>
            <ul className="pl-10">
              <li className="list-disc">
                <strong>No Stored Data to Delete:</strong> We generally do not
                store personal information. However, if you voluntarily provided
                an email and want it removed, contact us via the email below,
                and we will delete it (subject to technical feasibility).
              </li>
              <li className="list-disc">
                <strong>Immutable Blockchain Data:</strong> Any data written to
                the blockchain or IPFS is beyond our control and cannot be
                removed or edited by us.
              </li>
            </ul>
          </section>
          {/* 6. Cookies & Tracking */}
          <section className="mb-5">
            <h2 className="text-xl">6. Cookies & Tracking</h2>
            <ul className="pl-10">
              <li className="list-disc">
                <strong>Session Cookies Only:</strong> We use basic, short-lived
                session cookies to manage your connection while you’re on our
                site. These cookies are stored in your browser, and we do not
                have access to them. When you disconnect your wallet or your
                session ends, the cookies are cleared.
              </li>
              <li className="list-disc">
                <strong>No Cookie Consent Banner:</strong> We currently do not
                offer a cookie banner, as we do not use tracking or analytics
                cookies.
              </li>
            </ul>
          </section>
          {/* 7. Contact Us */}
          <section className="mb-5">
            <h2 className="text-xl">7. Contact Us</h2>
            <p>
              If you have any questions or concerns about this Privacy Policy,
              or if you wish to provide (or remove) an optional email address,
              please
            </p>
            <p className="font-bold">
              contact us at: Email:{" "}
              <a href="mailto:privacy@AIbased.app" className="text-primary">
                privacy@AIbased.app
              </a>
            </p>
          </section>
          {/* 8. Changes to This Policy */}
          <section className="mb-5">
            <h2 className="text-xl">8. Changes to This Policy </h2>
            <p>
              We may update this Privacy Policy from time to time. Any changes
              will be reflected by the “Last Updated” date at the top of this
              page. By continuing to use the platform after updates are posted,
              you accept the revised policy.
            </p>
          </section>
        </article>
      </section>
    </Main>
  );
}
