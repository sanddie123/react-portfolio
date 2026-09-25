import { copy, t } from "../data/copy";
import { usePortfolio } from "../context/PortfolioContext";

export default function Hero() {
  const { language } = usePortfolio();

  return (
    <section id="start" className="hero-section">
      <video autoPlay loop muted playsInline className="bg-video">
        <source src="/assets/background.mp4" type="video/mp4" />
      </video>
      <div className="hero-overlay"></div>

      <div className="hero-content">
        <h2 className="greeting">{t(copy.hero.greeting, language)}</h2>
        <h1 className="name-title">
          {t(copy.hero.nameLine1, language)} <br />
          {t(copy.hero.nameLine2, language)}
        </h1>
        <p className="subtitle">{t(copy.hero.subtitle, language)}</p>
      </div>
    </section>
  );
}
