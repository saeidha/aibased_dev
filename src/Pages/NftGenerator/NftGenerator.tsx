/// <reference types="vite/client" />
import { useEffect, useState } from "react";
import Main, { HeadMeta } from "../Main";
import topBackLight from "../../assets/images/image-generated/top-back-light.png";
import topBackDark from "../../assets/images/image-generated/top-back-dark.png";
import Logo from "../../assets/images/logo.png";
import Textarea from "../../Components/Textarea";
import Button from "../../Components/Button";
import { useSearchParams } from "react-router-dom";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useSessionObject } from "../../Layouts/UseSessionArray";
import { useNotification } from "../../Layouts/Toast";
import NFTTabs from "./NFTTabs";
import api from "../../Types/api";
import { GenerateRandomImageBase64 } from "../../Components/ImageGenerator";
import { useAccount } from "wagmi";
import {
  simulateContract,
  switchChain,
  waitForTransactionReceipt,
  writeContract,
} from "@wagmi/core";
import { abi } from "../../Types/abiFactory";
import { EthToWei } from "../../Components/Helper";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { base } from "wagmi/chains";
import { config } from "../../Types/wagmi";

export default function NftGenerator() {
  const account = useAccount();
  const queryClient = useQueryClient();
  const { showNotification } = useNotification();
  const [searchParams] = useSearchParams();
  const urlPrompt = searchParams.get("prompt") || "";
  const generateUrl = searchParams.get("generate") || false;

  const [darkMode, setDarkMode] = useState(false);
  const [data, setData] = useSessionObject("nftData", {
    prompt: decodeURIComponent(urlPrompt),
    style: "",
  });
  const [speed, setSpeed] = useState(2);
  const [showStyles, setShowStyles] = useState(false);
  const [styles, setStyles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [, setCaptchaToken] = useState<string | null>(null);
  const [, setShowCaptcha] = useState(false);

  const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS;

  // Fetch styles
  const { data: styleData } = useQuery({
    queryKey: ["styles"],
    queryFn: () => api.get("/styleList").then((res) => res.data),
    staleTime: Infinity,
  });

  // NFT Generation Query
  const {
    data: imgRes,
    refetch: generateNFT,
    isFetching,
  } = useQuery({
    queryKey: ["nftImage", data.prompt, data.style],
    queryFn: async () => {
      setSpeed(0.3);
      if (window.location.hostname === "localhost") {
        await new Promise((resolve) => setTimeout(resolve, 3000));
        return GenerateRandomImageBase64(400, 400).replace(
          "data:image/png;base64,",
          ""
        );
      }
      const res = await api.post("/image_generation_v2", data);
      return res.data.base64_image;
    },
    enabled: false, // Manual trigger only
    gcTime: Infinity, // Keep data in cache
    onSuccess: () => {
      setSpeed(2);
      setLoading(false);
      setShowCaptcha(false);
    },
    onError: (err: any) => {
      console.log("Fetch SendMessage:", err);
      setLoading(false);
      setSpeed(2);
    },
  });

  useEffect(() => {
    if (isFetching) {
      setSpeed(0.3);
    } else {
      setSpeed(2);
    }
  }, [isFetching]);

  useEffect(() => {
    if (styleData) setStyles(styleData);
    if (urlPrompt?.length > 2) {
      setData({ style: "", prompt: urlPrompt });
    }
    if (generateUrl === "true") {
      queryClient.setQueryData(["nftImage", data.prompt, data.style], null);
    }
  }, [styleData, urlPrompt, generateUrl]);

  // const CaptchaChange = (token: string | null) => {
  //   if (!token) {
  //     showNotification("Please verify the captcha!", "e", darkMode, 5000);
  //     return;
  //   }
  //   setCaptchaToken(token);
  //   PayForGenerate();
  // };

  const ShowCaptcha = () => {
    if (account.isDisconnected) {
      showNotification("Please connect wallet first.", "e", darkMode, 5000);
      return;
    }
    if (!data.prompt || data.prompt.length === 0) {
      showNotification("Please write a prompt.", "e", darkMode, 5000);
      return;
    }
    if (data.prompt.length < 3 || data.prompt.length > 2000) {
      showNotification(
        "Prompt length must between 3 and 2000 characters.",
        "e",
        darkMode,
        5000
      );
      return;
    }
    // generateNFT(); // Trigger the query
    PayForGenerate();
  };

  const PayForGenerate = async () => {
    setLoading(true);
    try {
      await switchChain(config, { chainId: base.id });
      const { request } = await simulateContract(config, {
        abi,
        address: contractAddress,
        functionName: "payGenerateFee",
        value: EthToWei(0.00004),
        args: [],
      });

      const hash = await writeContract(config, request);
      const receipt = await waitForTransactionReceipt(config, { hash });

      if (receipt.status === "success") {
        setSpeed(0.3);
        generateNFT(); // Trigger the query
      } else {
        console.error("Transaction failed:", receipt);
        setLoading(false);
      }
    } catch (error: any) {
      setLoading(false);
      console.log(error.message);
      setSpeed(2);
      if (error.message.toLowerCase().includes("exceeds the balance")) {
        showNotification("Insufficient balance.", "e", false, 5000);
      }
    }
  };

  const SetStyle = (item: string) => {
    setData({ ...data, style: item });
    setShowStyles(false);
  };

  const ClearImage = () => {
    queryClient.setQueryData(["nftImage", data.prompt, data.style], null);
    setData({ prompt: "", style: "" });
    setSpeed(2);
    setLoading(false);
  };

  return (
    <Main showFooter={false} setDark={setDarkMode}>
      <HeadMeta title={"NFT Generator"} />
      <img
        src={darkMode ? topBackDark : topBackLight}
        alt=""
        className="absolute -top-0 left-0 right-0 z-1 object-cover"
      />

      {!imgRes || imgRes.length < 20 ? (
        <div className="min-h-screen">
          <section className="">
            <div className="container mx-auto flex justify-center items-center mb-8">
              <div
                className={`nft-loader transition-all duration-[1000ms] ${imgRes && imgRes.length > 20 ? "opacity-0 scale-0 absolute" : "opacity-100 scale-100"}`}
              >
                <div className="logo">
                  <img src={Logo} alt="" className="w-40 h-40" />
                </div>
                <div
                  className="circle"
                  style={{ animationDuration: `${1500 * speed}ms` }}
                ></div>
                <div
                  className="circle"
                  style={{ animationDuration: `${2000 * speed}ms` }}
                ></div>
                <div
                  className="circle"
                  style={{ animationDuration: `${3000 * speed}ms` }}
                ></div>
                <div
                  className="circle"
                  style={{ animationDuration: `${1500 * speed}ms` }}
                ></div>
                <div
                  className="circle"
                  style={{ animationDuration: `${1500 * speed}ms` }}
                ></div>
              </div>
            </div>
          </section>
          <section className="relative hidden md:!block">
            <div className="container mx-auto mb-4">
              <div className="relative flex gap-x-4 bg-nft-color py-4 px-4 rounded-[48px] items-center md:mx-12 lg:mx-32">
                <div className="rounded-[48px] bg-white h-[48px] flex items-center justify-center">
                  <div
                    className="flex items-center justify-center px-3 gap-x-1 cursor-pointer"
                    onClick={() => setShowStyles(!showStyles)}
                  >
                    <span>
                      {data.style?.length > 2 ? data.style : "Choose Style"}
                    </span>
                    <Icon
                      icon="ep:arrow-up-bold"
                      className="w-p h-p"
                      flip={showStyles ? "vertical" : ""}
                    />
                  </div>
                  {showStyles && (
                    <div className="absolute -top-10 flex gap-x-2 w-[800px] left-0">
                      {styles.map((item, index) => (
                        <div
                          key={index}
                          className={`rounded-[48px] border border-main-text flex gap-x-2 py-1 px-2 items-center cursor-pointer hover:bg-nft-color text-main-text ${data.style === item && "bg-nft-color"}`}
                          onClick={() => SetStyle(item)}
                        >
                          <p className="text-sm">{item}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <Textarea
                    placeholder="Prompt"
                    onChange={(e) =>
                      setData({ ...data, prompt: e.target.value })
                    }
                    className="rounded-3xl bg-white !text-black"
                    value={data.prompt}
                  />
                </div>
                <div>
                  <Button
                    label="Generate"
                    onClick={ShowCaptcha}
                    className="rounded-full"
                    disabled={loading}
                  />
                </div>
              </div>
            </div>
            <div>
              <p className="text-center text-main-text">
                No idea? use our{" "}
                <Button
                  type="l"
                  link={"/ai-assist"}
                  label="AI Assist"
                  className="rounded-full mx-1"
                />
                for brain storming
              </p>
            </div>
          </section>

          <section className="relative py-4 sm:py-6 md:hidden">
            <div className="container mx-auto mb-4 px-4">
              <div className="relative flex flex-col sm:flex-row gap-y-4 sm:gap-x-4 bg-nft-color py-4 px-4 sm:px-6 rounded-[48px] items-center mx-auto sm:mx-8 md:mx-32">
                <div className="relative w-full sm:w-auto rounded-[48px] bg-white h-[48px] flex items-center justify-center">
                  <div
                    className="flex items-center justify-center px-3 gap-x-1 cursor-pointer w-full"
                    onClick={() => setShowStyles(!showStyles)}
                  >
                    <span className="text-sm sm:text-base">
                      {data.style?.length > 2 ? data.style : "Choose Style"}
                    </span>
                    <Icon
                      icon="ep:arrow-up-bold"
                      className="w-4 h-4 sm:w-5 sm:h-5"
                      flip={showStyles ? "vertical" : ""}
                    />
                  </div>
                  {showStyles && (
                    <div className="absolute top-[-100px] sm:-top-10 left-0 right-0 sm:left-auto sm:w-[600px] md:w-[800px] flex flex-wrap gap-2 p-2 bg-background rounded-xl border border-main-text z-10">
                      {styles.map((item, index) => (
                        <div
                          key={index}
                          className={`rounded-[48px] border border-main-text flex gap-x-2 py-1 px-2 items-center cursor-pointer hover:bg-nft-color text-main-text text-sm ${
                            data.style === item ? "bg-nft-color" : ""
                          }`}
                          onClick={() => SetStyle(item)}
                        >
                          <p>{item}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex-1 w-full">
                  <Textarea
                    placeholder="Prompt"
                    onChange={(e) =>
                      setData({ ...data, prompt: e.target.value })
                    }
                    className="rounded-3xl bg-white !text-black w-full text-sm sm:text-base"
                    value={data.prompt}
                  />
                </div>
                <div className="w-full sm:w-auto">
                  <Button
                    label="Generate"
                    onClick={ShowCaptcha}
                    className="rounded-full w-full sm:w-auto text-sm sm:text-base"
                    disabled={loading}
                  />
                </div>
              </div>
            </div>
            <div>
              <p className="text-center text-main-text text-sm sm:text-base">
                No idea? use our{" "}
                <Button
                  type="l"
                  link={"/ai-assist"}
                  label="AI Assist"
                  className="rounded-full mx-1 text-sm sm:text-base"
                />
                for brain storming
              </p>
            </div>
          </section>
        </div>
      ) : (
        <section className="relative flex flex-col items-center">
          <div className="max-w-[500px] relative">
            <img
              src={`data:image/png;base64, ${imgRes}`}
              className={`z-10 w-full h-auto rounded-2xl transition-all duration-[1500ms] ${!imgRes || imgRes.length < 20 ? "opacity-0 scale-0" : "opacity-100 scale-100"}`}
            />
            <div className="absolute top-4 left-4 right-4 flex justify-between">
              <div
                className="w-8 h-8 flex justify-center items-center rounded-full bg-white cursor-pointer"
                onClick={ClearImage}
              >
                <Icon icon="famicons:arrow-back-outline" className="w-6 h-6" />
              </div>
              <div
                className="w-8 h-8 flex justify-center items-center rounded-full bg-white cursor-pointer"
                onClick={ShowCaptcha}
              >
                <Icon
                  icon="material-symbols:refresh-rounded"
                  className="w-6 h-6 scale-x-[-1]"
                />
              </div>
            </div>
          </div>
          <NFTTabs
            base64Image={imgRes}
            setBase64Image={(value: any) =>
              queryClient.setQueryData(
                ["nftImage", data.prompt, data.style],
                value
              )
            }
            darkMode={false}
            setPrompt={setData}
          />
        </section>
      )}
    </Main>
  );
}
