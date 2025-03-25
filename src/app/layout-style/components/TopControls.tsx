"use client";

import styles from "../styles/topControls.module.scss";
import { Card } from "antd";
import { useI18n } from "@/hooks/useI18n";

interface Props {
  setShapes: React.Dispatch<React.SetStateAction<number[][]>>;
  setIsSwitched: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function TopControls({ setShapes, setIsSwitched }: Props) {
  const { t } = useI18n();

  const moveLeft = () => {
    setShapes((prev) => {
      const flat = prev.flat();
      const first = flat.shift()!;
      flat.push(first);
      return [flat.slice(0, 3), flat.slice(3, 6)];
    });
  };

  const moveRight = () => {
    setShapes((prev) => {
      const flat = prev.flat();
      const last = flat.pop()!;
      flat.unshift(last);
      return [flat.slice(0, 3), flat.slice(3, 6)];
    });
  };

  const switchRows = () => {
    setIsSwitched((prev) => !prev);
  };

  return (
    <div className={styles.grid}>
      <Card
        className={`${styles.controlBtn} ${styles.arrowLeft}`}
        onClick={moveLeft}
      >
        <div className={styles.arrow} />
        <div className={styles.titleBtn}>{t("layout.move-shape")}</div>
      </Card>

      <Card
        className={`${styles.controlBtn} ${styles.arrowVertical}`}
        onClick={switchRows}
      >
        <div className={styles.arrowPair}>
          <div className={styles.arrowUp} />
          <div className={styles.arrowDown} />
        </div>
        <div className={styles.titleBtn}>{t("layout.move-position")}</div>
      </Card>

      <Card
        className={`${styles.controlBtn} ${styles.arrowRight}`}
        onClick={moveRight}
      >
        <div className={styles.arrow} />
        <div className={styles.titleBtn}>{t("layout.move-shape")}</div>
      </Card>
    </div>
  );
}
