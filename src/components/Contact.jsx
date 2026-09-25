import { useState } from "react";
import { copy, t } from "../data/copy";
import { usePortfolio } from "../context/PortfolioContext";
import ConstellationCanvas from "./ConstellationCanvas";

export default function Contact() {
  const { language } = usePortfolio();
  const [submitState, setSubmitState] = useState("idle");
  const [success, setSuccess] = useState(false);

  const onMessageWheel = (event) => {
    event.stopPropagation();
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    setSubmitState("sending");

    fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: new FormData(form),
    })
      .then(async (response) => {
        await response.json();
        if (response.status == 200) {
          setSuccess(true);
          form.style.opacity = "0";
          form.style.pointerEvents = "none";

          window.setTimeout(() => {
            form.reset();
          }, 300);

          window.setTimeout(() => {
            setSuccess(false);
            form.style.opacity = "1";
            form.style.pointerEvents = "auto";
            setSubmitState("idle");
          }, 4000);
        } else {
          setSubmitState("delivery-failed");
        }
      })
      .catch(() => {
        setSubmitState("connection-failed");
      });
  };

  const submitLabel =
    submitState === "sending"
      ? t(copy.contact.sending, language)
      : submitState === "delivery-failed"
        ? t(copy.contact.deliveryFailed, language)
        : submitState === "connection-failed"
          ? t(copy.contact.connectionFailed, language)
          : t(copy.contact.send, language);

  return (
    <section id="contact" className="contact-section">
      <ConstellationCanvas />
      <div className="contact-header reveal-on-scroll">
        <h2 className="contact-title">{t(copy.contact.title, language)}</h2>
      </div>

      <div className="contact-grid content-container">
        <div className="contact-form-wrapper reveal-on-scroll">
          <form
            id="contact-form"
            className="tactical-form"
            onSubmit={onSubmit}
            style={success ? { opacity: 0, pointerEvents: "none" } : undefined}
          >
            <input
              type="hidden"
              name="access_key"
              value="1718b2b4-1b9b-4ecf-a1ae-6e3950d269c4"
            />

            <div className="input-group">
              <label htmlFor="name">{t(copy.contact.nameLabel, language)}</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder={t(copy.contact.namePlaceholder, language)}
                minLength={2}
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="email">{t(copy.contact.emailLabel, language)}</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder={t(copy.contact.emailPlaceholder, language)}
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="message">{t(copy.contact.messageLabel, language)}</label>
              <textarea
                id="message"
                name="message"
                placeholder={t(copy.contact.messagePlaceholder, language)}
                minLength={10}
                required
                onWheel={onMessageWheel}
                onTouchMove={onMessageWheel}
              ></textarea>
            </div>

            <input type="checkbox" name="botcheck" style={{ display: "none" }} />

            <div className="form-footer">
              <button
                type="submit"
                className={`submit-btn${
                  submitState === "delivery-failed" || submitState === "connection-failed"
                    ? " error-state"
                    : ""
                }`}
                id="submit-btn"
                disabled={submitState === "sending"}
              >
                {submitLabel}
              </button>
              <span id="form-status-text" className="status-text"></span>
            </div>
          </form>

          <div
            id="form-success-overlay"
            className={`form-success-overlay${success ? " active" : ""}`}
          >
            <div className="success-icon-ring">
              <svg viewBox="0 0 24 24">
                <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" />
              </svg>
            </div>
            <h3 className="success-title">{t(copy.contact.success, language)}</h3>
          </div>
        </div>

        <div
          className="contact-info-wrapper reveal-on-scroll"
          style={{ transitionDelay: "0.2s" }}
        >
          <h3 className="info-headline">{t(copy.contact.otherWays, language)}</h3>

          <div className="info-item-group">
            <div className="info-item">
              <span className="info-label">{t(copy.contact.email, language)}</span>
              <a
                href="mailto:panuwasanapitranont@gmail.com?subject=Reaching%20out%20from%20your%20portfolio"
                className="info-value link-with-arrow"
              >
                panuwasanapitranont@gmail.com
                <svg viewBox="0 0 24 24" className="link-arrow">
                  <path d="M7 17L17 7M17 7H8M17 7V16" />
                </svg>
              </a>
            </div>

            <div className="info-item">
              <span className="info-label">{t(copy.contact.lineId, language)}</span>
              <a
                href="https://line.me/ti/p/CpU7Qun4PB"
                target="_blank"
                rel="noopener noreferrer"
                className="info-value link-with-arrow"
              >
                panu27113
                <svg viewBox="0 0 24 24" className="link-arrow">
                  <path d="M7 17L17 7M17 7H8M17 7V16" />
                </svg>
              </a>
            </div>

            <div className="info-item">
              <span className="info-label">{t(copy.contact.facebook, language)}</span>
              <a
                href="https://www.facebook.com/Panu.Wasanapitranont"
                target="_blank"
                rel="noopener noreferrer"
                className="info-value link-with-arrow"
              >
                Panu Wasanapitranont
                <svg viewBox="0 0 24 24" className="link-arrow">
                  <path d="M7 17L17 7M17 7H8M17 7V16" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="section-footer reveal-on-scroll">
        <p className="footer-quote">{t(copy.contact.quote, language)}</p>
        <p className="footer-copyright">{t(copy.contact.copyright, language)}</p>
      </div>
    </section>
  );
}
