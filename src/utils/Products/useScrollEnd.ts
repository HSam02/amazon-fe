import { useEffect } from "react";

const useScrollEnd = (
  callback: () => void,
  boxRef?: React.RefObject<HTMLDivElement>
) => {
  useEffect(() => {
    const handleScroll = () => {
      let element = document.documentElement;
      if (boxRef?.current) {
        element = boxRef.current;
      }
      const scrollY = element.scrollTop;
      const scrollHeight = element.scrollHeight - element.clientHeight;

      if (scrollHeight - scrollY < 200) {
        callback();
      }
    };

    if (boxRef?.current) {
      boxRef.current.addEventListener("scroll", handleScroll);
    } else {
      window.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (boxRef?.current) {
        boxRef.current.removeEventListener("scroll", handleScroll);
      } else {
        window.removeEventListener("scroll", handleScroll);
      }
    };
  }, [callback, boxRef?.current]);
};

export default useScrollEnd;
