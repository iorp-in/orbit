"use client";

/*
 * --------------------------------------------------------------------------------------------------------
 * Copyright (c) Vijay Meena <vijayymmeena@gmail.com> (https://github.com/samarmeena). All rights reserved.
 * Licensed under the Apache License. See License.txt in the project root for license information.
 * --------------------------------------------------------------------------------------------------------
 */
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
