import { copy, t } from "../data/copy";
import { usePortfolio } from "../context/PortfolioContext";

export default function Skills() {
  const { language } = usePortfolio();

  return (
    <section id="skills" className="skills-section">
      <div className="ambient-geometry">
        <div className="shape triangle-1"></div>
        <div className="shape triangle-2"></div>
        <div className="shape triangle-3"></div>
        <div className="shape triangle-4"></div>
      </div>

      <div className="content-container skills-wrap reveal-on-scroll">
        <h2 className="section-title">{t(copy.skills.title, language)}</h2>
        <div className="skills-card-grid">
          {copy.skills.cards.map((card) => (
            <article className="skill-card" key={card.heading.en}>
              <h3 className="skill-card-title">{t(card.heading, language)}</h3>
              <ul className="skill-list">
                {card.items.map((item) => (
                  <li className="skill-row" key={item.label}>
                    <img
                      className="skill-icon"
                      src={item.icon}
                      alt=""
                      width="20"
                      height="20"
                      loading="lazy"
                    />
                    <span>{item.label}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
