import { Fragment, useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { copy, t } from "../data/copy";
import { workOrder, works } from "../data/works";
import { usePortfolio } from "../context/PortfolioContext";
import ConstellationCanvas from "./ConstellationCanvas";

const CARD_COUNT = workOrder.length;
const TRACK_EASE = "transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)";

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

function logicalIndexFromTrack(trackIndex, total) {
  if (total <= 1) return 0;
  if (trackIndex <= 0) return total - 1;
  if (trackIndex >= total + 1) return 0;
  return trackIndex - 1;
}

function loopSlides(images) {
  if (images.length <= 1) return images;
  return [images[images.length - 1], ...images, images[0]];
}

function isMobileViewport() {
  return window.matchMedia("(max-width: 768px)").matches;
}

function PrevIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M17.59 18L19 16.59 14.42 12 19 7.41 17.59 6l-6 6z" />
      <path d="M11.59 18L13 16.59 8.42 12 13 7.41 11.59 6l-6 6z" />
    </svg>
  );
}

function NextIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M6.41 6L5 7.41 9.58 12 5 16.59 6.41 18l6-6z" />
      <path d="M12.41 6L11 7.41 15.58 12 11 16.59 12.41 18l6-6z" />
    </svg>
  );
}

function Pager({ id, countId, prevId, nextId, count, hidden, onPrev, onNext }) {
  return (
    <div className={`panel-pager${hidden ? " hidden-pager" : ""}`} id={id}>
      <button
        type="button"
        className="panel-pager-btn"
        id={prevId}
        aria-label="Previous image"
        onClick={onPrev}
      >
        <PrevIcon />
      </button>
      <span className="panel-pager-count" id={countId}>
        {count}
      </span>
      <button
        type="button"
        className="panel-pager-btn"
        id={nextId}
        aria-label="Next image"
        onClick={onNext}
      >
        <NextIcon />
      </button>
    </div>
  );
}

