import { PortfolioProvider, usePortfolio } from "./context/PortfolioContext";
import { useSnapScroll } from "./hooks/useSnapScroll";
import { useRevealOnScroll } from "./hooks/useRevealOnScroll";
import LoadingScreen from "./components/LoadingScreen";
import LangToggle from "./components/LangToggle";
import DesktopNav from "./components/DesktopNav";
import MobileNav from "./components/MobileNav";
import Hero from "./components/Hero";
import Skills from "./components/Skills";
import Works from "./components/Works";
import Contact from "./components/Contact";

function AppShell() {
  const { bootComplete, scrollLocked, panelOpen } = usePortfolio();
  useSnapScroll();
  useRevealOnScroll();

  const className = [
    "app-root",
    bootComplete ? "boot-complete" : "",
    scrollLocked ? "scroll-locked" : "",
    panelOpen ? "panel-open" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={className}>
      <LoadingScreen />
      <LangToggle variant="desktop" />
      <DesktopNav />
      <LangToggle variant="mobile" />
      <MobileNav />
      <main>
        <Hero />
        <Skills />
        <Works />
        <Contact />
      </main>
    </div>
  );
}

export default function App() {
  return (
    <PortfolioProvider>
      <AppShell />
    </PortfolioProvider>
  );
}
