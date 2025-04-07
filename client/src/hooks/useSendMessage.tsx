import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { BASE_URL } from "../lib/backendUrl";
import { MessagesProps } from "../types/messages";

interface SendMessageInput {
  id: string;
  code: string;
}

export const useSendMessage = (
  setMessages: React.Dispatch<React.SetStateAction<MessagesProps[]>>
) => {
  return useMutation({
    mutationKey: ["sendMessage"],
    mutationFn: async ({ id, code }: SendMessageInput) => {
      const response = await axios.post(`${BASE_URL}/review`, {
        id,
        code,
      });

      console.log(response);
      if (response.status !== 200 && response.status !== 201) {
        throw new Error("Failed to send message");
      }

      return response.data;
    },
    onSuccess: (data) => {
      console.log(data);
      setMessages((messages) =>
        messages.map((m) =>
          m.loading
            ? { sender: "ai", content: data.response, loading: false }
            : m
        )
      );
    },
    onError: (error) => {
      console.error("Error sending message:", error);
    },
  });
};
