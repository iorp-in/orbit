"use client";

import { useState, useEffect } from "react";

const useWidthPercentage = (targetWidth: number, defaultPercent: number) => {
  const [percentage, setPercentage] = useState<number>(0);

  useEffect(() => {
    const calculatePercentage = () => {
      const screenWidth = window.innerWidth;

      if (screenWidth > targetWidth) {
        const percentageEquivalent = (targetWidth * 100) / screenWidth;
        setPercentage(percentageEquivalent);
      } else {
        setPercentage(defaultPercent); // 20% as default if screen width is less than 200px * 1.2
      }
    };

    // Initial calculation
    calculatePercentage();

    // Listen for resize events
    const handleResize = () => {
      calculatePercentage();
    };
    window.addEventListener("resize", handleResize);

    // Cleanup function to remove the event listener
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [targetWidth, defaultPercent]);

  return percentage;
};

export default useWidthPercentage;
