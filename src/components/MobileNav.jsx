import { copy, t } from "../data/copy";
import { usePortfolio } from "../context/PortfolioContext";
import { scrollToSection } from "../hooks/useSnapScroll";

const NAV_ITEMS = [
  { href: "#start", label: copy.nav.start },
  { href: "#skills", label: copy.nav.skills },
  { href: "#project", label: copy.nav.works },
  { href: "#contact", label: copy.nav.contact },
];

export default function MobileNav() {
  const {
    language,
    mobileMenuOpen,
    setMobileMenuOpen,
    setScrollLocked,
    panelOpen,
  } = usePortfolio();

  const openMenu = () => {
    setMobileMenuOpen(true);
    setScrollLocked(true);
  };

  const closeMenu = () => {
    setMobileMenuOpen(false);
    if (!panelOpen) setScrollLocked(false);
  };

  const onLinkClick = (event, index) => {
    event.preventDefault();
    closeMenu();
    scrollToSection(index);
  };

  return (
    <>
      <button
        id="mobile-burger-btn"
        className="mobile-burger-btn"
        aria-label="Open Menu"
        onClick={openMenu}
        style={{ opacity: mobileMenuOpen ? "0" : "1" }}
      >
        <svg viewBox="0 0 24 24">
          <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
        </svg>
      </button>

      <nav
        id="mobile-nav-menu"
        className={`mobile-nav-menu${mobileMenuOpen ? " open" : ""}`}
      >
        <button
          id="mobile-close-btn"
          className="mobile-close-btn"
          aria-label="Close Menu"
          onClick={closeMenu}
        >
          <svg viewBox="0 0 24 24">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
          </svg>
        </button>
        <div className="mobile-nav-links">
          {NAV_ITEMS.map((item, index) => (
            <a
              key={item.href}
              href={item.href}
              className="mobile-link"
              onClick={(event) => onLinkClick(event, index)}
            >
              {t(item.label, language)}
            </a>
          ))}
        </div>
      </nav>
    </>
  );
}
