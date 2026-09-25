import { useEffect, useRef, useState } from "react";
import { usePortfolio } from "../context/PortfolioContext";
import { sectionIndexRef } from "../hooks/useSnapScroll";

let bootStarted = false;
let bootPhase = "idle";
const bootListeners = new Set();
const bootCompleteSetters = new Set();

function setBootPhase(nextPhase) {
  bootPhase = nextPhase;
  bootListeners.forEach((listener) => listener(nextPhase));
}

function markBootComplete() {
  bootCompleteSetters.forEach((setter) => setter(true));
}

export default function LoadingScreen() {
  const { setBootComplete } = usePortfolio();
  const [phase, setPhase] = useState(bootPhase);
  const timersRef = useRef([]);

  useEffect(() => {
    if (history.scrollRestoration) {
      history.scrollRestoration = "manual";
    }

    const onBeforeUnload = () => {
      sessionStorage.setItem("savedScrollPos", String(window.scrollY));
    };
    window.addEventListener("beforeunload", onBeforeUnload);

    bootListeners.add(setPhase);
    bootCompleteSetters.add(setBootComplete);

    if (!bootStarted) {
      bootStarted = true;
      timersRef.current = [
        window.setTimeout(() => setBootPhase("logo"), 400),
        window.setTimeout(() => setBootPhase("flash"), 2200),
        window.setTimeout(() => {
          setBootPhase("done");
          markBootComplete();
          const savedScroll = sessionStorage.getItem("savedScrollPos");
          if (savedScroll) {
            const scrollPos = parseInt(savedScroll, 10);
            window.scrollTo({ top: scrollPos, behavior: "instant" });
            window.dispatchEvent(new Event("scroll"));
            sectionIndexRef.current = Math.round(scrollPos / window.innerHeight);
          }
        }, 2700),
      ];
    } else if (bootPhase === "done") {
      setBootComplete(true);
    }

    return () => {
      window.removeEventListener("beforeunload", onBeforeUnload);
      bootListeners.delete(setPhase);
      bootCompleteSetters.delete(setBootComplete);
    };
  }, [setBootComplete]);

  const className = [
    phase === "logo" || phase === "flash" || phase === "done" ? "show-logo" : "",
    phase === "flash" || phase === "done" ? "flash" : "",
    phase === "done" ? "hidden" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div id="loading-screen" className={className}>
      <div className="loading-diamond"></div>
    </div>
  );
}
