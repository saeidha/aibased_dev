import { useEffect, useState } from "react";
import { useAccount, useReadContract } from "wagmi";
import { abi } from "../Types/abiFactory";
import Button from "../Components/Button";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { EthToWei, WeiToEth } from "../Components/Helper";
import {
  GetBlockNumberErrorType,
  simulateContract,
  switchChain,
  waitForTransactionReceipt,
  writeContract,
} from "@wagmi/core";
import { useNotification } from "./Toast";
import ogNft from "../assets/images/index/og-nft.png";
import { base } from "viem/chains";
import { config } from "../Types/wagmi";

export default function Early() {
  const account = useAccount(); // Get wallet address
  const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS;
  const ogAddress = import.meta.env.VITE_OG_ADDRESS;
  const [nft, setNft] = useState<NftType>();
  const [alreadyMinted, setAlreadyMinted] = useState(false);
  const { openConnectModal } = useConnectModal();
  const [shouldSendTx, setShouldSendTx] = useState(false); // State to trigger transaction
  const { showNotification } = useNotification();
  const [timeEnd, setTimeEnd] = useState(false);
  const [mintBegin, setMintBegin] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  const result = useReadContract({
    address: contractAddress,
    abi: abi,
    functionName: "getAvailableCollectionsToMintDetails",
    args: account.isConnected ? [account.address!] : [],
  });

  useEffect(() => {
    if (result.isSuccess) {
      let x = (result.data as any[]).find(
        (x) => x.collectionAddress === ogAddress
      );
      // console.log(x, ogAddress);
      if (x) {
        x.remaining = Number(x.maxSupply) - Number(x.tokenIdCounter);
        x.maxSupply = Number(x.maxSupply);
        x.tokenIdCounter = Number(x.tokenIdCounter);
        setNft(x);
        if (x.isDisable) {
          setAlreadyMinted(true);
        }
      }
    }
  }, [result.isSuccess]);

  const CalculateTimeLeft = () => {
    if (nft) {
      let res;
      const now = new Date().getTime();
      const maxTimeMs =
        Number(nft.maxTime) * (nft.maxTime < 1_000_000_000_000 ? 1000 : 1);
      const difference = maxTimeMs - now;
      if (difference <= 0) {
        res = { days: "00", hours: "00", minutes: "00", seconds: "00" };
        setTimeEnd(true);
      } else {
        setTimeEnd(false);
        res = {
          days: String(Math.floor(difference / (1000 * 60 * 60 * 24))).padStart(
            2,
            "0"
          ),
          hours: String(
            Math.floor((difference / (1000 * 60 * 60)) % 24)
          ).padStart(2, "0"),
          minutes: String(Math.floor((difference / (1000 * 60)) % 60)).padStart(
            2,
            "0"
          ),
          seconds: String(Math.floor((difference / 1000) % 60)).padStart(
            2,
            "0"
          ),
        };
      }

      return res;
    }
  };

  useEffect(() => {
    if (account.isConnected && shouldSendTx) {
      MintOGTx();
      setShouldSendTx(false);
    }
  }, [account.isConnected, shouldSendTx]);

  const MintOG = () => {
    setShouldSendTx(true);
    if (!account.isConnected) {
      if (openConnectModal) {
        openConnectModal();
      }
    } else {
      MintOGTx();
    }
  };

  const MintOGTx = async () => {
    if (mintBegin) {
      return;
    }
    setMintBegin(true);
    try {
      await switchChain(config, {
        chainId: base.id,
      });
      const { request } = await simulateContract(config, {
        abi,
        address: import.meta.env.VITE_CONTRACT_ADDRESS,
        functionName: "mintNFT",
        args: [import.meta.env.VITE_OG_ADDRESS, account.address!, BigInt(1)],
        value: EthToWei(WeiToEth(nft?.actualPrice)),
      });
      const hash = await writeContract(config, request);
      const receipt = await waitForTransactionReceipt(config, {
        hash: hash,
      });
      if (receipt.status === "success") {
        let nft1 = nft;
        if (nft1) {
          nft1.isDisable = true;
          setNft(nft1);
        }
        showNotification(
          "Congratulations! Your NFT has been minted.",
          "s",
          true,
          10000
        );
      } else {
        console.error("Transaction failed:", receipt);
      }
    } catch (error) {
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
      }
    }
    setMintBegin(false);
  };

  useEffect(() => {
    if (nft) {
      const interval = setInterval(() => {
        let ddd = CalculateTimeLeft();
        setTimeLeft(ddd);
      }, 1000);

      return () => clearInterval(interval); // Cleanup on unmount
    }
  }, [nft]);

  return (
    <section className="mt-10 mb-32">
      <div className="container mx-auto">
        <div className="w-5/6 mx-auto">
          <h2 className="text-center text-4xl text-main-text mb-4">
            Early Supporter NFT
          </h2>
          <p className="text-xl text-center text-main-text">
            Mint your Early Supporter NFT and be among the first.
          </p>
        </div>
        <div className="gap-x-6 my-10 md:mx-auto mx-5 gap-y-10">
          <div className="text-center flex justify-center items-center ">
            <div>
              <div className="group relative overflow-hidden rounded-2xl hover:scale-110 transition-all !duration-300 flex flex-col items-center mb-10">
                <span className="absolute top-0 w-full h-full bg-white/30 transition-all !duration-1000 skew-x-[10deg] group-hover:left-[110%] left-[-110%] z-10"></span>
                <img
                  src={ogNft}
                  alt="Early Supporter"
                  className="w-[480px] h-[480px] rounded-2xl transform duration-300 group-hover:scale-110"
                />
              </div>
              <div className="text-main-text">
                <p>Minting Ended</p>
              </div>
              {nft && (
                <div className="grid grid-cols-3 gap-x-5 justify-center text-main-text items-center">
                  {timeLeft != null && (
                    <div className="text-right w-[200px]">
                      {timeLeft.days}d : {timeLeft.hours}h : {timeLeft.minutes}m
                      : {timeLeft.seconds}s
                    </div>
                  )}
                  {!account.isConnected ? (
                    <Button
                      label="Connect Wallet"
                      onClick={openConnectModal}
                      className="rounded-[48px] w-48 mx-auto"
                    />
                  ) : nft.isDisable ? (
                    <div className="border border-primary rounded-[48px] px-8 py-3 text-sm font-semibold shadow-sm relative">
                      Already Minted
                    </div>
                  ) : nft.remaining == 0 ? (
                    <div className="border border-primary rounded-[48px] px-8 py-3 text-sm font-semibold shadow-sm relative">
                      Sold Out
                    </div>
                  ) : timeEnd ? (
                    <div className="border border-primary rounded-[48px] px-8 py-3 text-sm font-semibold shadow-sm relative">
                      Times End
                    </div>
                  ) : (
                    <Button
                      label="MINT"
                      onClick={MintOG}
                      className="rounded-[48px] w-48 mx-auto"
                    />
                  )}
                  <span className="text-left w-68">
                    {nft?.maxSupply} Total Supplied
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
