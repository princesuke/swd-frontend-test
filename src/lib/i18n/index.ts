import i18next from "i18next";
import en from "./locales/en/translation.json";
import th from "./locales/th/translation.json";
import { LANG_KEY } from "@/constants/localStorage";

const storedLang =
  typeof window !== "undefined" ? localStorage.getItem(LANG_KEY) || "en" : "en";

i18next.init({
  resources: {
    en: { translation: en },
    th: { translation: th },
  },
  lng: storedLang,
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18next;