export default function Works() {
  const { language, panelOpen, setPanelOpen, setScrollLocked } = usePortfolio();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== "undefined" && window.innerWidth <= 768,
  );
  const [activeWorkId, setActiveWorkId] = useState(null);
  const [imageIndex, setImageIndex] = useState(0);
  const [trackIndex, setTrackIndex] = useState(0);
  const [trackInstant, setTrackInstant] = useState(false);
  const [panelShown, setPanelShown] = useState(false);
  const [closing, setClosing] = useState(false);
  const [techStackSnapshot, setTechStackSnapshot] = useState(null);
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
  const modalModeRef = useRef(modal.mode);
  const autoplayRef = useRef(null);
  const panelAutoplayRef = useRef(null);
  const carouselRef = useRef(null);
  const panelRef = useRef(null);
  const panelTrackRef = useRef(null);
  const panelImageRef = useRef(null);
  const modalFrameRef = useRef(null);
  const videoRef = useRef(null);
  const imagesRef = useRef([]);
  const imageIndexRef = useRef(0);
  const trackIndexRef = useRef(0);
  const languageRef = useRef(language);
  const stepPanelRef = useRef(() => {});
  const stepModalRef = useRef(() => {});

  panelOpenRef.current = panelOpen;
  modalActiveRef.current = modal.active;
  modalModeRef.current = modal.mode;
  imageIndexRef.current = imageIndex;
  trackIndexRef.current = trackIndex;
  languageRef.current = language;

  const activeWork = activeWorkId ? works[activeWorkId] : null;
  const images = activeWork?.images || [];
  imagesRef.current = images;

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
      if (!modalActiveRef.current) stepPanelRef.current(1);
    }, 3000);
  };

  const stepPanel = (direction) => {
    const total = imagesRef.current.length;
    if (total <= 1) return;

    let index = trackIndexRef.current;
    if (index === total + 1 || index === 0) {
      index = index === total + 1 ? 1 : total;
      trackIndexRef.current = index;
      flushSync(() => {
        setTrackInstant(true);
        setTrackIndex(index);
      });
      panelTrackRef.current?.offsetHeight;
      flushSync(() => {
        setTrackInstant(false);
      });
    }

    index += direction;
    trackIndexRef.current = index;
    const logical = logicalIndexFromTrack(index, total);
    imageIndexRef.current = logical;
    setTrackIndex(index);
    setImageIndex(logical);
  };
  stepPanelRef.current = stepPanel;

  const stepModal = (direction) => {
    const total = imagesRef.current.length;
    if (total === 0) return;
    setModal((current) => {
      if (current.mode !== "image") return current;
      return {
        ...current,
        imageIndex: (current.imageIndex + direction + total) % total,
      };
    });
  };
  stepModalRef.current = stepModal;

  useEffect(() => {
    const onResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (mobile) stopAutoplay();
      else startAutoplay();
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

  useEffect(() => {
    const bindHorizontalSwipe = (el, onSwipe) => {
      if (!el) return () => {};
      let startX = 0;
      let startY = 0;
      let tracking = false;
      let swiped = false;

      const onStart = (event) => {
        if (!isMobileViewport() || event.touches.length !== 1) return;
        if (event.target.closest(".panel-pager, .tactical-arrow")) return;
        startX = event.touches[0].clientX;
        startY = event.touches[0].clientY;
        tracking = true;
        swiped = false;
      };

      const onEnd = (event) => {
        if (!tracking) return;
        tracking = false;
        const touch = event.changedTouches[0];
        const dx = touch.clientX - startX;
        const dy = touch.clientY - startY;
        if (Math.abs(dx) < 40 || Math.abs(dx) <= Math.abs(dy)) return;
        swiped = true;
        onSwipe(dx < 0 ? 1 : -1);
      };

      const onClick = (event) => {
        if (!swiped) return;
        event.preventDefault();
        event.stopPropagation();
        swiped = false;
      };

      el.addEventListener("touchstart", onStart, { passive: true });
      el.addEventListener("touchend", onEnd, { passive: true });
      el.addEventListener("click", onClick, true);
      return () => {
        el.removeEventListener("touchstart", onStart);
        el.removeEventListener("touchend", onEnd);
        el.removeEventListener("click", onClick, true);
      };
    };

    const unbindPanel = bindHorizontalSwipe(panelImageRef.current, (direction) => {
      stepPanelRef.current(direction);
      stopPanelAutoplay();
      startPanelAutoplay();
    });
    const unbindModal = bindHorizontalSwipe(modalFrameRef.current, (direction) => {
      if (!modalActiveRef.current || modalModeRef.current !== "image") return;
      stepModalRef.current(direction);
    });

    return () => {
      unbindPanel();
      unbindModal();
    };
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
    const nextImages = data.images || [];
    const startTrack = nextImages.length > 1 ? 1 : 0;
    imagesRef.current = nextImages;
    trackIndexRef.current = startTrack;
    imageIndexRef.current = 0;

    if (panelRef.current) panelRef.current.scrollTop = 0;
    setActiveWorkId(workId);
    setImageIndex(0);
    setTrackIndex(startTrack);
    setTrackInstant(true);
    setClosing(false);
    setPanelShown(true);
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

    startPanelAutoplay();

    window.setTimeout(() => {
      isTransitioningRef.current = false;
    }, isMobileViewport() ? 500 : 1000);
  };

  const closePanel = () => {
    if (isTransitioningRef.current || !panelOpenRef.current) return;
    isTransitioningRef.current = true;
    stopPanelAutoplay();
    setClosing(true);
    setPanelOpen(false);
    setScrollLocked(false);

    window.setTimeout(() => {
      setPanelShown(false);
      setClosing(false);
      startAutoplay();
      isTransitioningRef.current = false;
    }, isMobileViewport() ? 500 : 400);
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

  const onPanelStep = (event, direction) => {
    event.stopPropagation();
    stepPanel(direction);
    stopPanelAutoplay();
    startPanelAutoplay();
  };

  const openImageModal = (event) => {
    if (event.target.closest(".panel-pager")) return;
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
      const total = imagesRef.current.length;
      const logical = modal.imageIndex;
      const nextTrack = total > 1 ? logical + 1 : 0;
      trackIndexRef.current = nextTrack;
      imageIndexRef.current = logical;
      setTrackInstant(true);
      setTrackIndex(nextTrack);
      setImageIndex(logical);
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
      event.target.closest("#modal-pager") ||
      event.target.closest(".tactical-arrow")
    ) {
      return;
    }
    closeModal();
  };

  const onModalArrow = (event, direction) => {
    event.stopPropagation();
    if (modal.mode === "image") {
      stepModal(direction);
      return;
    }
    setModal((current) => ({
      ...current,
      videoIndex:
        (current.videoIndex + direction + current.videos.length) %
        current.videos.length,
    }));
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

  const showPanelPager = images.length > 1;
  const showModalPager = modal.mode === "image" && images.length > 1;
  const showModalArrows = modal.mode === "video" && modal.videos.length > 1;
  const panelCount = `${imageIndex + 1} / ${Math.max(images.length, 1)}`;
  const modalCount = `${modal.imageIndex + 1} / ${Math.max(images.length, 1)}`;

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
              <PrevIcon />
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
              <NextIcon />
            </button>
          </div>
        </div>
      </div>

      <div
        id="project-side-panel"
        ref={panelRef}
        className={`side-panel${panelShown ? " open" : ""}${closing ? " closing" : ""}`}
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
          ref={panelImageRef}
          className="panel-image placeholder-img"
          onMouseEnter={stopPanelAutoplay}
          onMouseLeave={() => {
            if (!modalActiveRef.current) startPanelAutoplay();
          }}
          onClick={openImageModal}
        >
          <div
            id="panel-image-track"
            ref={panelTrackRef}
            className="panel-image-track"
            style={{
              transform: `translateX(-${trackIndex * 100}%)`,
              transition: trackInstant ? "none" : TRACK_EASE,
            }}
          >
            {loopSlides(images).map((url, index) => (
              <div
                key={`${url}-${index}`}
                className="track-img"
                style={{ backgroundImage: `url('${url}')` }}
              ></div>
            ))}
          </div>
          <Pager
            id="panel-pager"
            countId="panel-pager-count"
            prevId="panel-btn-prev"
            nextId="panel-btn-next"
            count={panelCount}
            hidden={!showPanelPager}
            onPrev={(event) => onPanelStep(event, -1)}
            onNext={(event) => onPanelStep(event, 1)}
          />
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
                    <span className="btn-label">{t(link.label, language)}</span>
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
                  <span className="btn-label">{t(link.label, language)}</span>
                </a>
              );
            })}
          </div>
        </div>

        <button className="close-btn" onClick={closePanel}>
          <span className="btn-label">{t(copy.works.close, language)}</span>
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
          onClick={(event) => onModalArrow(event, -1)}
        >
          <PrevIcon />
        </button>

        <div className="modal-image-wrapper">
          <div className="modal-image-frame" ref={modalFrameRef}>
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
            <Pager
              id="modal-pager"
              countId="modal-pager-count"
              prevId="modal-pager-prev"
              nextId="modal-pager-next"
              count={modalCount}
              hidden={!showModalPager}
              onPrev={(event) => {
                event.stopPropagation();
                stepModal(-1);
              }}
              onNext={(event) => {
                event.stopPropagation();
                stepModal(1);
              }}
            />
          </div>
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
          onClick={(event) => onModalArrow(event, 1)}
        >
          <NextIcon />
        </button>
      </div>
    </section>
  );
}
