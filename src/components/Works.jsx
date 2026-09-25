import { Fragment, useEffect, useRef, useState } from "react";
import { copy, t } from "../data/copy";
import { workOrder, works } from "../data/works";
import { usePortfolio } from "../context/PortfolioContext";
import ConstellationCanvas from "./ConstellationCanvas";

const CARD_COUNT = workOrder.length;

function getCoverflowStyle(index, activeIndex) {
  const maxDiff = Math.floor(CARD_COUNT / 2);
  let diff = index - activeIndex;
  if (diff < -maxDiff) diff += CARD_COUNT;
  if (diff > maxDiff) diff -= CARD_COUNT;

  const translateX = diff * 540;
  const scale = diff === 0 ? 1.05 : 1;
  const opacity = diff === 0 ? 1 : Math.abs(diff) === 1 ? 0.4 : 0;
  const zIndex = diff === 0 ? 10 : Math.abs(diff) === 1 ? 5 : 0;
  const pointerEvents = Math.abs(diff) <= 1 ? "auto" : "none";

  return {
    diff,
    style: {
      transform: `translateX(${translateX}px) scale(${scale})`,
      opacity,
      zIndex,
      pointerEvents,
    },
  };
}

function renderTitle(title) {
  return title.split("\n").map((line, index) => (
    <Fragment key={index}>
      {index > 0 && <br />}
      {line}
    </Fragment>
  ));
}

