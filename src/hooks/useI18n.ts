import { useEffect, useState } from "react";
import i18next from "@/lib/i18n";

export function useI18n() {
  const [t, setT] = useState(() => i18next.getFixedT(i18next.language));

  useEffect(() => {
    const updateT = () => {
      setT(() => i18next.getFixedT(i18next.language));
    };

    i18next.on("languageChanged", updateT);
    return () => {
      i18next.off("languageChanged", updateT);
    };
  }, []);

  return { t, language: i18next.language };
}
