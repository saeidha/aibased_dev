import { Link } from "react-router-dom";
import Logo from "../assets/images/logo.png";

export default function RoadmapSection() {
  return (
    <div>
      <section className="my-10 hidden md:!block">
        <div className="container mx-auto">
          <h2 className="grid grid-cols-3 justify-center items-center">
            <span className="text-[50px] text-primary text-right">
              AI Based
            </span>
            <div className="flex justify-center">
              <img src={Logo} alt="" className="w-48 h-48" />
            </div>
            <span className="text-[50px] text-primary text-left">Roadmap</span>
          </h2>
          {/* Timeline */}

          <div className="container mx-auto w-full h-full">
            <div className="relative wrap overflow-hidden p-10 h-full">
              <div
                className="border-2-2 absolute border-opacity-20 border-main-text h-full border"
                style={{ left: "50%" }}
              ></div>

              {/* <!-- left timeline --> */}
              <div className="mb-8 flex justify-between flex-row-reverse items-center w-full left-timeline">
                <div className="order-1 w-5/12"></div>
                <div className="z-20 flex items-center order-1 bg-primary shadow-xl w-8 h-8 rounded-full">
                  {/* <span className="mx-autofont-semibold text-lg"></span> */}
                </div>
                <div className="order-1 bg-primary drop-shadow-xl rounded-2xl shadow-xl w-5/12 px-6 py-8 relative">
                  <span className="text-white absolute top-4 right-4 text-xl">
                    Q1
                  </span>
                  <ul className="mt-5">
                    <li className="text-white text-xl mb-3 list-disc ml-4">
                      AI NFT Generator
                    </li>
                    <li className="text-white text-xl mb-3 list-disc ml-4">
                      AI Assist Chatbot
                    </li>
                    <li className="text-white text-xl mb-3 list-disc ml-4">
                      MintPad (No-Code Minting)
                    </li>
                  </ul>
                </div>
              </div>

              {/* <!-- right timeline --> */}
              <div className="mb-8 flex justify-between items-center w-full right-timeline">
                <div className="order-1 w-5/12"></div>
                <div className="z-20 flex items-center order-1 shadow-xl w-8 h-8 rounded-full border border-main-text bg-background">
                  {/* <span className="mx-auto font-semibold text-lg">V2</span> */}
                </div>
                <div className="order-1 bg-primary drop-shadow-xl rounded-2xl shadow-xl w-5/12 px-6 py-8 relative">
                  <span className="text-white absolute top-4 right-4 text-xl">
                    Q2
                  </span>
                  <ul className="mt-5">
                    <li className="text-white text-xl mb-3 list-disc ml-4">
                      Dynamic Unique NFTs
                    </li>
                    <li className="text-white text-xl mb-3 list-disc ml-4">
                      Warpcast NFT Frames
                    </li>
                    <li className="text-white text-xl mb-3 list-disc ml-4">
                      User Profiles & Social Reputation
                    </li>
                  </ul>
                </div>
              </div>

              {/* <!-- left timeline --> */}
              <div className="mb-8 flex justify-between flex-row-reverse items-center w-full left-timeline">
                <div className="order-1 w-5/12"></div>
                <div className="z-20 flex items-center order-1 shadow-xl w-8 h-8 rounded-full border border-main-text bg-background">
                  {/* <span className="mx-auto text-white font-semibold text-lg">
                V3
              </span> */}
                </div>
                <div className="order-1 bg-primary drop-shadow-xl rounded-2xl shadow-xl w-5/12 px-6 py-8 relative">
                  <span className="text-white absolute top-4 right-4 text-xl">
                    Q3
                  </span>
                  <ul className="mt-5">
                    <li className="text-white text-xl mb-3 list-disc ml-4">
                      NFT Storytelling Collections
                    </li>
                    <li className="text-white text-xl mb-3 list-disc ml-4">
                      Enhanced AI Assist (Trend & Wallet Analytics)
                    </li>
                  </ul>
                </div>
              </div>

              {/* <!-- right timeline --> */}
              <div className="mb-8 flex justify-between items-center w-full right-timeline">
                <div className="order-1 w-5/12"></div>
                <div className="z-20 flex items-center order-1 shadow-xl w-8 h-8 rounded-full border border-main-text bg-background">
                  {/* <span className="mx-auto font-semibold text-lg">V2</span> */}
                </div>
                <div className="order-1 bg-primary drop-shadow-xl rounded-2xl shadow-xl w-5/12 px-6 py-8 relative">
                  <span className="text-white absolute top-4 right-4 text-xl">
                    Q4
                  </span>
                  <ul className="mt-5">
                    <li className="text-white text-xl mb-3 list-disc ml-4">
                      Unified AI Agent (Automation & Interaction)
                    </li>
                    <li className="text-white text-xl mb-3 list-disc ml-4">
                      Mobile App (iOS & Android)
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <Link
              to={"/roadmap"}
              className=" w-16 h-16 rounded-full bg-primary text-white text-center pt-2"
            >
              See More
            </Link>
          </div>
        </div>
      </section>

      <section className="my-6 sm:my-10 md:hidden">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="flex flex-col sm:grid sm:grid-cols-3 justify-center items-center text-center sm:text-left">
            <span className="text-3xl sm:text-4xl lg:text-[50px] text-primary sm:text-right mb-4 sm:mb-0">
              AI Based
            </span>
            <div className="flex justify-center">
              <img
                src={Logo}
                alt="Logo"
                className="w-32 h-32 sm:w-48 sm:h-48"
              />
            </div>
            <span className="text-3xl sm:text-4xl lg:text-[50px] text-primary sm:text-left mt-4 sm:mt-0">
              Roadmap
            </span>
          </h2>

          {/* Timeline */}
          <div className="container mx-auto w-full h-full">
            <div className="relative wrap overflow-hidden py-6 sm:py-10 h-full">
              <div
                className="border-2-2 absolute border-opacity-20 border-main-text h-full border hidden sm:block"
                style={{ left: "50%" }}
              ></div>

              {/* Left timeline (Q1) */}
              <div className="mb-8 flex flex-col sm:flex-row sm:justify-between sm:flex-row-reverse items-center w-full left-timeline">
                <div className="order-1 w-full sm:w-5/12 sm:pr-4"></div>
                <div className="z-20 flex items-center order-1 bg-primary shadow-xl w-6 h-6 sm:w-8 sm:h-8 rounded-full mb-4 sm:mb-0"></div>
                <div className="order-1 bg-primary drop-shadow-xl rounded-2xl shadow-xl w-full sm:w-5/12 px-4 sm:px-6 py-6 sm:py-8 relative">
                  <span className="text-white absolute top-4 right-4 text-lg sm:text-xl">
                    Q1
                  </span>
                  <ul className="mt-5">
                    <li className="text-white text-base sm:text-xl mb-3 list-disc ml-4">
                      AI NFT Generator
                    </li>
                    <li className="text-white text-base sm:text-xl mb-3 list-disc ml-4">
                      AI Assist Chatbot
                    </li>
                    <li className="text-white text-base sm:text-xl mb-3 list-disc ml-4">
                      MintPad (No-Code Minting)
                    </li>
                  </ul>
                </div>
              </div>

              {/* Right timeline (Q2) */}
              <div className="mb-8 flex flex-col sm:flex-row sm:justify-between items-center w-full right-timeline">
                <div className="order-1 w-full sm:w-5/12 sm:pl-4"></div>
                <div className="z-20 flex items-center order-1 shadow-xl w-6 h-6 sm:w-8 sm:h-8 rounded-full border border-main-text bg-background mb-4 sm:mb-0"></div>
                <div className="order-1 bg-primary drop-shadow-xl rounded-2xl shadow-xl w-full sm:w-5/12 px-4 sm:px-6 py-6 sm:py-8 relative">
                  <span className="text-white absolute top-4 right-4 text-lg sm:text-xl">
                    Q2
                  </span>
                  <ul className="mt-5">
                    <li className="text-white text-base sm:text-xl mb-3 list-disc ml-4">
                      Dynamic Unique NFTs
                    </li>
                    <li className="text-white text-base sm:text-xl mb-3 list-disc ml-4">
                      Warpcast NFT Frames
                    </li>
                    <li className="text-white text-base sm:text-xl mb-3 list-disc ml-4">
                      User Profiles & Social Reputation
                    </li>
                  </ul>
                </div>
              </div>

              {/* Left timeline (Q3) */}
              <div className="mb-8 flex flex-col sm:flex-row sm:justify-between sm:flex-row-reverse items-center w-full left-timeline">
                <div className="order-1 w-full sm:w-5/12 sm:pr-4"></div>
                <div className="z-20 flex items-center order... order-1 shadow-xl w-6 h-6 sm:w-8 sm:h-8 rounded-full border border-main-text bg-background mb-4 sm:mb-0"></div>
                <div className="order-1 bg-primary drop-shadow-xl rounded-2xl shadow-xl w-full sm:w-5/12 px-4 sm:px-6 py-6 sm:py-8 relative">
                  <span className="text-white absolute top-4 right-4 text-lg sm:text-xl">
                    Q3
                  </span>
                  <ul className="mt-5">
                    <li className="text-white text-base sm:text-xl mb-3 list-disc ml-4">
                      NFT Storytelling Collections
                    </li>
                    <li className="text-white text-base sm:text-xl mb-3 list-disc ml-4">
                      Enhanced AI Assist (Trend & Wallet Analytics)
                    </li>
                  </ul>
                </div>
              </div>

              {/* Right timeline (Q4) */}
              <div className="mb-8 flex flex-col sm:flex-row sm:justify-between items-center w-full right-timeline">
                <div className="order-1 w-full sm:w-5/12 sm:pl-4"></div>
                <div className="z-20 flex items-center order-1 shadow-xl w-6 h-6 sm:w-8 sm:h-8 rounded-full border border-main-text bg-background mb-4 sm:mb-0"></div>
                <div className="order-1 bg-primary drop-shadow-xl rounded-2xl shadow-xl w-full sm:w-5/12 px-4 sm:px-6 py-6 sm:py-8 relative">
                  <span className="text-white absolute top-4 right-4 text-lg sm:text-xl">
                    Q4
                  </span>
                  <ul className="mt-5">
                    <li className="text-white text-base sm:text-xl mb-3 list-disc ml-4">
                      Unified AI Agent (Automation & Interaction)
                    </li>
                    <li className="text-white text-base sm:text-xl mb-3 list-disc ml-4">
                      Mobile App (iOS & Android)
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <Link
              to="/roadmap"
              className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-primary text-white text-center pt-2 sm:pt-4 text-sm sm:text-base"
            >
              See More
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
