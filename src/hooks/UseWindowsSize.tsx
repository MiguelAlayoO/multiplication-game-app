import { useEffect, useState } from "react";

type WindowsSizeProps = {
  width: number;
  height: number;
};

export const useWindowsSize = () => {
  const [windowSize, setWindowSize] = useState<WindowsSizeProps>({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
};
