import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
  useRef,
} from "react";
import Input from "../../Components/Input";
import {
  simulateContract,
  waitForTransactionReceipt,
  writeContract,
  getBalance,
  GetBlockNumberErrorType,
  switchChain,
} from "@wagmi/core";
import { useNotification } from "../../Layouts/Toast";
import { useAccount, useReadContract } from "wagmi";
import { Icon } from "@iconify/react/dist/iconify.js";
import { abi } from "../../Types/abiFactory";
import { EthToWei, WeiToEth } from "../../Components/Helper";
import Logo from "../../assets/images/logo.png";
import { base } from "viem/chains";
import { config } from "../../Types/wagmi";

export default function BuyNFT({
  nft,
  setNft,
  setOpenModal,
  image,
  collections,
  setCollections,
}: {
  nft: NftType;
  setNft: Dispatch<SetStateAction<NftType | undefined>>;
  setOpenModal: React.Dispatch<SetStateAction<boolean>>;
  image: string;
  collections: NftType[];
  setCollections: Dispatch<SetStateAction<NftType[]>>;
}) {
  const [data, setData] = useState({
    nft: "",
    name: "NFT 1",
    count: 1,
    price: 0,
  });
  const [timeLeft, setTimeLeft] = useState("");

  const account = useAccount(); // Get wallet address

  const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS;
  const { showNotification } = useNotification();
  const [showMintSuccess, setShowMintSuccess] = useState(false);
  const [mintHash, setMintHash] = useState("");
  const [loading, setLoading] = useState(false); // Manage the open state in the parent
  const [alreadyMinted, setAlreadyMinted] = useState(false);

  const handleIncrease = () =>
    setData((prev) => ({ ...prev, count: prev.count + 1 })); //
  const handleDecrease = () =>
    setData((prev) => ({ ...prev, count: Math.max(1, prev.count - 1) })); //

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date().getTime();
      const timeDiff = nft.maxTime - now;
      if (nft.isUltimateMintTime) {
        setTimeLeft(`Unlimited`);
        return { id: nft.collectionAddress, date: `Unlimited` };
      } else {
        const days = Math.max(0, Math.floor(timeDiff / (1000 * 60 * 60 * 24)));
        const hours = Math.max(
          0,
          Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        );
        setTimeLeft(`${days}d ${hours}h`);
      }
    };

    updateCountdown(); // Initial call
    const interval = setInterval(updateCountdown, 1000 * 60); // Update every minute

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [nft.date]);

  const result = useReadContract({
    address: contractAddress,
    abi: abi,
    functionName: "getAvailableCollectionsToMintDetails",
    args: account.isConnected ? [account.address!] : [],
  });

  useEffect(() => {
    if (result.isSuccess) {
      let x = (result.data as any[]).find(
        (x) => x.collectionAddress === nft.collectionAddress
      );
      if (x.isDisable) {
        setAlreadyMinted(true);
      }
    }
  }, [result.isSuccess]);

  useEffect(() => {
    console.log("collection address", nft.collectionAddress);
    const updateCountdown = () => {
      const now = new Date().getTime();
      const timeDiff = nft.maxTime - now;

      if (nft.isUltimateMintTime) {
        setTimeLeft(`Unlimited`);
        return;
      }

      if (timeDiff <= 0) {
        setTimeLeft(`Expired`);
        return;
      }

      const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      setTimeLeft(`${days}d ${hours}h`);
    };

    updateCountdown(); // Initial call
    const interval = setInterval(updateCountdown, 1000 * 60); // Update every minute

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [nft]);

  const BuyNftRequest = async () => {
    if (account.isDisconnected) {
      showNotification("Please connect wallet first.", "e", false, 5000);
      return;
    }
    if (data.count > Number(nft.remaining)) {
      showNotification(
        "Your requested quantity more than available quantity.",
        "e",
        false,
        5000
      );
      return;
    }

    const balance = await getBalance(config, {
      address: account.address!,
      chainId: base.id,
    });
    if (
      balance &&
      balance.value < EthToWei(WeiToEth(Number(nft.actualPrice)) * data.count)
    ) {
      showNotification(
        "Insufficient balance for the transaction.",
        "e",
        false,
        5000
      );
      return;
    }

    setLoading(true);
    try {
      await switchChain(config, {
        chainId: base.id,
      });
      const { request } = await simulateContract(config, {
        abi,
        address: contractAddress,
        functionName: "mintNFT",
        args: [nft.collectionAddress, account.address!, BigInt(data.count)],
        value: EthToWei(WeiToEth(Number(nft.actualPrice)) * data.count),
      });
      const hash = await writeContract(config, request);
      const receipt = await waitForTransactionReceipt(config, {
        hash: hash,
      });
      if (receipt.status === "success") {
        setMintHash(hash);
        setShowMintSuccess(true);
        setLoading(false);
        setCollections((prevItems: NftType[]) =>
          prevItems.map((item: NftType) =>
            item.id === nft.id
              ? { ...item, remaining: item.remaining - data.count }
              : item
          )
        );
        setNft({ ...nft, remaining: nft.remaining - data.count });
      } else {
        console.error("Transaction failed:", receipt);
        setLoading(false);
      }
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
      }
      if (
        !e.message
          .toLowerCase()
          .includes("User rejected the request".toLowerCase())
      ) {
        showNotification("Problem to mint the NFT", "e", false, 5000);
      }
    }
  };

  const CopyLink = () => {
    navigator.clipboard.writeText(
      window.location.origin + "/mint-pad/" + nft.baseImageURI
    );
    showNotification("Link Copied.", "s", true, 5000);
  };

  const Close = () => {
    setShowMintSuccess(false);
    setOpenModal(false);
  };

  return (
    <section className="fixed top-0 left-0 right-0 bottom-0 z-[9999] max-h-screen overflow-y-hidden">
      {!showMintSuccess && (
        <div className="flex h-full justify-center items-center max-h-screen overflow-y-auto relative z-20">
          <div className="absolute inset-0 z-10" onClick={Close}></div>

          <div className="bg-background mt-10 p-10 rounded-3xl max-w-[600px] shadow-md relative z-20">
            <div
              className="absolute top-4 right-4 bg-main-text text-background w-6 h-6 rounded-full flex justify-center items-center cursor-pointer"
              onClick={() => setOpenModal(false)}
            >
              X
            </div>
            <div className="relative grid grid-cols-1 md:grid-cols-2 border border-market-color rounded-3xl mb-2">
              <div
                className="absolute top-1/2 -translate-y-1/2 -right-9 bg-market-color text-white p-1 rounded-tr-lg rounded-br-lg cursor-pointer"
                onClick={CopyLink}
              >
                <Icon icon="system-uicons:share" className="w-7 h-7" />
              </div>
              <img
                src={image}
                alt={nft.name}
                className="object-cover overflow-hidden rounded-tl-3xl rounded-bl-3xl h-full"
              />
              <div className="flex justify-center items-center relative min-h-40">
                <p className="text-3xl text-market-color font-bold p-4">
                  {nft.name}
                </p>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 bg-market-color  text-white p-2 rounded-tr-xl rounded-tl-xl px-4">
                  {timeLeft}
                </div>
              </div>
            </div>
            <p className="max-w-[500px] mx-auto mb-8 text-main-text">
              {nft.description}
            </p>
            <div className="max-w-[500px] mx-auto">
              <div className="grid grid-cols-3 text-center gap-2">
                <div className="col-span-2">
                  <p className="text-market-color">Price</p>
                  <p className="text-main-text">
                    {nft.price} {nft.symbol}
                  </p>
                </div>
                <div className="col-span-1">
                  <p className="text-market-color">Available</p>
                  <p className="text-main-text">
                    {nft.isUltimateMintQuantity
                      ? "Unlimited"
                      : `${nft.remaining}`}
                  </p>
                </div>
                <div className="col-span-2">
                  {account.isConnected ? (
                    timeLeft == "Expired" ? (
                      <button
                        className=" w-full rounded-full py-3 text-main-text"
                        onClick={BuyNftRequest}
                        disabled={true}
                      >
                        Expired
                      </button>
                    ) : !alreadyMinted ? (
                      <button
                        className="border border-market-color w-full rounded-full py-3 text-main-text"
                        onClick={BuyNftRequest}
                        disabled={loading}
                      >
                        MINT
                      </button>
                    ) : (
                      <button
                        className=" w-full rounded-full py-3 text-main-text"
                        onClick={BuyNftRequest}
                        disabled={true}
                      >
                        Already Minted
                      </button>
                    )
                  ) : (
                    <button
                      className=" w-full rounded-full py-3 text-main-text"
                      onClick={BuyNftRequest}
                      disabled={true}
                    >
                      Please Connect Wallet
                    </button>
                  )}
                </div>
                <div className="col-span-1">
                  {nft.mintPerWallet ? (
                    <div className="rounded-full text-center ring-market-color text-main-text py-[14px]">
                      1
                    </div>
                  ) : (
                    <Input
                      className="rounded-full text-center ring-market-color text-main-text py-[14px]"
                      parentClass="border-market-color"
                      type="number"
                      value={data.count}
                      onChange={(e) =>
                        setData({ ...data, count: Number(e.target.value) })
                      }
                      handleDecrease={handleDecrease}
                      handleIncrease={handleIncrease}
                      showArrow={true}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {showMintSuccess && (
        <div className="fixed inset-0 z-[999]">
          <div className="flex justify-center items-center h-full">
            <div className="relative max-w-[500px] bg-background p-8 rounded-2xl z-[99999]">
              <div
                className="absolute top-2 right-2 bg-main-text p-2 w-6 h-6 flex justify-center items-center text-background rounded-full cursor-pointer"
                onClick={Close}
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
                    className="border border-nft-color py-2 px-4 rounded-full text-white"
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
    </section>
  );
}
