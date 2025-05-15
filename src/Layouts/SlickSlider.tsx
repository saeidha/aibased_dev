import Slider from "react-slick";
import { useEffect, useState } from "react";
import { abi } from "../Types/abiFactory";
import { Link } from "react-router-dom";
import { readContract } from "@wagmi/core";
import { config } from "../Types/wagmi";

type BlobType = {
  image: string;
  baseImageURI: string;
};

export default function SlickSlider({}) {
  const [collections, setCollections] = useState<NftType[]>([]);
  const [imageBlobs, setImageBlobs] = useState<BlobType[]>([]);
  const [randomArrays, setRandomArrays] = useState<BlobType[][]>([]);

  const BLACKLISTED_COLLECTIONS = [
    "0xA0ebEA271C1a2B19c3899FDd79610977B6c6F960",
    "0xA0ebEA271C1a2B19c3899FDd79610977B6c6F960",
    "0x3B6939F139f4A2dCB47a711D4E17bF129258df2A",
    "0xFfFD48A94cC38e3A1C9867f511bD0E1719F00B5A",
  ];

  const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS;

  useEffect(() => {
    const fetchData = async () => {
      const offers = await readContract(config, {
        address: contractAddress,
        abi: abi,
        functionName: "getAvailableCollectionsToMintDetails",
        args: [],
      });
      FetchMarketPlaceData([...offers]);
    };
    fetchData();
  }, []);

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
  };

  useEffect(() => {
    collections.forEach((nft) => {
      const isExist = imageBlobs.find(
        (blob) => blob.baseImageURI === nft.baseImageURI
      );
      if (!isExist) {
        DownloadImage(nft.baseImageURI);
      }
    });
  }, [collections]);

  const DownloadImage = async (ipfsUrl: string) => {
    try {
      if (ipfsUrl.startsWith("https") || ipfsUrl.startsWith("http")) {
        const response = await fetch(ipfsUrl);
        const blob = await response.blob();
        const base64 = await convertBlobToBase64(blob);
        setImageBlobs((prev) => [
          ...prev,
          { image: base64, baseImageURI: ipfsUrl },
        ]);
      } else {
        let download = await fetch("https://ipfs.io/ipfs/" + ipfsUrl);
        const blob = await download.blob();
        const base64 = await convertBlobToBase64(blob);
        if (typeof base64 === "string") {
          setImageBlobs((prev) => [
            ...prev,
            { image: base64 as string, baseImageURI: ipfsUrl },
          ]);
        }
      }
    } catch (error) {}
  };

  useEffect(() => {
    if (imageBlobs.length < 9) return;
    const randomArrays = CreateUniqueRandomArrays(imageBlobs, 8, 8);
    // console.log(randomArrays);
    setRandomArrays(randomArrays);
  }, [imageBlobs]);

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

  const ShuffleArray = <T,>(arr: T[]): T[] => {
    return [...arr].sort(() => Math.random() - 0.5);
  };

  const CreateUniqueRandomArrays = <T,>(
    arr: T[],
    numArrays: number,
    size: number
  ): T[][] => {
    if (size > arr.length)
      throw new Error("Size cannot be larger than the original array length.");

    return Array.from({ length: numArrays }, () => {
      return ShuffleArray(arr).slice(0, size);
    });
  };

  // const CreateNonOverlappingArrays = <T,>(arr: T[], numArrays: number, size: number): T[][] => {
  //   if (numArrays * size > arr.length) throw new Error("Not enough elements to create unique arrays.");

  //   const shuffled = ShuffleArray(arr);
  //   return Array.from({ length: numArrays }, (_, i) =>
  //     shuffled.slice(i * size, (i + 1) * size)
  //   );
  // };

  return randomArrays.map((item, index) => (
    <div className="slider-container mb-5" key={index}>
      <MySlider
        rtl={index % 3 == 0 ? true : false}
        speed={index * 1000}
        items={item}
      />
    </div>
  ));
}

interface MySliderProps {
  items: BlobType[];
  dots?: boolean;
  infinite?: boolean;
  slidesToShow?: number;
  slidesToScroll?: number;
  autoplay?: boolean;
  speed?: number;
  autoplaySpeed?: number;
  cssEase?: string;
  arrows?: boolean;
  rtl?: boolean;
  className?: string;
}

export function MySlider({
  items = [],
  dots = false,
  infinite = true,
  slidesToShow = items.length < 6 ? items.length : 6,
  slidesToScroll = 1,
  autoplay = true,
  speed = 2000,
  autoplaySpeed = 2000,
  cssEase = "linear",
  arrows = false,
  rtl = true,
  className = "rounded-2xl overflow-hidden max-h-40 w-auto flex justify-center items-center",
}: MySliderProps) {
  const settings = {
    dots: dots,
    infinite: infinite,
    slidesToShow: slidesToShow,
    slidesToScroll: slidesToScroll,
    autoplay: autoplay,
    speed: speed,
    autoplaySpeed: autoplaySpeed,
    cssEase: cssEase,
    arrows: arrows,
    rtl: rtl,
  };

  return (
    <Slider {...settings}>
      {items.map((item, index) => (
        <div className="px-1 max-w-[200px]" key={index}>
          <Link to={`/mint-pad/${item.baseImageURI}`}>
            <div className={className}>
              <img
                src={item.image}
                alt=""
                className="rounded-2xl w-full h-full object-cover shadow-md bg-transparent"
              />
            </div>
          </Link>
        </div>
      ))}
    </Slider>
  );
}
