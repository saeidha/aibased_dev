import { ChangeEvent, useEffect, useState } from "react";
import Main, { HeadMeta } from "../Main";
import topBackDark from "../../assets/images/market-place/top-back-dark.png";
import topBackLight from "../../assets/images/market-place/top-back-light.png";
import Input from "../../Components/Input";
import BuyNFT from "./BuyNFT";
import { useAccount, useReadContract } from "wagmi";
import Logo from "../../assets/images/logo.png";
import { useParams } from "react-router-dom";
import { abi } from "../../Types/abiFactory";
import { readContract } from "@wagmi/core";
import { noImageBase64 } from "../../Types/noImage";
import MySelect from "../../Components/MySelect";
import { config } from "../../Types/wagmi";

export default function MarketPlace() {
  const { nftId } = useParams();
  const account = useAccount();
  const [darkMode, setDarkMode] = useState(false);
  const [openModal, setOpenModal] = useState(true);
  const [selectNft, setSelectNft] = useState<NftType>();
  const [data, setData] = useState({
    prompt: "",
    sort: "newest",
  });
  const [collections, setCollections] = useState<NftType[]>([]);
  const [firstCollections, setFirstCollection] = useState<NftType[]>([]);
  const [countdowns, setCountdowns] = useState<{ id: string; date: string }[]>(
    []
  );
  const [imageBlobs, setImageBlobs] = useState<{ [key: string]: string }>({});

  const BLACKLISTED_COLLECTIONS = [
    "0xA0ebEA271C1a2B19c3899FDd79610977B6c6F960",
    "0xA0ebEA271C1a2B19c3899FDd79610977B6c6F960",
    "0x3B6939F139f4A2dCB47a711D4E17bF129258df2A",
    "0xFfFD48A94cC38e3A1C9867f511bD0E1719F00B5A",
  ];

  const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS;

  const result = useReadContract({
    address: contractAddress,
    abi: abi,
    functionName: "getAvailableCollectionsToMintDetails",
    args: account.isConnected ? [account.address!] : [],
  });

  useEffect(() => {
    if (result.isSuccess) {
      FetchMarketPlaceData([...result.data]);
    }
  }, [result.isSuccess]);

  const SearchNft = (e: ChangeEvent<HTMLInputElement>) => {
    let nfts = firstCollections;
    if (e.target.value.length > 0) {
      nfts = nfts.filter((x) =>
        x.name.toLowerCase().includes(e.target.value.toLowerCase())
      );
    }
    switch (data.sort) {
      case "lth":
        nfts = nfts.sort((a, b) => Number(a.mintPrice) - Number(b.mintPrice));
        break;
      case "htl":
        nfts = nfts.sort((a, b) => Number(b.mintPrice) - Number(a.mintPrice));
        break;
      case "new":
        break;
    }
    setCollections(nfts);
    setData({ ...data, prompt: e.target.value });
  };

  const OpenModal = (nft: any) => {
    setSelectNft(nft);
    setOpenModal(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      const offers = await readContract(config, {
        address: contractAddress,
        abi: abi,
        functionName: "getAvailableCollectionsToMintDetails",
        args: account.isConnected ? [account.address] : [],
      });
      FetchMarketPlaceData([...offers]);
    };
    fetchData();
  }, [account.address]);

  const FetchMarketPlaceData = async (items: any[]) => {
    const now = new Date().getTime();

    const offers = items
      .map((offer, index) => {
        const maxTimeMs =
          Number(offer.maxTime) *
          (offer.maxTime < 1_000_000_000_000 ? 1000 : 1);

        return {
          id: index,
          collectionAddress: offer.collectionAddress,
          name: offer.name,
          description: offer.description,
          symbol: "ETH",
          price:
            Number(offer.mintPrice ?? 0) / 1e18 < 0.00001
              ? "< 0.00001"
              : (Number(offer.mintPrice ?? 0) / 1e18).toFixed(5).toString(),
          baseImageURI: offer.baseImageURI,
          maxSupply: Number(offer.maxSupply),
          tokenIdCounter: Number(offer.tokenIdCounter),
          maxTime: maxTimeMs,
          mintPerWallet: offer.mintPerWallet,
          mintPrice: offer.mintPrice.toString(),
          actualPrice: offer.actualPrice.toString(),
          isDisable: offer.isDisable,
          isUltimateMintTime: offer.isUltimateMintTime,
          isUltimateMintQuantity: offer.isUltimateMintQuantity,
          date: new Date().toISOString(),
          hour: new Date().getHours().toString(),
          remaining: Number(offer.maxSupply) - Number(offer.tokenIdCounter),
        };
      })
      .filter(
        (nft) =>
          (nft.isUltimateMintTime || nft.maxTime > now) &&
          nft.collectionAddress != import.meta.env.VITE_OG_ADDRESS &&
          !BLACKLISTED_COLLECTIONS.includes(nft.collectionAddress)
      )
      .sort((a, b) => Number(b.id) - Number(a.id));
    setCollections(offers);
    setFirstCollection(offers);
  };

  useEffect(() => {
    if (nftId && nftId != undefined && collections.length > 0) {
      ReadNft();
    }
    collections.forEach((nft) => {
      if (!imageBlobs[nft.collectionAddress]) {
        DownloadImage(nft.baseImageURI, nft.collectionAddress);
      }
    });
    updateCountdowns();
    const interval = setInterval(updateCountdowns, 1000 * 60);
    return () => clearInterval(interval);
  }, [collections]);

  const DownloadImage = async (ipfsUrl: string, id: string) => {
    try {
      if (ipfsUrl.startsWith("https") || ipfsUrl.startsWith("http")) {
        const response = await fetch(ipfsUrl);
        const blob = await response.blob();
        const base64 = await convertBlobToBase64(blob);
        setImageBlobs((prev) => ({
          ...prev,
          [id]: base64,
        }));
      } else {
        let download = await fetch("https://ipfs.io/ipfs/" + ipfsUrl);
        const blob = await download.blob();
        const base64 = await convertBlobToBase64(blob);
        setImageBlobs((prev) => ({
          ...prev,
          [id]: base64,
        }));

        // let download = await pinata.gateways.get(ipfsUrl);
        // var reader = new FileReader();
        // if (download.data instanceof Blob) {
        //   reader.readAsDataURL(download.data);
        // }
        // reader.onloadend = function () {
        //   var base64data = reader.result;
        //   if (typeof base64data === "string") {
        //     setImageBlobs((prev) => ({
        //       ...prev,
        //       [id]: base64data as string,
        //     }));
        //   }
        // };

        // console.log(base64);
        // var reader = new FileReader();
        // if (download.data instanceof Blob) {
        //   reader.readAsDataURL(download.data);
        // }
        // reader.onloadend = function () {
        //   var base64data = reader.result;
        //   if (typeof base64data === "string") {
        //     setImageBlobs((prev) => ({
        //       ...prev,
        //       [id]: base64data as string,
        //     }));
        //   }
        // };
      }
    } catch (error) {
      setImageBlobs((prev) => ({
        ...prev,
        [id]: noImageBase64,
      }));
      console.error(`Failed to download image ${id}:`, error);
    }
  };

  const convertBlobToBase64 = (blob: Blob): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result as string);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  const updateCountdowns = () => {
    const now = new Date().getTime();
    const updatedCountdowns = collections.map((nft) => {
      const maxTimeMs =
        Number(nft.maxTime) * (nft.maxTime < 1_000_000_000_000 ? 1000 : 1);
      const timeDiff = maxTimeMs - now;
      if (nft.isUltimateMintTime) {
        return { id: nft.collectionAddress, date: `Unlimited` };
      }
      if (timeDiff <= 0) {
        return { id: nft.collectionAddress, date: `Expired` };
      }
      const days = Math.max(0, Math.floor(timeDiff / (1000 * 60 * 60 * 24)));
      const hours = Math.max(
        0,
        Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      );

      return { id: nft.collectionAddress, date: `${days}d ${hours}h` };
    });
    setCountdowns(updatedCountdowns);

    // const filteredCollections = collections.filter((nft) => {
    //   const maxTimeMs =
    //     Number(nft.maxTime) * (nft.maxTime < 1_000_000_000_000 ? 1000 : 1);
    //   return nft.isUltimateMintTime || maxTimeMs > now; // Keep only non-expired NFTs
    // });

    // setCollections(filteredCollections);
  };

  const ReadNft = async () => {
    let nft = collections.find((x) => {
      return x.baseImageURI === nftId;
    });
    setSelectNft(nft);
    setOpenModal(true);
  };

  const ChangeSort = (value: string) => {
    switch (value) {
      case "lth":
        setCollections(
          [...collections].sort(
            (a, b) => Number(a.mintPrice) - Number(b.mintPrice)
          )
        );
        break;
      case "htl":
        setCollections(
          [...collections].sort(
            (a, b) => Number(b.mintPrice) - Number(a.mintPrice)
          )
        );
        break;
      case "new":
        setCollections(
          [...collections].sort((a, b) => Number(b.id) - Number(a.id))
        );
        break;
      case "remain":
        setCollections(
          [...collections].sort((a, b) => a.remaining - b.remaining)
        );
        break;
      case "exp":
        setCollections([...collections].sort((a, b) => a.maxTime - b.maxTime));
        break;
    }
    setData({ ...data, sort: value });
  };

  const options = [
    { label: "Newest", value: "new" },
    { label: "Price Low to High", value: "lth" },
    { label: "Price Hight to Low", value: "htl" },
    { label: "Remaining", value: "remain" },
    { label: "Expiry Time", value: "exp" },
  ];

  return (
    <Main showFooter={false} setDark={setDarkMode}>
      <HeadMeta title={"NFT Generator"} />
      <img
        src={darkMode ? topBackDark : topBackLight}
        alt=""
        className="absolute -top-0 left-0 z-1 right-0"
      />

      <section className="relative z-10 min-h-screen">
        <div className="container mx-auto px-5 text-center">
          <div className="flex justify-center items-center gap-x-2 mb-8 max-w-[700px] mx-auto">
            <Input
              placeholder="Search for nft"
              className="bg-transparent text-white rounded-full placeholder-gray-100 border-white flex-1 h-[50px]"
              parentClass="border-white flex-1"
              onChange={(e) => SearchNft(e)}
            />
            <MySelect
              options={options}
              onChange={(value) => ChangeSort(value)}
            />
          </div>

          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">
            {collections.map((item, index) => {
              const countdown = countdowns.find(
                (c) => c.id === item.collectionAddress
              ) || { id: item.collectionAddress, date: "0d 0h" };
              return (
                <div
                  className="relative z-10 rounded-2xl overflow-hidden group transition-all duration-300 cursor-pointer"
                  key={index}
                  onClick={() => OpenModal(item)}
                >
                  <span className="absolute left-0 right-0 w-full h-full bg-white/30 transition-all !duration-1000 group-hover:top-[110%] top-[-110%] z-10"></span>
                  {imageBlobs[item.collectionAddress] ? (
                    <div className=" h-60 overflow-hidden">
                      <img
                        src={imageBlobs[item.collectionAddress]}
                        alt=""
                        className="rounded-tr-2xl rounded-tl-2xl w-full object-cover group-hover:scale-110 h-60"
                      />
                    </div>
                  ) : (
                    <div className="rounded-tr-2xl rounded-tl-2xl w-full object-cover group-hover:scale-110 h-60 bg-gray-600 flex justify-center items-center">
                      <img src={Logo} alt="" className="w-6 h-6 animate-ping" />
                    </div>
                  )}
                  <div className="bg-market-color text-white">
                    <div className="flex justify-between px-4 py-2 gap-x-4">
                      <p className="overflow-hidden text-ellipsis h-[3.6em] leading-[1.8em] line-clamp-2 text-wrap break-words text-left">
                        {item.name}
                      </p>
                      <p className="text-right h-[3.6em] leading-[1.8em]">
                        {item.isUltimateMintQuantity
                          ? "Unlimited"
                          : `${item.remaining} items`}{" "}
                      </p>
                    </div>
                    <div className="flex justify-between px-4 py-2 gap-x-4">
                      <div className="text-left">
                        <p className=" mb-5">
                          {item.price} {item.symbol}
                        </p>
                      </div>
                      <div className="text-right">
                        <p key={item.collectionAddress}>{countdown.date}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {openModal && selectNft && (
        <BuyNFT
          nft={selectNft}
          setNft={setSelectNft}
          setOpenModal={setOpenModal}
          image={imageBlobs[selectNft.collectionAddress]}
          collections={collections}
          setCollections={setCollections}
        />
      )}
    </Main>
  );
}
