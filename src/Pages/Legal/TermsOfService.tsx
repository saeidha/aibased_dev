import { useEffect } from "react";
import Main, { HeadMeta } from "../Main";

export default function TermsOfService() {
  useEffect(() => {
    window.scrollTo(1, 0);
  }, []);

  return (
    <Main>
      <HeadMeta title={"Terms of Service"} />
      <section className="z-10 min-h-screen">
        <article className="text-main-text relative container mx-auto">
          <section className="p-3 mt-3 rounded-lg shadow-md">
            <h1 className="text-3xl font-bold mb-4">Terms of Service</h1>
            <p className="text-gray-400">
              Last Updated: <span className="font-semibold">03/04/2025</span>
            </p>
          </section>

          <section className="p-3 mt-3 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold">1. Introduction</h2>
            <p className="mt-2">
              Welcome to <strong>AIbased.app</strong> (“we,” “us,” or “our”). By
              accessing or using our website, products, and services
              (collectively, the “Services”), you agree to these Terms of
              Service (“Terms”). If you do not agree, please do not access or
              use our Services.
            </p>
          </section>

          <section className="p-3 mt-3 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold">2. Acceptance of Terms</h2>
            <ul className="list-disc pl-6 mt-2">
              <li>
                You confirm that you have read, understood, and agree to these
                Terms.
              </li>
              <li>
                You represent that your use of the Services is not prohibited by
                the laws of your jurisdiction or any applicable sanctions.
              </li>
            </ul>
          </section>

          <section className="p-3 mt-3 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold">
              3. Restricted Jurisdictions
            </h2>
            <div className="ml-8">
              <h3 className="text-xl font-semibold mt-4">
                1. Prohibited Countries and Regions
              </h3>
              <p className="mt-2">
                We do not provide the Services to individuals or entities
                located in countries or regions subject to comprehensive U.S. or
                EU sanctions or other relevant embargoes.
              </p>
            </div>
            <div className="ml-8">
              <h3 className="text-xl font-semibold mt-4">
                2.Disclaimer on Enforcement
              </h3>
              <p className="mt-2">
                Due to the decentralized nature of Web3, we may be unable to
                fully restrict access from these regions. However, by using our
                Services, you certify that you are not located in a prohibited
                jurisdiction.
              </p>
            </div>
          </section>

          <section className="p-3 mt-3 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold">
              4. Description of Services
            </h2>
            <p>We provide tools and features that allow users to:</p>
            <ul className="list-disc pl-6 mt-2">
              <li>Generate AI-powered prompts or images</li>
              <li>Mint NFTs on the Base blockchain</li>
              <li>
                Manage and view minted NFTs in a non-custodial, Web3 environment
              </li>
            </ul>
            <p>
              <strong>No Uploading</strong>: Currently, we do not support any
              direct file uploads; all AI generation is handled via text prompts
              and external AI services.
            </p>
          </section>

          <section className="p-3 mt-3 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold">
              5. Blockchain & Onchain Transactions
            </h2>
            <div className="ml-8">
              <h3>1. Immutable and Public</h3>
              <p className="mt-2">
                By using our Services, you acknowledge that any data or
                transactions broadcast to the Base blockchain are{" "}
                <strong>public</strong>,<strong>immutable</strong>, and{" "}
                <strong>permanent</strong>. We have no control over blockchain
                confirmations, transaction delays, or the final success/failure
                of these transactions.
              </p>
            </div>

            <div className="ml-8">
              <h3 className="text-xl font-semibold mt-4">
                2. Transaction Fees
              </h3>
              <p className="mt-2">
                You are solely responsible for any fees (e.g., gas fees)
                incurred during onchain interactions.
              </p>
            </div>

            <div className="ml-8">
              <h3 className="text-xl font-semibold mt-4">
                3. Removal Limitations
              </h3>
              <p className="mt-2">
                Once an NFT is minted or a transaction is recorded on-chain, it
                cannot be removed or altered by us.
              </p>
            </div>
          </section>

          <section className="p-3 mt-3 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold">6. Use of Crypto Wallets</h2>
            <div className="ml-8">
              <h3>1. Wallet Connection</h3>
              <p>
                Our Services typically require you to connect a compatible
                crypto wallet. We do <strong>not</strong> request signatures for
                authentication, and we do not store your wallet address on our
                servers.
              </p>
            </div>

            <div className="ml-8">
              <h3>2. Possible Sybil Address Restrictions</h3>
              <p>
                In the event we identify or suspect a wallet address is linked
                to a <strong>Sybil attack</strong> or malicious activity, we
                reserve the right to
                <strong>limit or restrict</strong> that address’s access to
                certain features. We strive to maintain a safe and user-friendly
                environment while recognizing the decentralized nature of Web3.
              </p>
            </div>
          </section>

          <section className="p-3 mt-3 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold">
              7. User Obligations & Privacy
            </h2>
            <div className="ml-8">
              <h3>1. Anonymity and Identity</h3>
              <p>
                We understand users may choose to remain pseudonymous. We do not
                require personal information like name or email, except if you
                voluntarily provide it for support or future optional features.
              </p>
            </div>

            <div className="ml-8">
              <h3>2. Accuracy of Information</h3>
              <p>
                Should you provide any personal details (e.g., optional email),
                you agree to provide accurate and up-to-date information.
              </p>
            </div>

            <div className="ml-8">
              <h3>3. Compliance with Local Laws</h3>
              <p>
                You are responsible for abiding by all applicable laws and
                regulations, including sanctions and restrictions in your local
                jurisdiction.
              </p>
            </div>
          </section>

          <section className="p-3 mt-3 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold">8. Prohibited Uses</h2>

            <div className="ml-8">
              <h3>1. Illegal or Harmful Activities</h3>
              <p>
                You agree not to use the Services for any unlawful, fraudulent,
                or malicious purpose. This includes creating or sharing content
                that promotes violence, discrimination, or other illegal
                activities.
              </p>
            </div>

            <div className="ml-8">
              <h3>2. Pornographic or Sexual Content</h3>
              <p>
                We do not permit the creation or promotion of explicit, sexual
                content in violation of applicable laws or community standards.
                If such content is found, we reserve the right to block the user
                interface from displaying it or restrict the associated
                addresses.{" "}
                <strong>Note that on-chain data cannot be removed.</strong>
              </p>
            </div>

            <div className="ml-8">
              <h3>3. Security Violations</h3>
              <p>
                You agree not to interfere with or disrupt the Services, attempt
                to bypass security measures, or reverse-engineer any part of the
                platform.
              </p>
            </div>
          </section>

          <section className="p-3 mt-3 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold">
              9. Ownership & Intellectual Property
            </h2>

            <div className="ml-8">
              <h3>1. Platform IP</h3>
              <p>
                All trademarks, logos, software code, and other intellectual
                property related to our Services are owned or licensed by us or
                their respective owners.
              </p>
            </div>

            <div className="ml-8">
              <h3>2. User-Generated Content</h3>
              <p>
                Any art you generate or mint via AI prompts remains your
                intellectual property, subject to blockchain rules. By creating
                or showcasing content through our Services, you grant us a
                <strong>non-exclusive</strong>, royalty-free right to display it
                for operating or promoting the platform.
              </p>
            </div>
          </section>

          <section className="p-3 mt-3 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold">
              10. Acknowledgment of the Base Network
            </h2>
            <p className="ml-8">
              Base is an Ethereum Layer 2 (L2) that offers low-cost,
              builder-friendly onchain solutions. Any references to “Base”
              within our Services or documentation are made solely to indicate
              compatibility or interaction. We do not claim a formal partnership
              or collaboration with Base unless explicitly stated otherwise. All
              Base-related trademarks and intellectual property belong to their
              respective holders.
            </p>
          </section>

          <section className="p-3 mt-3 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold">
              11. Service Reliability & Disclaimer of Warranties
            </h2>
            <p className="ml-8">
              We work diligently to provide a secure, stable, and reliable
              platform. However, our Services are ultimately provided on an “as
              is” and “as available” basis. We make no guarantees that our
              Services will operate without interruption or error at all times.
              To the fullest extent permitted by law, we disclaim any implied
              warranties of merchantability, fitness for a particular purpose,
              and non-infringement.
            </p>
          </section>

          <section className="p-3 mt-3 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold">
              12. Limitation of Liability
            </h2>
            <p className="ml-8">
              To the fullest extent allowed by applicable law, we, our
              affiliates, and licensors shall not be liable for any indirect,
              incidental, or consequential damages (including lost profits, data
              loss, or business interruption) arising from or related to your
              use of our Services, even if advised of the possibility of such
              damages.
            </p>
          </section>

          <section className="p-3 mt-3 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold">13. Indemnification</h2>
            <p className="ml-8">
              You agree to indemnify and hold harmless{" "}
              <a href="/" className="text-blue-400 mx-1" target="_blank">
                AIbased.app
              </a>
              , its affiliates, employees, agents, and service providers from
              any claims, damages, or expenses arising out of (a) your use of
              the Services; (b) your breach of these Terms; or (c) your
              violation of any third party rights or any applicable law.
            </p>
          </section>

          <section className="p-3 mt-3 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold">14. Termination</h2>
            <p className="ml-8">
              We reserve the right to suspend or terminate your access to our
              Services at any time, with or without notice, for any reason,
              including but not limited to suspected Sybil activity, legal
              requirements, or violations of these Terms.
            </p>
          </section>

          <section className="p-3 mt-3 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold">
              15. Compliance with Law Enforcement & Additional Policies
            </h2>
            <p className="ml-8">
              If a court order or any legal authority (including U.S. courts or
              EU regulators) lawfully requests user information, we may be
              <strong>required</strong> to comply. Due to our minimal data
              collection, we may only provide what we actually have (if
              anything). For further details on how we handle user data, please
              see our <strong>Privacy Policy </strong>
              at{" "}
              <a
                href="/privacy-policy"
                className="text-blue-400 mx-1"
                target="_blank"
              >
                https://aibased.app/privacy-policy
              </a>
              or contact us for more information.
            </p>
          </section>

          <section className="p-3 mt-3 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold">
              16. Modifications to the Terms
            </h2>
            <p className="ml-8">
              We may update or revise these Terms at any time. The most recent
              version will always be available at
              <a
                href="/terms-of-service"
                className="text-blue-400 mx-1"
                target="_blank"
              >
                terms
              </a>
              . By continuing to use the Services after an update, you agree to
              the revised Terms.
            </p>
          </section>

          <section className="p-3 mt-3 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold">
              17. Governing Law & Dispute Resolution
            </h2>
            <p className="ml-8">
              These Terms shall be interpreted in accordance with
              internationally accepted legal principles. We encourage users to
              reach out to us first to resolve any disputes amicably. If a
              dispute requires formal resolution, the applicable legal
              jurisdiction and dispute resolution method shall be determined on
              a case-by-case basis, taking into account the nature of the
              dispute, the parties involved, and widely recognized international
              legal frameworks.
            </p>
          </section>

          <section className="p-3 mt-3 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold">18. Contact Us</h2>
            <p className="ml-8">
              For questions about these Terms or to request clarifications,
              please reach out at{" "}
              <a href="mailto:terms@aibased.app" className="text-blue-400 mx-1">
                terms@aibased.app
              </a>
              .
            </p>
          </section>
        </article>
      </section>
    </Main>
  );
}
