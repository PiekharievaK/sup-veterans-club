import axios from "axios";

export const fetchJson = async <T>(path: string): Promise<T> => {
  try {
    const response = await axios.get(
      `https://sup-veterans-club-admin.vercel.app/api/read`, 
      { 
        params: { path }
      }
    );
    return response.data as T;
  } catch (error) {
    console.error("Error fetch:", error);
    throw new Error("Can`t get data");
  }
};
