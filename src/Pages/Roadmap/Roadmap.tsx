import { useEffect } from "react";
import Main, { HeadMeta } from "../Main";
import saeed from "../../assets/images/roadmap/teams/saeed.png";
import costantino from "../../assets/images/roadmap/teams/costantino.png";
import jess from "../../assets/images/roadmap/teams/jess.png";
import joel from "../../assets/images/roadmap/teams/joel.png";
import nasran from "../../assets/images/roadmap/teams/nasran.png";
import nikan from "../../assets/images/roadmap/teams/nikan.png";
import sajad from "../../assets/images/roadmap/teams/sajad.png";

type Props = {};

export default function Roadmap({}: Props) {
  const teamMembers = [
    {
      image: saeed,
      name: "Saeid Hosseinabadi",
      role: "Co-Founder",
      skill: "Smart contract development",
    },
    {
      image: nasran,
      name: "Navid Dashsooz",
      role: "CEO",
      skill: "Business leadership",
    },
    {
      image: costantino,
      name: "Costantino Testa",
      role: "Co-Founder",
      skill: "Community Manager",
    },
    {
      image: sajad,
      name: "Sajad Salamian",
      role: "Website Programmer",
      skill: "Web design",
    },
    {
      image: joel,
      name: "Joel Miller",
      role: "UI/UX Designer",
      skill: "Graphic Designer",
    },
    {
      image: jess,
      name: "Sonia",
      role: "Marketing Manager",
      skill: "Team management",
    },
    {
      image: nikan,
      name: "Nikan",
      role: "Research & Development",
      skill: "Technical research",
    },
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Main>
      <HeadMeta title={"Roadmap"} />
      <section className="z-10 min-h-screen">
        <article className="text-main-text relative">
          <section className="mb-10 container mx-auto">
            <h1 className="text-3xl mb-2">
              Milestone 2025: AiBased Updated Roadmap & Comprehensive Overview
            </h1>
            <p>
              Our roadmap for 2025 integrates advanced AI, dynamic NFTs, and
              blockchain functionalities, crafted to deliver exceptional user
              experiences. Each quarter outlines detailed, innovative features
              with clear technical insights:
            </p>
          </section>
          <div className="my-10 text-white bg-primary">
            <div className="  container mx-auto">
              {/* Quarter 1 */}
              <section className="sticky p-2 top-0 bg-primary">
                <h2 className="text-2xl">
                  Q1 (2025): Alpha Launch & Core Innovation
                </h2>
                <ul className="list-disc ml-10 mb-5">
                  <li className="font-bold my-5">
                    AI NFT Generator
                    <ul className="list-disc ml-10 mb-5">
                      <li>
                        <strong>Feature Brief</strong>: Instantly generate
                        unique NFTs from text prompts.
                      </li>
                      <li>
                        <strong>Technical Insight</strong>: Advanced off-chain
                        AI models paired with efficient and scalable cloud
                        hosting for real-time image generation
                      </li>
                    </ul>
                  </li>

                  <li className="font-bold my-5">
                    AI Assist
                    <ul className="list-disc ml-10 mb-5">
                      <li>
                        <strong>Feature Brief</strong>: Intelligent chatbot
                        assists users in refining effective prompts for optimal
                        NFT results.
                      </li>
                      <li>
                        <strong>Technical Insight</strong>: Powered by external
                        LLM APIs initially, transitioning to a customized,
                        in-house LLM model optimized for NFT creation.
                      </li>
                    </ul>
                  </li>

                  <li className="font-bold my-5">
                    MintPad
                    <ul className="list-disc ml-10 mb-5">
                      <li>
                        <strong>Feature Brief</strong>: User-friendly, no-code
                        NFT minting platform on Base network.
                      </li>
                      <li>
                        <strong>Technical Insight</strong>: Simplified minting
                        process integrated directly with users' crypto wallets,
                        enabling immediate minting without technical knowledge.
                      </li>
                    </ul>
                  </li>
                </ul>
              </section>
              {/* Quarter 2 */}
              <section className="sticky p-2 top-10 bg-primary">
                <h2 className="text-2xl">
                  Q2 (2025): Personalization & Deeper Engagement
                </h2>
                <ul className="list-disc ml-10 mb-5">
                  {/* Dynamic */}
                  <li className="font-bold my-5">
                    Dynamic Unique NFT
                    <ul className="list-disc ml-10 mb-5">
                      <li>
                        <strong>Feature Brief</strong>: Exclusive NFTs evolving
                        visually based on individual user blockchain
                        interactions and achievements.
                      </li>
                      <li>
                        <strong>Technical Insight</strong>: Smart contracts
                        dynamically adjust NFT metadata in response to specific
                        blockchain activities and milestones.
                      </li>
                    </ul>
                  </li>
                  {/* AI NFT Frames for Warpcast */}
                  <li className="font-bold my-5">
                    AI NFT Frames (Warpcast Integration)
                    <ul className="list-disc ml-10 mb-5">
                      <li>
                        <strong>Feature Brief</strong>: Enables users to
                        showcase and mint NFTs directly via interactive frames
                        embedded in Warpcast.
                      </li>
                      <li>
                        <strong>Technical Insight</strong>: Implementation of
                        lightweight blockchain widgets for real-time NFT
                        interactions and transactions within Warpcast.
                      </li>
                    </ul>
                  </li>
                  {/* User Profiles & Social Reputation */}
                  <li className="font-bold my-5">
                    User Profiles & Social Reputation
                    <ul className="list-disc ml-10 mb-5">
                      <li>
                        <strong>Feature Brief</strong>: Introduce engaging user
                        profiles featuring social interactions, achievement
                        tracking, and gamification elements.
                      </li>
                      <li>
                        <strong>Technical Insight</strong>: Secure profile
                        management on-chain, gamification via blockchain-based
                        points rewarded for user activity and contribution.
                      </li>
                    </ul>
                  </li>
                </ul>
              </section>
              {/* Quarter 3*/}
              <section className="sticky p-2 top-20 bg-primary">
                <h2 className="text-2xl">
                  Q3 (2025): Narrative NFTs & Intelligent Insights
                </h2>
                <ul className="list-disc ml-10 mb-5">
                  {/* NFT Storytelling Series */}
                  <li className="font-bold my-5">
                    NFT Storytelling Series
                    <ul className="list-disc ml-10 mb-5">
                      <li>
                        <strong>Feature Brief</strong>: Narrative-driven NFTs
                        grouped under unified, collectible "Mega NFTs," each NFT
                        representing a unique story chapter.
                      </li>
                      <li>
                        <strong>Technical Insight</strong>: Structured smart
                        contracts managing complex token relationships and
                        storytelling metadata, enhancing collectability and user
                        engagement.
                      </li>
                    </ul>
                  </li>
                  {/*  Enhanced AI Assist: Onchain Trend & Wallet Analytics */}
                  <li className="font-bold my-5">
                    Enhanced AI Assist: Onchain Trend & Wallet Analytics
                    <ul className="list-disc ml-10 mb-5">
                      <li>
                        <strong>Feature Brief</strong>: Custom-built AI model
                        analyzing Base blockchain data to provide personalized
                        NFT insights and wallet-based recommendations.
                      </li>
                      <li>
                        <strong>Technical Insight</strong>: Proprietary
                        analytical AI trained on blockchain transaction data,
                        paired with LLM interfaces for intuitive and actionable
                        user interaction.
                      </li>
                    </ul>
                  </li>
                </ul>
              </section>
              {/* Quarter 4 */}
              <section className="sticky p-2 top-32 bg-primary">
                <h2 className="text-2xl">
                  Q4 (2025): AI-Powered Automation & Mobile Accessibility
                </h2>
                <ul className="list-disc ml-10 mb-5">
                  {/* Unified AI Agent (Integration of Assist & Agent) */}
                  <li className="font-bold my-5">
                    Unified AI Agent (Integration of Assist & Agent)
                    <ul className="list-disc ml-10 mb-5">
                      <li>
                        <strong>Feature Brief</strong>: Comprehensive AI
                        assistant automating blockchain interactions and NFT
                        activities, guided by user approvals.
                      </li>
                      <li>
                        <strong>Technical Insight</strong>: Specialized smart
                        contracts allowing AI to autonomously execute
                        transactions, such as minting, buying, or selling NFTs,
                        based on user-defined parameters and approvals
                      </li>
                    </ul>
                  </li>
                  {/*Mobile Application Launch (iOS & Android) */}
                  <li className="font-bold my-5">
                    Mobile App for iOS & Android
                    <ul className="list-disc ml-10 mb-5">
                      <li>
                        <strong>Feature Brief</strong>: Dedicated cross-platform
                        AiBased apps offering full platform functionality and
                        seamless blockchain interactions.
                      </li>
                      <li>
                        <strong>Technical Insight</strong>: Optimized app
                        architecture ensuring secure wallet connections, minimal
                        latency, and full access to platform features, including
                        AI generation, NFT management, and AI agent automation.
                      </li>
                    </ul>
                  </li>
                </ul>
              </section>
            </div>
          </div>

          {/* Competitive Advantages */}
          <section className="my-10 container mx-auto">
            <h2>Competitive Advantages</h2>
            <ul className="list-disc ml-10 mb-5">
              <li>
                <strong>Integrated AI & Blockchain</strong>: Comprehensive
                solutions from intelligent NFT generation to automated
                transaction management.
              </li>
              <li>
                <strong>Innovative NFT Mechanics</strong>
                Unique features like Dynamic NFTs and NFT Storytelling provide
                distinct value in the NFT landscape
              </li>
              <li>
                <strong>User-Friendly & Accessible</strong>
                Simple, intuitive design with minimal friction, welcoming new
                users and seasoned collectors alike.
              </li>
              <li>
                <strong>Robust & Scalable Technology</strong>
                Utilizing advanced hosting infrastructure and progressively
                upgraded AI capabilities for reliable performance.
              </li>
              <li>
                <strong>Security & Trust</strong>
                Leveraging audited smart contracts and cryptographic best
                practices to ensure secure transactions and protect user assets.
              </li>
            </ul>
          </section>
          {/* Potential Risks & Adaptability */}
          <section className="my-10 container mx-auto">
            <h2>Potential Risks & Adaptability</h2>
            <p>
              While milestones are strategically planned, unforeseen market
              dynamics, technological challenges, or regulatory requirements may
              necessitate adjustments. Our agile approach ensures flexibility,
              responsiveness, and continuous improvement to maintain momentum
              and sustainability.
            </p>
          </section>
          {/* Join Us on the Next Frontier */}
          <section className="my-10 container mx-auto">
            <h2>Join Our Vision</h2>
            <p>
              We invite <strong>investors</strong>, <strong>developers</strong>,
              and <strong>enthusiasts</strong> to join our journey as we
              redefine creativity and interaction onchain. Explore our
              community, and stay updated as we build the future together.
            </p>
            <p>
              Connect with us: [
              <a
                href="https://aibased.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline mx-1"
              >
                Website
              </a>
              |
              <a
                href="https://discord.gg/Rj7Bn3BgNP"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline mx-1"
              >
                Join now
              </a>
              ]
            </p>
            {/* <ul className="list-disc ml-10 mb-5">
              <li>
                <strong>Connect Now </strong>
                to discuss investment opportunities.
              </li>
              <li>
                <strong>Follow Our Updates </strong>
                to stay informed about upcoming features, partnerships, and
                releases.
              </li>
            </ul>
            <p>
              Together, we can redefine the power of AI, NFTs, and
              blockchain—one milestone at a time.
            </p>
            <p>
              If you have any further question, feel free to ask in our discord
              channel
            </p>
            <a
              href="https://discord.gg/Rj7Bn3BgNP"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
            >
              Join now
            </a> */}
          </section>
        </article>
        {/* our team */}
        {/* <section className="container mx-auto my-20 text-main-text">
          <h2 className="text-center text-4xl mb-16">Meet Our Team</h2>
          <div className="flex justify-center gap-16 mb-16">
            {teamMembers.slice(0, 3).map((member) => (
              <div
                key={member.name}
                className="flex flex-col items-center text-center"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-48 h-48 mb-8 rounded-full"
                />
                <p className="font-semibold mb-2">{member.name}</p>
                <p className="text-sm text-gray-300 mb-2">{member.role}</p>
                <p className="text-xs text-gray-400 mb-2">{member.skill}</p>
              </div>
            ))}
          </div> */}

          {/* Second Row - 4 Columns */}
          {/* <div className="flex justify-center gap-16 mb-16">
            {teamMembers.slice(3).map((member) => (
              <div
                key={member.name}
                className="flex flex-col items-center text-center"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-48 h-48 mb-8 rounded-full"
                />
                <p className="font-semibold mb-2">{member.name}</p>
                <p className="text-sm text-gray-300 mb-2">{member.role}</p>
                <p className="text-xs text-gray-400 mb-2">{member.skill}</p>
              </div>
            ))}
          </div> */}
        {/* </section> */}
      </section>
    </Main>
  );
}
