"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Layout, Menu, Select } from "antd";
import { useState, useEffect } from "react";
import i18next from "@/lib/i18n";
import { LANG_KEY } from "@/constants/localStorage";
import { useI18n } from "@/hooks/useI18n";
import styles from "./Header.module.scss";

const { Header: AntHeader } = Layout;

const Header = () => {
  const pathname = usePathname();
  const { t } = useI18n();

  const [lang, setLang] = useState("en");

  useEffect(() => {
    const storedLang = localStorage.getItem(LANG_KEY) || "en";
    setLang(storedLang);
  }, []);

  const changeLanguage = (value: string) => {
    i18next.changeLanguage(value).then(() => {
      localStorage.setItem(LANG_KEY, value);
      setLang(value);
    });
  };

  const selectedKey = pathname === "/" ? "/" : pathname;

  const menuItems = [
    {
      key: "/",
      label: (
        <Link href="/" suppressHydrationWarning>
          {t("menu.home")}
        </Link>
      ),
    },
    {
      key: "/shape-control",
      label: (
        <Link href="/shape-control" suppressHydrationWarning>
          {t("menu.shape")}
        </Link>
      ),
    },
    {
      key: "/person-manager",
      label: (
        <Link href="/person-manager" suppressHydrationWarning>
          {t("menu.person")}
        </Link>
      ),
    },
  ];

  return (
    <AntHeader className={styles.header}>
      <div className={styles.left}>
        <Menu
          mode="horizontal"
          selectedKeys={[selectedKey]}
          items={menuItems}
        />
      </div>
      <div className={styles.right}>
        <Select
          value={lang}
          onChange={changeLanguage}
          options={[
            { label: "EN", value: "en" },
            { label: "TH", value: "th" },
          ]}
          size="small"
          style={{ width: 80 }}
        />
      </div>
    </AntHeader>
  );
};

export default Header;
