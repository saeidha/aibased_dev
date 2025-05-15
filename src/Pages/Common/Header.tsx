import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import { WalletComponents } from "../../Layouts/WalletComponents";
import { useState } from "react";
import { Icon } from "@iconify/react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const headerItem = [
    { label: "AI Assist", link: "/ai-assist" },
    { label: "NFT Generator", link: "/nft-generator" },
    { label: "Mint Pad", link: "/mint-pad" },
  ];

  return (
    <header
      className={`py-3 px-6 left-0 top-0 right-0 relative z-[9999] ${isMenuOpen ? "h-[400px]" : "h-28"}`}
    >
      <div className="container mx-auto">
        <div className="flex items-center justify-between lg:grid lg:grid-cols-3 p-2">
          <Link to="/" className="flex-shrink-0">
            <img src={logo} alt="logo" className="w-16" />
          </Link>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-main-text p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Icon
              icon={isMenuOpen ? "heroicons:x-mark" : "heroicons:bars-3"}
              className="w-6 h-6"
            />
          </button>

          {/* Desktop Navigation */}
          <div className="hidden lg:!flex items-center justify-center">
            <div className="flex items-center justify-center rounded-3xl overflow-hidden border border-main-text">
              {headerItem.map((item, index) => (
                <Link
                  key={index}
                  to={item.link}
                  className={`p-3 border-r border-main-text last:border-r-0 text-sm ${
                    item.link == window.location.pathname
                      ? "text-background bg-main-text font-bold"
                      : "text-main-text hover:bg-opacity-50 font-normal"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Desktop Wallet */}
          <div className="hidden lg:!flex gap-x-2 items-center justify-end">
            <WalletComponents />
          </div>

          {/* Mobile Navigation */}
          <div
            className={`${
              isMenuOpen ? "flex" : "hidden"
            } lg:hidden absolute top-32 left-0 right-0 flex-col border-t border-main-text`}
          >
            <div className="flex flex-col w-full p-4">
              {headerItem.map((item, index) => (
                <Link
                  key={index}
                  to={item.link}
                  className={`p-3 text-sm mb-2 rounded-xl text-center ${
                    item.link == window.location.pathname
                      ? "text-background bg-main-text font-bold"
                      : "text-main-text border border-main-text hover:bg-opacity-50 font-normal"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className="mt-4 flex justify-center">
                <WalletComponents />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
