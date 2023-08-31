import { useEffect } from "react";

const useScrollEnd = (callback: () => void) => {
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = document.documentElement.scrollTop;
      const scrollHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      if (scrollHeight - scrollY < 200) {
        callback();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [callback]);
};

export default useScrollEnd;
