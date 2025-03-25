"use client";

import { useState } from "react";
import styles from "./styles/page.module.scss";
import ShapeGrid from "./components/ShapeGrid";
import TopControls from "./components/TopControls";

const initialShapes = [
  [1, 2, 3],
  [4, 5, 6],
];

export default function LayoutStylePage() {
  const [shapes, setShapes] = useState<number[][]>(initialShapes);
  const [isSwitched, setIsSwitched] = useState(false);

  return (
    <div className={styles.container}>
      <TopControls setShapes={setShapes} setIsSwitched={setIsSwitched} />
      <ShapeGrid
        shapes={shapes}
        setShapes={setShapes}
        isSwitched={isSwitched}
      />
    </div>
  );
}
