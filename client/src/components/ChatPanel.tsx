import hljs from "highlight.js/lib/core";
import javascript from "highlight.js/lib/languages/javascript";
import "highlight.js/styles/github.css";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { IoSend } from "react-icons/io5";
import TopNavigation from "./TopNavigation";
import { useNavigate, useParams } from "react-router-dom";
import { useSendMessage } from "../hooks/useSendMessage";
import { MessagesProps } from "../types/messages";
import Message from "./Message";
import EmptyChat from "./EmptyChat";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BASE_URL } from "../lib/backendUrl";
hljs.registerLanguage("javascript", javascript);

export default function ChatPanel() {
  const { id: paramsId } = useParams();
  const [code, setCode] = useState("");
  const [id, setId] = useState(paramsId);
  const [messages, setMessages] = useState<MessagesProps[]>([]);

  const navigate = useNavigate();

  const hasMessages = messages.length;

  const { isLoading, data } = useQuery({
    queryKey: ["id", id],
    queryFn: async () => {
      const result = await axios.get(`${BASE_URL}/review/${id}`);
      console.log(result);
      return result;
    },
    enabled: !!id,
  });

  const { mutate: sendMessage, isPending } = useSendMessage(setMessages);

  const highlighted = hljs.highlight(code, { language: "javascript" }).value;

  useEffect(() => {
    if (!data || !data.data || data.data.length === 0) {
      navigate("/");
      return;
    }
    const mappedMessages = data.data.map(
      (item) =>
        ({
          sender: item.sender.toLowerCase(),
          content: item.content,
        } as MessagesProps)
    );

    if (mappedMessages.length > messages.length) {
      setMessages(mappedMessages);
    }
  }, [data]);

  const handleSubmit = () => {
    let currentId = id;

    if (!currentId) {
      currentId = uuidv4();
      history.pushState(null, "", `/${currentId}`);
      setId(currentId);
    }

    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: "USER", content: code, loading: false },
      { sender: "AI", content: "Ai is typing...", loading: true },
    ]);

    sendMessage({ id: currentId, code });

    setCode("");
  };

  return (
    <main className="w-full h-full flex flex-col">
      <TopNavigation />

      {hasMessages ? (
        <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
          {messages.map((message, index) => (
            <Message message={message} index={index} />
          ))}
        </div>
      ) : (
        <EmptyChat />
      )}

      <div className="w-full p-4 bg-white">
        <form
          className="relative"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <div className="relative w-full lg:max-w-[40rem] xl:max-w-[44rem] 2xl:max-w-[48rem] mx-auto h-32 md:h-40 rounded">
            <pre
              className="absolute top-0 left-0 w-full h-full overflow-auto p-4 bg-[#f2f2f2] rounded-2xl text-sm font-mono whitespace-pre-wrap break-words outline-none pointer-events-none"
              dangerouslySetInnerHTML={{ __html: highlighted + "<br />" }}
            />
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="absolute top-0 left-0 w-full h-full p-4 text-sm font-mono text-transparent bg-transparent resize-none caret-black z-10 outline-none"
              placeholder="Paste your JavaScript or TypeScript code here..."
              required
              disabled={isPending}
            />
            <button
              type="submit"
              className="p-2 absolute right-4 bottom-4 z-50 cursor-pointer bg-blue-600 text-white rounded-full hover:bg-blue-700 hover:scale-[102%] transition"
              disabled={isPending}
            >
              <IoSend className="size-5" />
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
