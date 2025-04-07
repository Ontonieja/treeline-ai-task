import { MessagesProps } from "../types/messages";

interface MessageProps {
  message: MessagesProps;
  index: number;
}

export default function Message({ message, index }: MessageProps) {
  return (
    <div
      key={index}
      className={`lg:max-w-[40rem] xl:max-w-[44rem] 2xl:max-w-[48rem] mx-auto flex ${
        message.sender === "USER" ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`p-3 rounded-lg max-w-[70%] ${
          message.sender === "USER"
            ? "bg-blue-600 text-white"
            : "bg-gray-100 text-gray-800"
        }`}
      >
        <pre className="whitespace-pre-wrap text-sm">{message.content}</pre>
      </div>
    </div>
  );
}
