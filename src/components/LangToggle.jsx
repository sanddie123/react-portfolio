import { usePortfolio } from "../context/PortfolioContext";

export default function LangToggle({ variant }) {
  const { language, toggleLanguage } = usePortfolio();
  const className =
    variant === "mobile"
      ? "lang-toggle-btn mobile-lang-btn"
      : "lang-toggle-btn desktop-lang-btn";

  return (
    <button className={className} onClick={toggleLanguage}>
      {language === "en" ? "EN / TH" : "TH / EN"}
    </button>
  );
}
