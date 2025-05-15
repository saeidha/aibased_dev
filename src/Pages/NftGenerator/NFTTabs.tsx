import { useState } from "react";
import { useAccount } from "wagmi";
import {
  GetBlockNumberErrorType,
  simulateContract,
  switchChain,
  waitForTransactionReceipt,
  writeContract,
} from "@wagmi/core";
import Input from "../../Components/Input";
import Textarea from "../../Components/Textarea";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useNotification } from "../../Layouts/Toast";
import { pinata } from "../../Types/pinata";
import Logo from "../../assets/images/logo.png";
import { abi } from "../../Types/abiFactory";
import { EthToWei } from "../../Components/Helper";
import { SwitchButton } from "../../Components/SwitchButtons";
import farcaster from "../../assets/images/socials/fat-white.png";
import x from "../../assets/images/socials/x-white.png";
import { base } from "viem/chains";
import { config } from "../../Types/wagmi";

interface NFTTabsProps {
  base64Image: string;
  setBase64Image: React.Dispatch<React.SetStateAction<string | null>>;
  darkMode: boolean;
  setPrompt: React.Dispatch<
    React.SetStateAction<{ prompt: string; style: string }>
  >;
}

const NFTTabs: React.FC<NFTTabsProps> = ({
  base64Image,
  setBase64Image,
  setPrompt,
}) => {
  const { showNotification } = useNotification();
  const [activeTab, setActiveTab] = useState("putForSale");
  const [data, setData] = useState({
    name: "",
    description: "",
    symbol: "ETH",
    imageURL: "",
    maxSupply: null,
    date: new Date(new Date().setDate(new Date().getDate() + 7))
      .toISOString()
      .split("T")[0],
    hours: "00:00",
    maxTime: null,
    mintPerWallet: true,
    mintPrice: null,
    IsUltimateMintTime: true,
    IsUltimateMintQuantity: true,
  });
  const [mintError, setMintError] = useState({
    name: "",
  });

  const [saleError, setSaleError] = useState({
    name: "",
    mintPrice: "",
    maxSupply: "",
    description: "",
    date: "",
  });
  const [showSaleSuccess, setShowSaleSuccess] = useState(false);
  const [showMintSuccess, setShowMintSuccess] = useState(false);
  const [mintHash, setMintHash] = useState("");
  const [nftUri, setNftUri] = useState("");
  const nftMessages = [
    "Check out my latest NFT! 🌟 Created with AI magic! [Link to NFT]\nI’m so excited about this one! Take a look and let me know what you think!",
    "Just minted an awesome NFT! 🚀🎨 [Link to NFT]\nCan’t wait for you to see it! Give it a click and let me know your thoughts!",
    "Here’s my latest creation—an AI-powered NFT! 🔥 [Link to NFT]\nI’m loving how it turned out! Check it out and feel free to share your thoughts!",
    "Look what I just made with AI! 🌟 My new NFT is live! [Link to NFT]\nI’d love to hear your feedback! Click the link and let’s connect over art!",
    "My new NFT is up! 🎉 Created with AI and full of creativity! [Link to NFT]\nCheck it out and let me know what you think! Feel free to share with others!",
  ];

  const account = useAccount();
  const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS;

  const [loading, setLoading] = useState(false); // Manage the open state in the parent

  const tabs = [
    { label: "PUT FOR SALE", id: "putForSale" },
    { label: "MINT", id: "mint" },
  ];

  const UploadImage = async () => {
    try {
      // Convert base64 to Blob
      const blob = Base64ToBlob(base64Image, "image/png");
      const file = new File([blob], "generated-image.png", {
        type: "image/png",
      });

      // Upload to Pinata
      const upload = await pinata.upload.file(file);

      try {
        await pinata.gateways.get(upload.IpfsHash);
      } catch (error) {
        console.log(error);
      }
      return upload.IpfsHash;
    } catch (error) {
      console.error("Failed to upload to IPFS:", error);
    }
  };

  const Base64ToBlob = (
    base64String: string,
    mimeType: string = "image/png"
  ) => {
    const byteCharacters = atob(base64String); // Decode base64 string
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: mimeType });
  };

  async function MintNFT() {
    let errors = {
      name: "",
    };

    if (
      data.name == "" ||
      data.name.length < 1 ||
      data.name == null ||
      data.name == undefined
    ) {
      //setErrors({ ...errors, name: "Please set name for NFT" });
      errors.name = "Please set name for NFT";
    }

    setMintError(errors);
    if (errors.name.length > 2) {
      return;
    }
    if (!account.isConnected) {
      showNotification("Please connect your wallet.", "e", true, 5000);
      return;
    }

    setLoading(true);
    const uri = await UploadImage();

    showNotification(
      "Please Confirm Transaction in Your Wallet.",
      "i",
      true,
      5000
    );
    try {
      await switchChain(config, {
        chainId: base.id,
      });
      const { request } = await simulateContract(config, {
        abi,
        address: contractAddress,
        functionName: "createAndMint",
        args: [data.name, data.description, data.symbol, uri || ""],
        value: EthToWei(0.0002),
      });

      const hash = await writeContract(config, request);
      const receipt = await waitForTransactionReceipt(config, {
        hash: hash,
      });

      if (receipt.status === "success") {
        setMintHash(hash);
        setShowMintSuccess(true);
      } else {
        console.error("Transaction failed:", receipt);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      const e = error as GetBlockNumberErrorType;
      console.log(e.message);
      if (
        e.message.toLowerCase().includes("exceeds the balance of the account")
      ) {
        showNotification(
          "Insufficient balance for the transaction.",
          "e",
          false,
          5000
        );
      } else {
        // showNotification(e.message, "e", false, 5000);
      }
    }
  }

  const PutForSale = async () => {
    setLoading(true);
    let errors = {
      name: "",
      mintPrice: "",
      maxSupply: "",
      description: "",
      date: "",
    };

    if (
      data.name == "" ||
      data.name.length < 1 ||
      data.name == null ||
      data.name == undefined
    ) {
      errors.name = "Please set name for NFT";
    }
    if (
      data.IsUltimateMintQuantity == false &&
      (data.maxSupply == "" ||
        data.maxSupply == null ||
        data.maxSupply == undefined ||
        data.maxSupply < 1)
    ) {
      errors.maxSupply = "Number must be greater than zero";
    }
    if (
      data.IsUltimateMintQuantity == false &&
      data.maxSupply != null &&
      data.maxSupply > 10000000000000000000n
    ) {
      errors.maxSupply = "Number must be less than 10000000000000000000";
    }
    if (
      data.mintPrice == "" ||
      data.mintPrice == null ||
      data.mintPrice == undefined
    ) {
      errors.mintPrice = "Price must be equal to zero or greater than 0.00001";
    } else if (data.mintPrice >= 0.00001 || data.mintPrice == 0) {
    } else {
      errors.mintPrice = "Price must be equal to zero or greater than 0.00001";
    }
    const newDate = new Date();
    let thisData = data;
    switch (data.date) {
      case "1 Week":
        newDate.setDate(newDate.getDate() + 7);
        thisData.IsUltimateMintTime = false;
        break;
      case "1 Month":
        newDate.setMonth(newDate.getMonth() + 1);
        thisData.IsUltimateMintTime = false;
        break;
      case "3 Month":
        newDate.setMonth(newDate.getMonth() + 3);
        thisData.IsUltimateMintTime = false;
        break;
      default:
        newDate.setFullYear(newDate.getFullYear() + 4);
        thisData.IsUltimateMintTime = true;
        break;
    }

    setSaleError(errors);
    if (
      errors.name.length > 2 ||
      errors.maxSupply.length > 2 ||
      errors.description.length > 2 ||
      errors.mintPrice.length > 2 ||
      errors.date.length > 2
    ) {
      setLoading(false);
      return;
    }
    if (!account.isConnected) {
      showNotification("Please connect your wallet.", "e", true, 5000);
      return;
    }
    const uri = await UploadImage();
    if (!uri) {
      return;
    }

    try {
      await switchChain(config, {
        chainId: base.id,
      });
      const { request } = await simulateContract(config, {
        abi,
        address: contractAddress,
        functionName: "createCollection",
        args: [
          thisData.name,
          thisData.description,
          thisData.symbol,
          uri,
          BigInt(thisData.maxSupply || 0),
          BigInt(newDate.getTime()),
          thisData.mintPerWallet,
          EthToWei(thisData.mintPrice ?? 0),
          thisData.IsUltimateMintTime,
          thisData.IsUltimateMintQuantity,
        ],
      });

      const hash = await writeContract(config, request);

      const receipt = await waitForTransactionReceipt(config, {
        hash: hash,
      });
      if (receipt.status === "success") {
        setNftUri(uri);
        setShowSaleSuccess(true);
      } else {
        console.error("Transaction failed:", receipt);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      const e = error as GetBlockNumberErrorType;
      console.log(e.message);
      if (
        e.message.toLowerCase().includes("exceeds the balance of the account")
      ) {
        showNotification(
          "Insufficient balance for the transaction.",
          "e",
          false,
          5000
        );
      } else {
        // showNotification(e.message, "e", false, 5000);
      }
    }
  };

  const CopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(
        `${window.location.host}/mint-pad/${nftUri}`
      );
      showNotification("Linked Copied.", "s", true, 5000);
    } catch (err) {
      console.error("Failed to copy text:", err);
    }
  };

  const CloseOnSales = () => {
    setBase64Image("");
    setPrompt({
      prompt: "",
      style: "",
    });
    setShowSaleSuccess(false);
  };

  const CloseOnMint = () => {
    setBase64Image("");
    setPrompt({
      prompt: "",
      style: "",
    });
    setShowMintSuccess(false);
  };

  function GetRandomNFTMessage(nftLink: string) {
    const randomIndex = Math.floor(Math.random() * nftMessages.length);
    return nftMessages[randomIndex].replace(
      "[Link to NFT]",
      "https://aibased.app/mint-pad/" + nftLink
    );
  }

  return (
    <div className="text-main-text p-6 flex flex-col items-center w-[750px]">
      {/* Tabs */}
      <div className="flex w-full mb-6 rounded-full border border-main-text overflow-hidden">
        {tabs.map((item, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(item.id)}
            className={`flex-1 py-2 text-center ${
              activeTab === item.id
                ? "bg-nft-color text-white"
                : "bg-background text-main-text"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
      {/* Tab Content */}
      <div className="w-full">
        {activeTab === "putForSale" && (
          <div className="grid grid-cols-1 gap-5">
            {/* Name */}
            <Input
              onChange={(e) => setData({ ...data, name: e.target.value })}
              value={data.name}
              placeholder="NFT Name"
              className="rounded-[48px] ring-nft-color bg-transparent"
              error={saleError.name}
            />
            {/* Desc */}
            <Textarea
              onChange={(e) =>
                setData({ ...data, description: e.target.value })
              }
              value={data.description}
              placeholder="Description"
              className="rounded-[48px] field-content ring-nft-color bg-transparent"
              error={saleError.description}
            />
            <div className="flex items-center gap-x-4">
              <div className="w-40">NFT Price:</div>
              {/* Price */}
              <Input
                type="decimal"
                value={data.mintPrice!}
                onChange={(e) =>
                  setData({ ...data, mintPrice: e.target.value })
                }
                placeholder="0.0001 ETH"
                parentClass="w-full flex-1"
                className="ring-0 text-left bg-transparent rounded-full border border-nft-color"
                error={saleError.mintPrice}
              />
            </div>
            {/* Number */}
            <div className="flex items-center gap-x-4">
              <span className="w-40">NFT Number:</span>
              <SwitchButton
                options={["Unlimited", "Set Amounts"]}
                onChange={(e) =>
                  setData({
                    ...data,
                    IsUltimateMintQuantity: e == "Unlimited",
                  })
                }
              />
              {!data.IsUltimateMintQuantity && (
                <Input
                  type="number"
                  value={data.maxSupply!}
                  onChange={(e) =>
                    setData({ ...data, maxSupply: Number(e.target.value) })
                  }
                  placeholder="NFT number"
                  parentClass="w-full flex-1"
                  className="ring-0 text-center bg-transparent rounded-full border border-nft-color"
                  error={saleError.maxSupply}
                />
              )}
            </div>
            {/* Mint per wallet */}
            <div className="flex items-center gap-x-4">
              <span className="w-40">NFT mint per wallet:</span>
              <SwitchButton
                options={["One ", "Unlimited"]}
                onChange={(e) =>
                  setData({
                    ...data,
                    mintPerWallet: e != "Unlimited",
                  })
                }
              />
            </div>
            {/* Sales Duration */}
            <div className="flex items-center gap-x-4">
              <span className="w-40">Sales Duration:</span>
              <SwitchButton
                options={["No End", "1 Week", "1 Month", "3 Month"]}
                onChange={(e) =>
                  setData({
                    ...data,
                    date: e,
                  })
                }
              />
            </div>

            <button
              className={`w-full py-3 rounded-full border border-nft-color ${!loading && " hover:bg-nft-color"}`}
              onClick={PutForSale}
              disabled={loading}
            >
              {!loading ? (
                "SALE"
              ) : (
                <Icon
                  className="text-nft-color w-5 h-5 mx-auto"
                  icon="eos-icons:loading"
                />
              )}
            </button>
          </div>
        )}
        {activeTab === "mint" && (
          <div className="grid grid-cols-1 gap-4">
            <Input
              onChange={(e) => setData({ ...data, name: e.target.value })}
              value={data.name}
              placeholder="NFT Name"
              className="rounded-full ring-nft-color bg-transparent"
              error={mintError.name}
            />
            <Textarea
              onChange={(e) =>
                setData({ ...data, description: e.target.value })
              }
              value={data.description}
              placeholder="Description"
              className="rounded-[48px] h-[48px] field-content ring-nft-color bg-transparent"
            />
            <button
              className={`w-full py-3 rounded-full border border-nft-color ${!loading && " hover:bg-nft-color"}`}
              onClick={MintNFT}
              disabled={loading}
            >
              {!loading ? (
                "MINT"
              ) : (
                <Icon
                  className="text-nft-color w-5 h-5 mx-auto"
                  icon="eos-icons:loading"
                />
              )}
            </button>
          </div>
        )}
      </div>
      {showSaleSuccess && (
        <div className="fixed inset-0">
          <div className="flex justify-center items-center h-full">
            <div className="relative max-w-[500px] bg-background p-8 rounded-2xl z-[99999]">
              <div
                className="absolute top-2 right-2 bg-main-text p-2 w-6 h-6 flex justify-center items-center text-background rounded-full cursor-pointer"
                onClick={CloseOnSales}
              >
                X
              </div>
              <div className="relative flex flex-col items-center border-nft-color border pt-8 pb-4 rounded-xl px-4">
                <img
                  src={Logo}
                  alt="Logo"
                  className="w-10 h-10 left-1/2 -translate-x-1/2 -top-4 absolute"
                />
                <p className="text-main-text text-xl mb-4">
                  Your NFT Listed Successfully
                </p>
                <p className="mb-4">Share your nft link</p>
                <div className="flex justify-center gap-x-2">
                  <button
                    className="border border-nft-color py-2 px-4 rounded-full"
                    onClick={CopyUrl}
                  >
                    Copy Link
                  </button>
                  <a
                    className="rounded-full w-10 h-10 border border-nft-color flex justify-center items-center"
                    href={`http://twitter.com/share?text=${encodeURIComponent(
                      GetRandomNFTMessage(nftUri)
                    )}&url=https://aibased.app&hashtags=AiBased,Base`}
                    target="_blank"
                  >
                    <img src={x} alt="Share to Twitter" />
                  </a>
                  <a
                    className="rounded-full w-10 h-10 border border-nft-color flex justify-center items-center"
                    target="_blank"
                    href={`https://warpcast.com/~/compose?text=${encodeURIComponent(
                      GetRandomNFTMessage(nftUri)
                    )}%0A&channelKey=aibased`}
                  >
                    <img src={farcaster} alt="Share to Farcaster" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {showMintSuccess && (
        <div className="fixed inset-0">
          <div className="flex justify-center items-center h-full">
            <div className="relative max-w-[500px] bg-background p-8 rounded-2xl z-[99999]">
              <div
                className="absolute top-2 right-2 bg-main-text p-2 w-6 h-6 flex justify-center items-center text-background rounded-full cursor-pointer"
                onClick={CloseOnMint}
              >
                X
              </div>
              <div className="relative flex flex-col items-center border-nft-color border pt-8 pb-4 rounded-xl px-4">
                <img
                  src={Logo}
                  alt="Logo"
                  className="w-10 h-10 left-1/2 -translate-x-1/2 -top-4 absolute"
                />
                <p className="text-main-text text-xl mb-4">
                  Your NFT successfully minted
                </p>
                <div className="flex justify-center gap-x-2">
                  <a
                    href={`https://sepolia.basescan.org/tx/${mintHash}`}
                    className="border border-nft-color py-2 px-4 rounded-full"
                    target="_blank"
                  >
                    Visit on Block Explorer
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NFTTabs;
