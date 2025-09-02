import { create } from "zustand";
import i18n from "../app/config/i18n";

type Lang = "en" | "uk";

interface LangState {
  lang: Lang;
  setLang: (lang: Lang) => void;
}

export const useLangStore = create<LangState>((set) => ({
  lang: (localStorage.getItem("lang") as Lang) || "en",
  setLang: (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("lang", lang);
    set({ lang });
  },
}));
