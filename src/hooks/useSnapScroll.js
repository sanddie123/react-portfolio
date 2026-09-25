import { useEffect, useRef } from "react";
import { usePortfolio } from "../context/PortfolioContext";

export const sectionIndexRef = { current: 0 };

export function scrollToSection(index) {
  const sections = document.querySelectorAll("section");
  if (!sections[index]) return;
  sectionIndexRef.current = index;
  sections[index].scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}

export function useSnapScroll() {
  const { scrollLocked } = usePortfolio();
  const scrollingRef = useRef(false);
  const scrollLockedRef = useRef(scrollLocked);
  scrollLockedRef.current = scrollLocked;

  useEffect(() => {
    const onWheel = (event) => {
      if (window.innerWidth <= 768) return;
      if (scrollLockedRef.current) return;
      event.preventDefault();
      if (scrollingRef.current) return;

      const sections = document.querySelectorAll("section");
      if (event.deltaY > 0) {
        if (sectionIndexRef.current < sections.length - 1) {
          sectionIndexRef.current += 1;
        }
      } else if (sectionIndexRef.current > 0) {
        sectionIndexRef.current -= 1;
      }

      scrollingRef.current = true;
      sections[sectionIndexRef.current].scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      window.setTimeout(() => {
        scrollingRef.current = false;
      }, 400);
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, []);
}
