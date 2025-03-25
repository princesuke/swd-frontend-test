"use client";

import { useI18n } from "@/hooks/useI18n";
import { Card } from "antd";
import styles from "./page.module.scss";

export default function HomePage() {
  const { t } = useI18n();

  const cards = [
    {
      title: t("home.test1.title"),
      description: t("home.test1.desc"),
    },
    {
      title: t("home.test2.title"),
      description: t("home.test2.desc"),
    },
    {
      title: t("home.test3.title"),
      description: t("home.test3.desc"),
    },
  ];

  return (
    <div className={styles.container}>
      {cards.map((card, index) => (
        <Card key={index} className={styles.card}>
          <h3>{card.title}</h3>
          <p>{card.description}</p>
        </Card>
      ))}
    </div>
  );
}
