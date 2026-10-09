import { useEffect } from "react";
import { copy, t } from "../data/copy";
import { usePortfolio } from "../context/PortfolioContext";
import { scrollToSection } from "../hooks/useSnapScroll";

const NAV_ITEMS = [
  { href: "#start", id: "start", label: copy.nav.start },
  { href: "#skills", id: "skills", label: copy.nav.skills },
  { href: "#project", id: "project", label: copy.nav.works },
  { href: "#contact", id: "contact", label: copy.nav.contact },
];

export default function DesktopNav() {
  const { language, activeSection, setActiveSection } = usePortfolio();

  useEffect(() => {
    const sections = document.querySelectorAll("section");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.getAttribute("id"));
          }
        });
      },
      { root: null, rootMargin: "0px", threshold: 0.5 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [setActiveSection]);

  const onNavClick = (event, index) => {
    event.preventDefault();
    scrollToSection(index);
  };

  return (
    <header>
      <nav className="tactical-nav">
        {NAV_ITEMS.map((item, index) => (
          <a
            key={item.id}
            href={item.href}
            className="nav-hitbox"
            onClick={(event) => onNavClick(event, index)}
          >
            <div className={`nav-item${activeSection === item.id ? " active" : ""}`}>
              <span>{t(item.label, language)}</span>
            </div>
          </a>
        ))}
      </nav>
    </header>
  );
}
