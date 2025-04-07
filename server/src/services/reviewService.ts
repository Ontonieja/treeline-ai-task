import { Sender } from "@prisma/client";
import db from "../../prisma/db";
import fetchAiResponse from "../helpers/fetchAiResponse";

export async function createReview({
  id: chat_uuid,
  code,
}: {
  id: string;
  code: string;
}) {
  try {
    let chat = await db.chat.findUnique({
      where: {
        chat_uuid,
      },
    });

    if (!chat) {
      chat = await db.chat.create({
        data: {
          chat_uuid,
        },
      });
    }

    await db.message.create({
      data: {
        sender: "USER",
        content: code,
        chat_uuid,
      },
    });

    const aiResponse = await fetchAiResponse(code);

    const aiMessage = await db.message.create({
      data: {
        chat_uuid,
        sender: "AI",
        content: aiResponse,
      },
    });

    return {
      response: aiResponse,
      createdAt: aiMessage.createdAt,
      sender: aiMessage.sender,
    };
  } catch (err) {
    throw new Error(err instanceof Error ? err.message : String(err));
  }
}

export async function getReviewById({ id: chat_uuid }: { id: string }) {
  try {
    const result = await db.chat.findFirst({
      where: { chat_uuid },
      select: {
        messages: true,
      },
    });

    if (!result) {
      throw new Error("Chat not found");
    }

    return result.messages;
  } catch (err) {
    throw new Error(err instanceof Error ? err.message : String(err));
  }
}
