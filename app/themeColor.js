"use client";

import { useThemeColor } from "finecss";
import { useEffect } from "react";

export default function ThemeColor() {
  useEffect(() => {
    const { unsubscribe } = useThemeColor();

    return () => {
      unsubscribe();
    };
  }, []);

  return <></>;
}
