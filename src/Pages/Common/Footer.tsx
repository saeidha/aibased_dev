import { Icon } from "@iconify/react/dist/iconify.js";
import Input from "../../Components/Input";
import footerLogo from "../../assets/images/logo-footer.png";
import Button from "../../Components/Button";
import { useState } from "react";
import { useNotification } from "../../Layouts/Toast";
import farcaster from "../../assets/images/socials/far-blue.png";
import x from "../../assets/images/socials/x-blue.png";
import discord from "../../assets/images/socials/disc-blue.png";
import mirror from "../../assets/images/socials/mirror.png";
import { Link } from "react-router-dom";

export default function Footer() {
  const [data, setData] = useState({
    email: "",
  });
  const [error, setError] = useState(false);
  const { showNotification } = useNotification();
  const Signup = () => {
    if (error || data.email.length < 2) {
      showNotification("Please enter a valid email", "e", true, 5000);
      return;
    }
    setTimeout(() => {
      showNotification("You successfully signup", "s", true, 5000);
    }, 1000);
  };
  return (
    <footer className="p-8 bg-footer z-10 relative">
      <section className="container mx-auto hidden md:!block">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl text-main-text w-[800px]">
            Stay in the loop
          </h2>
          <p className="text-main-text text-3xl mb-2 w-[300px] flex justify-center items-center  text-center">
            Join the community
          </p>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-main-muted text-xl mb-5 w-[800px]">
            Join our mailing list to stay loop with our newest feature releases.
            NFT drops, and tips and tricks for navigating AI Based.
          </p>
          <div className="col-span-1 flex flex-col w-[300px]">
            <div className="flex gap-x-1 mb-5 w-[300px] justify-center items-center pt-5">
              <div className="w-12 h-12 rounded-xl bg-primary text-white flex justify-center items-center">
                <a
                  href="https://x.com/aibasedofficial"
                  target="_blank"
                  rel="noopener noreferrer"
                  className=" flex justify-center items-center"
                >
                  {/* <Icon icon="fa6-brands:x-twitter" className="w-10 h-10" /> */}
                  <img src={x} alt="" className="w-12 h-12" />
                </a>
              </div>
              <div className="w-12 h-12 rounded-xl bg-primary text-white flex justify-center items-center">
                <a
                  href="https://warpcast.com/aibased"
                  target="_blank"
                  rel="noopener noreferrer"
                  className=" flex justify-center items-center"
                >
                  {/* <Icon icon="simple-icons:farcaster" className="w-10 h-10" /> */}
                  <img src={farcaster} alt="" className="w-12 h-12" />
                </a>
              </div>
              <div className="w-12 h-12 rounded-xl bg-primary text-white flex justify-center items-center">
                <a
                  href="https://discord.gg/Rj7Bn3BgNP"
                  target="_blank"
                  rel="noopener noreferrer"
                  className=" flex justify-center items-center"
                >
                  {/* <Icon icon="ic:baseline-discord" className="w-10 h-10" /> */}
                  <img src={discord} alt="" className="w-12 h-12" />
                </a>
              </div>
              <div className="w-12 h-12 rounded-xl bg-primary text-white flex justify-center items-center">
                <a
                  href="https://mirror.xyz/aibasedofficial.eth"
                  target="_blank"
                  rel="noopener noreferrer"
                  className=" flex justify-center items-center"
                >
                  {/* <Icon icon="ic:baseline-discord" className="w-10 h-10" /> */}
                  <img src={mirror} alt="" className="w-7 h-7" />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center gap-x-6">
          <div className="flex gap-2 items-center grow w-[800px]">
            <Input
              placeholder="Your Email Address"
              parentClass="grow max-w-[400px]"
              variant="footer"
              type="email"
              onChange={(e) => setData({ ...data, email: e.target.value })}
              setError={setError}
            />
            <Button label="Sign Up" className="rounded-full" onClick={Signup} />
          </div>
          <div className="w-[300px] flex justify-center items-center flex-col gap-3">
            <Link
              to="/privacy-policy"
              className="text-main-text hover:text-primary"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms-of-service"
              className="text-main-text hover:text-primary"
            >
              Terms of Services
            </Link>
          </div>
        </div>

        <div className="mt-8 text-center text-main-muted text-xl">
          <p>2025 W3 Core LTD</p>
        </div>
      </section>

      <section className="container mx-auto md:hidden">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center">
          <h2 className="text-2xl sm:text-3xl text-main-text mb-4 md:mb-0 md:w-[800px] text-center md:text-left">
            Stay in the loop
          </h2>
          <p className="text-main-text text-2xl sm:text-3xl mb-4 md:mb-2 md:w-[300px] flex justify-center items-center text-center">
            Join the community
          </p>
        </div>
        <div className="flex flex-col md:flex-row md:justify-between md:items-center">
          <p className="text-main-muted text-base sm:text-xl mb-5 text-center md:text-left md:w-[800px]">
            Join our mailing list to stay loop with our newest feature releases,
            NFT drops, and tips and tricks for navigating AI Based.
          </p>
          <div className="flex flex-col md:w-[300px]">
            <div className="flex gap-x-1 mb-5 justify-center items-center pt-5">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-primary text-white flex justify-center items-center">
                <a
                  href="https://x.com/aibasedofficial"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex justify-center items-center"
                >
                  <img src={x} alt="X" className="w-10 h-10 sm:w-12 sm:h-12" />
                </a>
              </div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-primary text-white flex justify-center items-center">
                <a
                  href="https://warpcast.com/aibased"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex justify-center items-center"
                >
                  <img
                    src={farcaster}
                    alt="Farcaster"
                    className="w-10 h-10 sm:w-12 sm:h-12"
                  />
                </a>
              </div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-primary text-white flex justify-center items-center">
                <a
                  href="https://discord.gg/Rj7Bn3BgNP"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex justify-center items-center"
                >
                  <img
                    src={discord}
                    alt="Discord"
                    className="w-10 h-10 sm:w-12 sm:h-12"
                  />
                </a>
              </div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-primary text-white flex justify-center items-center">
                <a
                  href="https://mirror.xyz/aibasedofficial.eth"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex justify-center items-center"
                >
                  <img
                    src={mirror}
                    alt="Mirror"
                    className="w-6 h-6 sm:w-7 sm:h-7"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-y-4 md:gap-x-6">
          <div className="flex flex-col sm:flex-row gap-2 items-center grow md:w-[800px]">
            <Input
              placeholder="Your Email Address"
              parentClass="grow max-w-[400px] w-full"
              variant="footer"
              type="email"
              onChange={(e) => setData({ ...data, email: e.target.value })}
              setError={setError}
            />
            <Button
              label="Sign Up"
              className="rounded-full w-full sm:w-auto"
              onClick={Signup}
            />
          </div>
          <div className="md:w-[300px] flex justify-center items-center flex-col gap-3">
            <Link
              to="/privacy-policy"
              className="text-main-text hover:text-primary text-base sm:text-lg"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms-of-service"
              className="text-main-text hover:text-primary text-base sm:text-lg"
            >
              Terms of Services
            </Link>
          </div>
        </div>

        <div className="mt-6 sm:mt-8 text-center text-main-muted text-base sm:text-xl">
          <p>2025 W3 Core LTD</p>
        </div>
      </section>
    </footer>
  );
}
