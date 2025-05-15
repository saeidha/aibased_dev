import { Link } from "react-router-dom";
import Main, { HeadMeta } from "./Main";
import { Icon } from "@iconify/react";
import { Carousel } from "react-responsive-carousel";
import SlickSlider from "../Layouts/SlickSlider";
import AiBasedDark from "../assets/images/index/ai-based-black.png";
import AiBasedLight from "../assets/images/index/ai-based-white.png";
import { useEffect, useState } from "react";
import Logo from "../assets/images/logo.png";
import botBackLight from "../assets/images/chat-bot/top-back-light.png";
import botBackDark from "../assets/images/chat-bot/top-back-dark.png";
import imageBackLight from "../assets/images/image-generated/top-back-light.png";
import imageBackDark from "../assets/images/image-generated/top-back-dark.png";
import marketBackLight from "../assets/images/market-place/top-back-light.png";
import marketBackDark from "../assets/images/market-place/top-back-dark.png";
import chatLogo from "../assets/images/index/assist-robot1.png";
import nftLogo from "../assets/images/index/generator-robot1.png";
import marketLogo from "../assets/images/index/mint-robot1.png";
import Early from "../Layouts/Early";
import RoadmapSection from "../Layouts/RoadmapSection";

export default function Index() {
  const [darkMode, setDarkMode] = useState(false);
  const [bgIndex, setBgIndex] = useState(0);

  const carouselItems = [
    {
      title: "AI Assist",
      link: "/ai-assist",
      background: darkMode ? botBackDark : botBackLight,
      color: "#5da3da",
      image: chatLogo,
      desc: "Chat with AI & Get Best NFT Ideas",
      desc2: "Start with a thought, end with something incredible",
    },
    {
      title: "AI NFT Generator",
      link: "/nft-generator",
      background: darkMode ? imageBackDark : imageBackLight,
      color: "#50B72F",
      image: nftLogo,
      desc: "Create Something Unique in Seconds",
      desc2: "A few words are all it takes—see the magic happen!",
    },
    {
      title: "Mint Pad",
      link: "/mint-pad",
      background: darkMode ? marketBackDark : marketBackLight,
      color: "#802EBD",
      image: marketLogo,
      desc: "Find & Mint NFTs You Love",
      desc2: "Explore cool NFTs and make them yours in seconds",
    },
  ];

  useEffect(() => {
    setDarkMode(localStorage.getItem("displayMode") == "dark" ? true : false);
  }, []);

  const ChangeSlider = (index: number) => {
    setBgIndex(index);
  };

  return (
    <Main setDark={setDarkMode} showFooter={true}>
      <HeadMeta title="Best AI NFT Maker" description="" />
      {/* Top Slide */}
      <img
        src={carouselItems[bgIndex].background}
        alt=""
        className="absolute -top-10 left-0 right-0 z-1 scale-[110%] object-cover"
      />

      {/* Top Slider */}
      <section className="relative hidden md:!block">
        <div
          className={`container rounded-3xl mx-auto`}
          style={{ backgroundColor: `${carouselItems[bgIndex].color}` }}
        >
          <Carousel
            showArrows={true}
            showIndicators={false}
            showStatus={false}
            showThumbs={false}
            autoPlay={true}
            infiniteLoop={true}
            interval={3000}
            stopOnHover={true}
            renderArrowPrev={(clickHandler) => {
              return (
                <div
                  className="absolute left-5 top-1/2 -translate-y-1/2 bg-white/20 h-32 flex justify-center items-center rounded-2xl px-1 cursor-pointer z-10"
                  onClick={clickHandler}
                >
                  <Icon
                    icon="mingcute:left-fill"
                    className="text-white w-5 h-5"
                  />
                </div>
              );
            }}
            renderArrowNext={(clickHandler) => {
              return (
                <div
                  className="absolute right-5 top-1/2 -translate-y-1/2 bg-white/20 h-32 flex justify-center items-center rounded-2xl px-1 cursor-pointer z-10"
                  onClick={clickHandler}
                >
                  <Icon
                    icon="mingcute:right-fill"
                    className="text-white w-5 h-5"
                  />
                </div>
              );
            }}
            className="mx-5"
            onChange={(currentItemObject) => {
              ChangeSlider(currentItemObject);
            }}
          >
            {carouselItems.map((item, index) => (
              <div
                className="grid grid-cols-2 gap-x-4 mx-16 mb-3 py-5"
                key={index}
              >
                <div className="text-left text-white flex flex-col justify-center pl-8">
                  <h2 className="text-[3rem] font-bold mb-3">{item.title}</h2>
                  <p className="text-2xl">{item.desc}</p>
                  <p className="text-base mb-8">{item.desc2}</p>
                  <div>
                    <Link
                      to={item.link}
                      className="text-white px-4 py-2 border-white border rounded-2xl "
                    >
                      Try It Now
                    </Link>
                  </div>
                </div>
                <div>
                  <img src={item.image} alt={item.title} className="w-full" />
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      </section>

      <section className="relative px-4 md:px-0 md:hidden">
        <div
          className={`container rounded-3xl mx-auto`}
          style={{ backgroundColor: `${carouselItems[bgIndex].color}` }}
        >
          <Carousel
            showArrows={true}
            showIndicators={false}
            showStatus={false}
            showThumbs={false}
            autoPlay={true}
            infiniteLoop={true}
            interval={3000}
            stopOnHover={true}
            renderArrowPrev={(clickHandler) => {
              return (
                <div
                  className="absolute left-2 md:left-5 top-1/2 -translate-y-1/2 bg-white/20 h-16 md:h-32 flex justify-center items-center rounded-2xl px-1 cursor-pointer z-10"
                  onClick={clickHandler}
                >
                  <Icon
                    icon="mingcute:left-fill"
                    className="text-white w-4 h-4 md:w-5 md:h-5"
                  />
                </div>
              );
            }}
            renderArrowNext={(clickHandler) => {
              return (
                <div
                  className="absolute right-2 md:right-5 top-1/2 -translate-y-1/2 bg-white/20 h-16 md:h-32 flex justify-center items-center rounded-2xl px-1 cursor-pointer z-10"
                  onClick={clickHandler}
                >
                  <Icon
                    icon="mingcute:right-fill"
                    className="text-white w-4 h-4 md:w-5 md:h-5"
                  />
                </div>
              );
            }}
            className="mx-2 md:mx-5"
            onChange={(currentItemObject) => {
              ChangeSlider(currentItemObject);
            }}
          >
            {carouselItems.map((item, index) => (
              <div
                className="flex flex-col md:grid md:grid-cols-2 gap-4 md:gap-x-4 mx-4 md:mx-16 mb-3 py-5"
                key={index}
              >
                <div className="text-center md:text-left text-white flex flex-col justify-center md:pl-8 order-2 md:order-1">
                  <h2 className="text-2xl md:text-[3rem] font-bold mb-2 md:mb-3">
                    {item.title}
                  </h2>
                  <p className="text-lg md:text-2xl">{item.desc}</p>
                  <p className="text-sm md:text-base mb-4 md:mb-8">
                    {item.desc2}
                  </p>
                  <div className="flex justify-center md:justify-start">
                    <Link
                      to={item.link}
                      className="text-white px-4 py-2 border-white border rounded-2xl hover:bg-white/20 transition-colors"
                    >
                      Try It Now
                    </Link>
                  </div>
                </div>
                <div className="order-1 md:order-2 px-4 md:px-0">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full max-w-[280px] md:max-w-full mx-auto"
                  />
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      </section>

      {/* Ntf Slider */}
      <section className="mt-10">
        <div className="container mx-auto">
          <div className="overflow-hidden h-[500px] rounded-2xl relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <img
                src={darkMode ? AiBasedLight : AiBasedDark}
                alt=""
                className="w-[800px] scale-125"
              />
            </div>
            <div className="absolute z-10 -rotate-45 -left-[300px] -top-[300px] bottom-0 right-0">
              <SlickSlider />
            </div>
          </div>
        </div>
      </section>

      {/* Early Supp */}
      <Early />

      {/* Roadmap */}
      <RoadmapSection />
    </Main>
  );
}