export default function Works() {
  const { language, panelOpen, setPanelOpen, setScrollLocked } = usePortfolio();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== "undefined" && window.innerWidth <= 768,
  );
  const [activeWorkId, setActiveWorkId] = useState(null);
  const [imageIndex, setImageIndex] = useState(0);
  const [techStackSnapshot, setTechStackSnapshot] = useState(null);
  const [trackInstant, setTrackInstant] = useState(false);
  const [modal, setModal] = useState({
    active: false,
    mode: "image",
    imageIndex: 0,
    videoIndex: 0,
    videos: [],
  });

  const isTransitioningRef = useRef(false);
  const panelOpenRef = useRef(panelOpen);
  const modalActiveRef = useRef(false);
  const autoplayRef = useRef(null);
  const panelAutoplayRef = useRef(null);
  const carouselRef = useRef(null);
  const panelRef = useRef(null);
  const videoRef = useRef(null);
  const imagesRef = useRef([]);
  const imageIndexRef = useRef(0);
  const languageRef = useRef(language);

  panelOpenRef.current = panelOpen;
  modalActiveRef.current = modal.active;
  imageIndexRef.current = imageIndex;
  languageRef.current = language;

  const activeWork = activeWorkId ? works[activeWorkId] : null;
  imagesRef.current = activeWork?.images || [];

  const stopAutoplay = () => {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
      autoplayRef.current = null;
    }
  };

  const startAutoplay = () => {
    stopAutoplay();
    if (window.innerWidth <= 768) return;
    if (panelOpenRef.current) return;
    autoplayRef.current = setInterval(() => {
      if (isTransitioningRef.current || panelOpenRef.current) return;
      setActiveIndex((current) => (current + 1) % CARD_COUNT);
    }, 3000);
  };

  const stopPanelAutoplay = () => {
    if (panelAutoplayRef.current) {
      clearInterval(panelAutoplayRef.current);
      panelAutoplayRef.current = null;
    }
  };

  const startPanelAutoplay = () => {
    stopPanelAutoplay();
    if (imagesRef.current.length <= 1) return;
    panelAutoplayRef.current = setInterval(() => {
      if (!modalActiveRef.current) {
        setImageIndex((current) => (current + 1) % imagesRef.current.length);
      }
    }, 3000);
  };

  useEffect(() => {
    const onResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (mobile) {
        stopAutoplay();
      } else {
        startAutoplay();
      }
    };

    window.addEventListener("resize", onResize);
    startAutoplay();
    return () => {
      window.removeEventListener("resize", onResize);
      stopAutoplay();
      stopPanelAutoplay();
    };
  }, []);

  useEffect(() => {
    const container = carouselRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (!panelOpenRef.current) startAutoplay();
          } else {
            stopAutoplay();
          }
        });
      },
      { threshold: 0.2 },
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onDocumentClick = (event) => {
      if (!panelOpenRef.current) return;
      if (modalActiveRef.current) return;
      if (panelRef.current && !panelRef.current.contains(event.target)) {
        closePanel();
      }
    };

    document.addEventListener("click", onDocumentClick);
    return () => document.removeEventListener("click", onDocumentClick);
  }, []);

  const moveNext = () => {
    if (isTransitioningRef.current || panelOpenRef.current) return;
    setActiveIndex((current) => (current + 1) % CARD_COUNT);
  };

  const movePrev = () => {
    if (isTransitioningRef.current || panelOpenRef.current) return;
    setActiveIndex((current) => (current - 1 + CARD_COUNT) % CARD_COUNT);
  };

  const openPanel = (workId) => {
    if (isTransitioningRef.current || panelOpenRef.current) return;
    isTransitioningRef.current = true;
    stopAutoplay();

    const data = works[workId];
    if (panelRef.current) panelRef.current.scrollTop = 0;
    setActiveWorkId(workId);
    setImageIndex(0);
    setTrackInstant(true);
    if (data.techStack && data.techStack.length > 0) {
      setTechStackSnapshot({
        label: t(copy.works.techStack, languageRef.current),
        items: data.techStack,
      });
    } else {
      setTechStackSnapshot(null);
    }

    setScrollLocked(true);
    setPanelOpen(true);

    window.setTimeout(() => {
      setTrackInstant(false);
    }, 50);

    window.setTimeout(() => {
      startPanelAutoplay();
      isTransitioningRef.current = false;
    }, 500);
  };

  const closePanel = () => {
    if (isTransitioningRef.current) return;
    isTransitioningRef.current = true;
    stopPanelAutoplay();
    setPanelOpen(false);
    setScrollLocked(false);

    window.setTimeout(() => {
      startAutoplay();
      isTransitioningRef.current = false;
    }, 500);
  };

  const onCardClick = (workId, diff) => {
    if (isTransitioningRef.current || panelOpenRef.current) return;

    if (window.innerWidth <= 768) {
      openPanel(workId);
      return;
    }

    if (diff === 1) moveNext();
    else if (diff === -1) movePrev();
    openPanel(workId);
  };

  const onArrowNext = () => {
    moveNext();
    stopAutoplay();
    startAutoplay();
  };

  const onArrowPrev = () => {
    movePrev();
    stopAutoplay();
    startAutoplay();
  };

  const nextPanelImage = () => {
    if (imagesRef.current.length <= 1) return;
    setImageIndex((current) => (current + 1) % imagesRef.current.length);
  };

  const prevPanelImage = () => {
    if (imagesRef.current.length <= 1) return;
    setImageIndex(
      (current) =>
        (current - 1 + imagesRef.current.length) % imagesRef.current.length,
    );
  };

  const onPanelArrow = (event, direction) => {
    event.stopPropagation();
    if (direction === "next") nextPanelImage();
    else prevPanelImage();
    stopPanelAutoplay();
    startPanelAutoplay();
  };

  const openImageModal = (event) => {
    if (event.target.closest(".tactical-arrow")) return;
    if (imagesRef.current.length === 0) return;
    stopPanelAutoplay();
    setModal({
      active: true,
      mode: "image",
      imageIndex: imageIndexRef.current,
      videoIndex: 0,
      videos: [],
    });
  };

  const openVideoModal = (videos, startIndex) => {
    stopPanelAutoplay();
    setModal({
      active: true,
      mode: "video",
      imageIndex: imageIndexRef.current,
      videoIndex: startIndex,
      videos,
    });
  };

  const closeModal = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.src = "";
    }

    if (modal.mode === "image") {
      setTrackInstant(true);
      setImageIndex(modal.imageIndex);
      window.setTimeout(() => setTrackInstant(false), 50);
    }

    setModal((current) => ({ ...current, active: false }));
    startPanelAutoplay();
  };

  const onModalBackdropClick = (event) => {
    event.stopPropagation();
    if (
      event.target.closest("#enlarged-image") ||
      event.target.closest("#enlarged-video") ||
      event.target.closest(".tactical-arrow")
    ) {
      return;
    }
    closeModal();
  };

  const onModalNext = (event) => {
    event.stopPropagation();
    setModal((current) => {
      if (current.mode === "image") {
        return {
          ...current,
          imageIndex: (current.imageIndex + 1) % imagesRef.current.length,
        };
      }
      return {
        ...current,
        videoIndex: (current.videoIndex + 1) % current.videos.length,
      };
    });
  };

  const onModalPrev = (event) => {
    event.stopPropagation();
    setModal((current) => {
      if (current.mode === "image") {
        return {
          ...current,
          imageIndex:
            (current.imageIndex - 1 + imagesRef.current.length) %
            imagesRef.current.length,
        };
      }
      return {
        ...current,
        videoIndex:
          (current.videoIndex - 1 + current.videos.length) %
          current.videos.length,
      };
    });
  };

  useEffect(() => {
    if (!modal.active || modal.mode !== "video" || !videoRef.current) return;
    const video = videoRef.current;
    video.style.opacity = "0";
    video.src = modal.videos[modal.videoIndex];
    video.load();
    video
      .play()
      .then(() => {
        video.style.opacity = "1";
      })
      .catch(() => {
        video.style.opacity = "1";
      });
  }, [modal.active, modal.mode, modal.videoIndex, modal.videos]);

  const showPanelArrows = (activeWork?.images.length || 0) > 1;
  const showModalArrows =
    modal.mode === "image"
      ? (activeWork?.images.length || 0) > 1
      : modal.videos.length > 1;

  return (
    <section
      id="project"
      className={`project-section${panelOpen ? " panel-open" : ""}`}
    >
      <ConstellationCanvas />

      <div className="reveal-on-scroll" style={{ width: "100%" }}>
        <h2 className="section-title">{t(copy.works.title, language)}</h2>
      </div>

      <div className="reveal-on-scroll" style={{ transitionDelay: "0.2s", width: "100%" }}>
        <div
          ref={carouselRef}
          className={`project-carousel-container${panelOpen ? " shifted" : ""}`}
        >
          <div className="carousel-wrapper">
            <button className="tactical-arrow prev-arrow" id="btn-prev" onClick={onArrowPrev}>
              <svg viewBox="0 0 24 24">
                <path d="M17.59 18L19 16.59 14.42 12 19 7.41 17.59 6l-6 6z" />
                <path d="M11.59 18L13 16.59 8.42 12 13 7.41 11.59 6l-6 6z" />
              </svg>
            </button>

            <div className="project-carousel">
              {workOrder.map((workId, index) => {
                const work = works[workId];
                const { diff, style } = isMobile
                  ? { diff: 0, style: undefined }
                  : getCoverflowStyle(index, activeIndex);

                return (
                  <div
                    key={workId}
                    className="project-card"
                    data-project={workId}
                    data-pos={isMobile ? undefined : String(diff)}
                    style={style}
                    onMouseEnter={stopAutoplay}
                    onMouseLeave={() => {
                      if (!panelOpenRef.current) startAutoplay();
                    }}
                    onClick={() => onCardClick(workId, diff)}
                  >
                    <div
                      className="card-image placeholder-img"
                      style={{ backgroundImage: `url("${work.cover}")` }}
                    ></div>
                    <p className="card-category">{t(work.category, language)}</p>
                    <h3 className="card-title">{t(work.cardTitle, language)}</h3>
                    <button className="details-btn">{t(copy.works.details, language)}</button>
                  </div>
                );
              })}
            </div>

            <button className="tactical-arrow next-arrow" id="btn-next" onClick={onArrowNext}>
              <svg viewBox="0 0 24 24">
                <path d="M6.41 6L5 7.41 9.58 12 5 16.59 6.41 18l6-6z" />
                <path d="M12.41 6L11 7.41 15.58 12 11 16.59 12.41 18l6-6z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div
        id="project-side-panel"
        ref={panelRef}
        className={`side-panel${panelOpen ? " open" : ""}`}
        data-active-id={activeWorkId || undefined}
      >
        <div className="panel-title">
          <span id="panel-category" className="panel-category">
            {activeWork ? t(activeWork.category, language) : "WEB APPLICATION"}
          </span>
          <span id="panel-title-text" className="panel-title-text">
            {activeWork ? renderTitle(t(activeWork.title, language)) : "Project Name"}
          </span>
        </div>

        <div
          id="panel-image"
          className="panel-image placeholder-img"
          onMouseEnter={stopPanelAutoplay}
          onMouseLeave={() => {
            if (!modalActiveRef.current) startPanelAutoplay();
          }}
          onClick={openImageModal}
        >
          <div
            id="panel-image-track"
            className="panel-image-track"
            style={{
              transform: `translateX(-${imageIndex * 100}%)`,
              transition: trackInstant
                ? "none"
                : "transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)",
            }}
          >
            {(activeWork?.images || []).map((url) => (
              <div
                key={url}
                className="track-img"
                style={{ backgroundImage: `url('${url}')` }}
              ></div>
            ))}
          </div>
          <button
            className={`tactical-arrow panel-arrow prev-arrow${showPanelArrows ? "" : " hidden-arrow"}`}
            id="panel-btn-prev"
            onClick={(event) => onPanelArrow(event, "prev")}
          >
            <svg viewBox="0 0 24 24">
              <path d="M17.59 18L19 16.59 14.42 12 19 7.41 17.59 6l-6 6z" />
              <path d="M11.59 18L13 16.59 8.42 12 13 7.41 11.59 6l-6 6z" />
            </svg>
          </button>
          <button
            className={`tactical-arrow panel-arrow next-arrow${showPanelArrows ? "" : " hidden-arrow"}`}
            id="panel-btn-next"
            onClick={(event) => onPanelArrow(event, "next")}
          >
            <svg viewBox="0 0 24 24">
              <path d="M6.41 6L5 7.41 9.58 12 5 16.59 6.41 18l6-6z" />
              <path d="M12.41 6L11 7.41 15.58 12 11 16.59 12.41 18l6-6z" />
            </svg>
          </button>
        </div>

        <div id="panel-desc" className="panel-desc">
          {activeWork ? (
            <ul>
              {t(activeWork.desc, language).map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          ) : (
            "Detailed project description goes here."
          )}
        </div>

        <p
          id="panel-tech-stack"
          className="panel-tech-stack-text"
          style={{ display: techStackSnapshot ? "block" : "none" }}
        >
          {techStackSnapshot ? (
            <>
              {techStackSnapshot.label} <span>{techStackSnapshot.items.join(", ")}</span>
            </>
          ) : null}
        </p>

        <div className="panel-actions">
          <div id="panel-dynamic-links" className="dynamic-links-group">
            {activeWork?.links.map((link) => {
              if (link.type === "video-gallery") {
                return (
                  <a
                    key={link.label.en}
                    href="#"
                    className="sidebar-btn"
                    onClick={(event) => {
                      event.preventDefault();
                      openVideoModal(link.urls, 0);
                    }}
                  >
                    {t(link.label, language)}
                  </a>
                );
              }

              return (
                <a
                  key={link.label.en}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sidebar-btn"
                >
                  {t(link.label, language)}
                </a>
              );
            })}
          </div>
        </div>

        <button className="close-btn" onClick={closePanel}>
          {t(copy.works.close, language)}
        </button>
      </div>

      <div
        id="image-modal"
        className={`image-modal${modal.active ? " active" : ""}`}
        onClick={onModalBackdropClick}
      >
        <button
          className={`tactical-arrow modal-arrow prev-arrow${showModalArrows ? "" : " hidden-arrow"}`}
          id="modal-btn-prev"
          onClick={onModalPrev}
        >
          <svg viewBox="0 0 24 24">
            <path d="M17.59 18L19 16.59 14.42 12 19 7.41 17.59 6l-6 6z" />
            <path d="M11.59 18L13 16.59 8.42 12 13 7.41 11.59 6l-6 6z" />
          </svg>
        </button>

        <div className="modal-image-wrapper">
          <img
            id="enlarged-image"
            src={
              modal.mode === "image" && activeWork
                ? activeWork.images[modal.imageIndex]
                : undefined
            }
            alt="Enlarged View"
            style={{ display: modal.mode === "image" ? "block" : "none" }}
          />
          <video
            id="enlarged-video"
            ref={videoRef}
            controls
            playsInline
            preload="auto"
            style={{
              display: modal.mode === "video" ? "block" : "none",
              opacity: 0,
              transition: "opacity 0.2s ease",
            }}
          ></video>
        </div>

        <button
          className={`tactical-arrow modal-arrow next-arrow${showModalArrows ? "" : " hidden-arrow"}`}
          id="modal-btn-next"
          onClick={onModalNext}
        >
          <svg viewBox="0 0 24 24">
            <path d="M6.41 6L5 7.41 9.58 12 5 16.59 6.41 18l6-6z" />
            <path d="M12.41 6L11 7.41 15.58 12 11 16.59 12.41 18l6-6z" />
          </svg>
        </button>
      </div>
    </section>
  );
}
