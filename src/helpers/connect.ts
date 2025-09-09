import axios from "axios";

const TELEGRAM_BOT_TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = import.meta.env.VITE_TELEGRAM_CHAT_ID;

if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
  console.warn(
    "Telegram bot token or chat id is not defined in env variables!"
  );
}

export const sendTelegramMessage = async (message: string): Promise<void> => {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    throw new Error("Telegram bot token or chat id not configured");
  }

  const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

  const payload = {
    chat_id: TELEGRAM_CHAT_ID,
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
