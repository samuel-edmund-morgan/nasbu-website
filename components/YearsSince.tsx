"use client";

import { useState, useEffect } from "react";

export default function YearsSince() {
  const [years, setYears] = useState(() => {
    const now = new Date();
    const founded = new Date(1992, 0, 27);
    let diff = now.getFullYear() - founded.getFullYear();
    if (
      now.getMonth() < founded.getMonth() ||
      (now.getMonth() === founded.getMonth() && now.getDate() < founded.getDate())
    ) {
      diff--;
    }
    return diff;
  });

  useEffect(() => {
    const now = new Date();
    const founded = new Date(1992, 0, 27);
    let diff = now.getFullYear() - founded.getFullYear();
    if (
      now.getMonth() < founded.getMonth() ||
      (now.getMonth() === founded.getMonth() && now.getDate() < founded.getDate())
    ) {
      diff--;
    }
    setYears(diff);
  }, []);

  return <>{years}</>;
}
