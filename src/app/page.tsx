"use client";

import { useI18n } from "@/hooks/useI18n";
import { Card } from "antd";
import styles from "./page.module.scss";
import Link from "next/link";

export default function HomePage() {
  const { t } = useI18n();

  const cards = [
    {
      title: t("home.test1.title"),
      description: t("home.test1.desc"),
      href: "/layout-style",
    },
    {
      title: t("home.test2.title"),
      description: t("home.test2.desc"),
      href: "/",
    },
    {
      title: t("home.test3.title"),
      description: t("home.test3.desc"),
      href: "/form-table",
    },
  ];

  return (
    <div className={styles.container}>
      {cards.map((card, index) => (
        <Link href={card.href} key={index}>
          <Card className={`${styles.card} ${index == 1 && styles.disabled}`}>
            <h3>{card.title}</h3>
            <p>{card.description}</p>
          </Card>
        </Link>
      ))}
    </div>
  );
}
