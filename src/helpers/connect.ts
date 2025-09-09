import axios from "axios";

const BOT_TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
const REGISTRATION_CHAT_ID = import.meta.env.VITE_TELEGRAM_REGISTRATION_CHAT_ID;
const CONTACT_CHAT_ID = import.meta.env.VITE_TELEGRAM_CONTACT_CHAT_ID;
const CHAT_IDS = JSON.parse(import.meta.env.VITE_TELEGRAM_CHAT_IDS);

if (!BOT_TOKEN || !REGISTRATION_CHAT_ID) {
  console.warn(
    "Telegram bot token or chat id is not defined in env variables!"
  );
}

export const sendTelegramMessage = async (
  message: string,
  chat: "registration" | "contact"
): Promise<void> => {
  if (!BOT_TOKEN || !REGISTRATION_CHAT_ID) {
    throw new Error("Telegram bot token or chat id not configured");
  }

  const chatId = () => {
    if (chat === "registration") {
      return REGISTRATION_CHAT_ID;
    }
    if (chat === "contact") {
      return CONTACT_CHAT_ID;
    } else {
      throw new Error("chat id not configured");
    }
  };

  if (!chatId) {
    throw new Error("Invalid chat type provided.");
  }

  const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

  const payload = {
    chat_id: chatId,
    parse_mode: "HTML",
    text: message,
  };

  try {
    const response = await axios.post(url, payload);
    if (!response.data.ok) {
      throw new Error(`Telegram API error: ${response.data.description}`);
    }
  } catch (error) {
    console.error("Error sending Telegram message:", error);
    throw error;
  }
};
