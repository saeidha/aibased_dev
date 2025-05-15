import { useEffect, useState } from "react";
import Main, { HeadMeta } from "../Main";
import topBackDark from "../../assets/images/chat-bot/top-back-dark.png";
import chatBotLogo from "../../assets/images/chat-bot/chat-bot-logo.png";
import Button from "../../Components/Button";
import Textarea from "../../Components/Textarea";
import { Link } from "react-router-dom";
import generateWhite from "../../assets/images/chat-bot/generate-light.png";
import generateBlack from "../../assets/images/chat-bot/generate-dark.png";
import { useAccount } from "wagmi";
import api from "../../Types/api";
import { marked } from "marked";
import DOMPurify from "dompurify";
import { useNotification } from "../../Layouts/Toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

interface Chat {
  role: string;
  content: string;
  prompt: string;
}

export default function ChatBot() {
  const { showNotification } = useNotification();
  const account = useAccount();
  const [data, setData] = useState({ role: "user", content: "" });
  const [isFirstOpen, setIsFirstOpen] = useState(true);
  const [waiting, setWaiting] = useState(false);
  const queryClient = useQueryClient();
  const [dots, setDots] = useState(1);

  const { data: chats = [] } = useQuery<Chat[]>({
    queryKey: ["chatMessages"],
    queryFn: async () => {
      const storedChats = sessionStorage.getItem("chats");
      return storedChats ? JSON.parse(storedChats) : [];
    },
    refetchOnWindowFocus: true,
  });

  // Mutation to send messages
  const sendMessageMutation = useMutation({
    mutationFn: async (messageData: {
      wallet_address: string;
      messages: Chat[];
    }) => {
      const response = await api.post(
        "/generative_V2",
        JSON.stringify(messageData),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      return response.data;
    },
    onMutate: async (messageData) => {
      await queryClient.cancelQueries({ queryKey: ["chatMessages"] });
      const previousChats =
        queryClient.getQueryData<Chat[]>(["chatMessages"]) || [];
      const newUserMessage: Chat = {
        role: "user",
        content: messageData.messages[messageData.messages.length - 1].content,
        prompt: "",
      };
      const optimisticChats = [...previousChats, newUserMessage];
      queryClient.setQueryData(["chatMessages"], optimisticChats);
      sessionStorage.setItem("chats", JSON.stringify(optimisticChats));
      setWaiting(true); // Set waiting true when mutation starts
      return { previousChats };
    },
    onSuccess: (data, variables) => {
      setWaiting(false);
      const prompt = ExtractGenerate(data.assistant_content);
      const newChat: Chat = {
        role: "assistant",
        content: data.assistant_content,
        prompt: prompt || "",
      };
      const updatedChats = [...variables.messages, newChat];
      sessionStorage.setItem("chats", JSON.stringify(updatedChats));
      queryClient.setQueryData(["chatMessages"], updatedChats);
      sessionStorage.removeItem("pendingMessage");
    },
    onError: (error, variables, context) => {
      setWaiting(false);
      console.error("Fetch SendMessage Error:", error);
      queryClient.setQueryData(["chatMessages"], context?.previousChats);
      sessionStorage.setItem(
        "chats",
        JSON.stringify(context?.previousChats || [])
      );
    },
    onSettled: () => {
      setWaiting(false);
      queryClient.invalidateQueries({ queryKey: ["chatMessages"] });
    },
  });

  const SendMessage = (wait: boolean) => {
    if (wait) {
      setWaiting(true);
      return;
    }
    if (!account.isConnected) {
      showNotification("Please connect wallet first.", "e", true, 5000);
      return;
    }

    if (!data.content.trim() && !waiting) {
      showNotification("Please write something.", "e", true, 5000);
      return;
    }

    const newUserMessage: Chat = {
      role: data.role,
      content: data.content,
      prompt: "",
    };

    sessionStorage.setItem("pendingMessage", JSON.stringify(newUserMessage));
    const messages = [...chats, newUserMessage];

    sendMessageMutation.mutate({
      wallet_address: account.address || "",
      messages,
    });

    setData({ role: "user", content: "" });
  };

  useEffect(() => {
    if (!sendMessageMutation.isPending) {
      setWaiting(false);
    }
  }, [sendMessageMutation.isPending]);

  useEffect(() => {
    setIsFirstOpen(false);
    // sessionStorage.setItem("chats", JSON.stringify([]));
    const pendingMessage = sessionStorage.getItem("pendingMessage");
    if (pendingMessage) {
      console.log("is pending message");
      const messageData = JSON.parse(pendingMessage);
      setData((prev) => ({ ...prev, content: messageData.content }));
      SendMessage(true);
    }
  }, []);

  useEffect(() => {
    if (chats.length < 1) return;
    if (!isFirstOpen && chats[chats.length - 1].role === "assistant") {
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
      setWaiting(false);
    }
  }, [chats]);

  const ExtractGenerate = (input: string): string | null => {
    const regex = /<\?\?\s*(.*?)\s*\?\?>/g;
    let match;
    while ((match = regex.exec(input)) !== null) {
      if (match[1] !== "Roadmap") return match[1];
    }
    return null;
  };

  const CompileText = (text: string) => {
    text = text.replace(
      "[Roadmap](baseURL/roadmap)",
      "<a href='/roadmap' class='text-blue-500 underline'>Roadmap</a>"
    );

    text = text.replace(
      "[baseURL/roadmap](baseURL/roadmap)",
      "<a href='/roadmap' class='text-blue-500 underline'>Roadmap</a>"
    );

    text = text.replace(
      /<\?\?\s*Roadmap\s*\?\?>/g,
      "<a href='/roadmap' class='text-blue-500 underline'>Roadmap</a>"
    );

    text = text.replace(
      "[NFT Generator](baseURL/nft-generator)",
      "<a href='/nft-generator' class='text-blue-500 underline'>NFT Generator</a>"
    );

    text = text.replace(
      "[baseURL/nft-generator](baseURL/nft-generator)",
      "<a href='/nft-generator' class='text-blue-500 underline'>NFT Generator</a>"
    );

    text = text.replace(
      "[NFT Generator](baseURL/nft-generator)",
      "<a href='/nft-generator' class='text-blue-500 underline'>NFT Generator</a>"
    );

    text = text.replace(
      "[Mint-Pad](baseURL/mint-pad)",
      "<a href='/mint-pad' class='text-blue-500 underline'>Mint Pad</a>"
    );

    text = text.replace(/<\?\?(.*?)\?\?>/g, "<strong>$1</strong>");
    // return text;

    const rawHtml = marked(text);
    return DOMPurify.sanitize(rawHtml);
  };

  useEffect(() => {
    const interval = setInterval(() => setDots((prev) => (prev % 3) + 1), 500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    console.log("ccccc", chats);
  }, [chats]);

  useEffect(() => {
    if (account.isDisconnected) {
      queryClient.setQueryData(["chatMessages"], []);
      sessionStorage.setItem("chats", JSON.stringify([]));
    }
  }, [account.isDisconnected, queryClient]);

  return (
    <Main showFooter={false}>
      <HeadMeta title={"Chat Bot"} />
      <img
        src={topBackDark}
        alt=""
        className="absolute -top-0 left-0 right-0 z-1 object-cover"
      />
      <section className="z-10 min-h-screen">
        <div className="container mx-auto">
          <div className="relative min-h-[200px] overflow-auto mb-20">
            {chats.map((item, index) => (
              <div
                key={index}
                className={`flex gap-x-2 p-2 mb-2 ${item.role === "user" ? "justify-end" : ""}`}
              >
                {item.role === "assistant" && (
                  <img src={chatBotLogo} alt="" className="w-8 h-8" />
                )}
                <p
                  className={`py-1 px-2 rounded-2xl ${
                    item.role === "user"
                      ? "bg-primary text-white rounded-br-none ml-10"
                      : "bg-white rounded-bl-none mr-10"
                  }`}
                >
                  <p
                    dangerouslySetInnerHTML={{
                      __html: CompileText(item.content),
                    }}
                  >
                    {/* {CompileText(item.content)} */}
                  </p>
                  {item.role === "assistant" &&
                    item.prompt &&
                    item.prompt.length > 2 && (
                      <div className="my-1 flex">
                        <Link
                          className="group"
                          to={`/nft-generator?prompt=${encodeURIComponent(item.prompt)}&generate=true`}
                        >
                          <img
                            src={generateWhite}
                            alt=""
                            className="h-5 group-hover:hidden"
                          />
                          <img
                            src={generateBlack}
                            alt=""
                            className="h-5 hidden group-hover:block"
                          />
                        </Link>
                      </div>
                    )}
                </p>
              </div>
            ))}
            {waiting && (
              <div className="p-2 mb-2 ml-1">
                <div className="text-main-muted bg-white rounded-tl-full rounded-tr-full rounded-br-full w-6 text-black h-6 text-left pl-1 text-xl flex items-center">
                  {".".repeat(dots)}
                </div>
              </div>
            )}
          </div>
          <div className="fixed bottom-4 right-0 left-0 flex gap-x-4 bg-bot-back py-4 px-4 container mx-auto rounded-[48px] items-center">
            <div className="flex-1">
              <Textarea
                placeholder="Type your message"
                onChange={(e) => setData({ ...data, content: e.target.value })}
                className="rounded-3xl h-[48px] field-content bg-white"
                value={data.content}
                disabled={waiting}
              />
            </div>
            <div>
              <Button
                label="Send"
                onClick={() => SendMessage(false)}
                disabled={waiting}
                className="rounded-[48px]"
              />
            </div>
          </div>
        </div>
      </section>
    </Main>
  );
}
