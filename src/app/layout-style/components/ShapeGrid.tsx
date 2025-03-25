// layout-style/components/ShapeGrid.tsx
"use client";

import styles from "../styles/shapeGrid.module.scss";
import { Card } from "antd";
import { useCallback } from "react";

interface Props {
  shapes: number[][];
  setShapes: React.Dispatch<React.SetStateAction<number[][]>>;
  isSwitched: boolean;
}

export default function ShapeGrid({ shapes, setShapes, isSwitched }: Props) {
  const numCols = shapes[0].length;

  const handleClick = useCallback(
    (rowIndex: number, colIndex: number) => {
      setShapes((prev) => {
        const flat = prev.flat();
        const fromIndex = rowIndex * numCols + colIndex;

        const others = flat.filter((_, i) => i !== fromIndex);
        const shuffled = [...others].sort(() => Math.random() - 0.5);

        let toIndex = fromIndex;
        while (toIndex === fromIndex) {
          toIndex = Math.floor(Math.random() * flat.length);
        }

        const newFlat = [...shuffled];
        newFlat.splice(toIndex, 0, flat[fromIndex]);

        const result: number[][] = [];
        for (let i = 0; i < newFlat.length; i += numCols) {
          result.push(newFlat.slice(i, i + numCols));
        }
        return result;
      });
    },
    [setShapes, numCols]
  );

  return (
    <div className={styles.grid}>
      {shapes.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className={`${styles.row} ${
            rowIndex === 0
              ? isSwitched
                ? styles.alignLeft
                : styles.alignRight
              : isSwitched
              ? styles.alignRight
              : styles.alignLeft
          }`}
        >
          {row.map((shape, colIndex) => {
            return (
              <Card
                key={`${rowIndex}-${colIndex}`}
                className={`${styles.card} ${styles[`shape${shape}`]}`}
                onClick={() => handleClick(rowIndex, colIndex)}
              >
                <div className={styles.shape} />
              </Card>
            );
          })}
        </div>
      ))}
    </div>
  );
}
