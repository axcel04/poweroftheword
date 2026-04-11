import React, { useState, useEffect, useCallback, useRef } from "react";

const TESTIMONIAL_VIDEOS = [
  { id: "1_Fzb_NWFxU", title: "Transformation radicale" },
  { id: "XHDHdmooo-Q", title: "Témoignage de foi" },
  { id: "cccu_OKMqXA", title: "Récit de guérison" },
  { id: "ehXgY7HD_20", title: "Parcours de foi" },
  { id: "xUhI6E8v6tg", title: "Une victoire éclatante" }
];

const TemoignageHome = () => {
  const middleIndex = Math.floor(TESTIMONIAL_VIDEOS.length / 2);
  const [activeVideoIndex, setActiveVideoIndex] = useState(middleIndex);
  const [viewIndex, setViewIndex] = useState(middleIndex);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [hasStarted, setHasStarted] = useState(false);
  const [isFloating, setIsFloating] = useState(false);

  const anchorRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (hasStarted && !entry.isIntersecting) {
          setIsFloating(true);
        } else {
          setIsFloating(false);
        }
      },
      { threshold: 0.1 }
    );
    if (anchorRef.current) observer.observe(anchorRef.current);
    return () => observer.disconnect();
  }, [hasStarted]);

  const getPosition = useCallback((index) => {
    let position = index - viewIndex;
    if (position < -middleIndex) position += TESTIMONIAL_VIDEOS.length;
    if (position > middleIndex) position -= TESTIMONIAL_VIDEOS.length;
    return position;
  }, [viewIndex, middleIndex]);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setViewIndex(prev => (prev + 1) % TESTIMONIAL_VIDEOS.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const selectVideo = (index) => {
    setActiveVideoIndex(index);
    setViewIndex(index);
    setIsAutoPlaying(false);
    setHasStarted(true);
  };

  const closeFloating = () => {
    setIsFloating(false);
    setHasStarted(false);
  };

  return (
    /* Réduction padding section : pt-2 (mobile) vs pt-6+ (desktop) */
    <section className="pt-8 md:pt-10 pb-4 md:pb-10 overflow-hidden ">
      <div className="max-w-6xl mx-auto px-4">
        
        {/* Titre : mb-4 (mobile) vs mb-8 (desktop) */}
        <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-4 md:mb-8 tracking-tight">
          TÉMOIGNAGES
        </h2>

        {/* PLAYER */}
        <div ref={anchorRef} className="relative max-w-4xl mx-auto aspect-video bg-gray-200 rounded-xl">
          <div className={`
            transition-all duration-500 ease-in-out shadow-2xl bg-black
            ${isFloating 
              ? "fixed bottom-4 right-4 w-64 md:w-[400px] z-[999] rounded-2xl ring-4 ring-red-600/20" 
              : "relative w-full h-full rounded-xl"
            }
          `}>
            {isFloating && (
              <div className="absolute -top-9 right-0 flex items-center gap-2">
                <div className="bg-red-600 text-white px-3 py-1 rounded-t-lg text-[10px] font-bold animate-pulse uppercase">
                  En lecture
                </div>
                <button 
                  onClick={closeFloating}
                  className="bg-gray-800 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-black transition"
                >✕</button>
              </div>
            )}

            <iframe
              src={`https://www.youtube.com/embed/${TESTIMONIAL_VIDEOS[activeVideoIndex].id}?rel=0&autoplay=${hasStarted ? 1 : 0}`}
              title={TESTIMONIAL_VIDEOS[activeVideoIndex].title}
              className="w-full h-full border-0 rounded-lg"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>

        {/* CAROUSEL : mt-4 (mobile) vs mt-10 (desktop) */}
        <div className="relative flex justify-center items-center h-40 md:h-52 mt-4 md:mt-10">
          
          <button 
            onClick={() => { setIsAutoPlaying(false); setViewIndex(prev => (prev - 1 + TESTIMONIAL_VIDEOS.length) % TESTIMONIAL_VIDEOS.length); }} 
            className="absolute left-0 z-40 p-2 bg-white text-red-600 rounded-full shadow-xl hover:bg-red-50 active:scale-90 transition"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7"/></svg>
          </button>

          <div className="relative flex justify-center items-center w-full">
            {TESTIMONIAL_VIDEOS.map((video, index) => {
              const position = getPosition(index);
              const isCentered = position === 0;
              const isPlaying = index === activeVideoIndex;

              return (
                <button
                  key={video.id}
                  onClick={() => selectVideo(index)}
                  className={`absolute transition-all duration-700 ease-in-out
                  ${isCentered ? "z-30 scale-105 md:scale-110 shadow-xl" : "z-10 scale-90 opacity-40 hover:opacity-100"}`}
                  /* Ajustement de l'écartement des miniatures sur mobile */
                  style={{ transform: `translateX(${position * (window.innerWidth < 768 ? 130 : 200)}px)` }}
                >
                  <div className={`relative rounded-xl overflow-hidden border-2 md:border-4 transition-all
                  ${isPlaying ? "border-red-600 ring-2 ring-red-500/50" : "border-white"}`}>
                    <img
                      src={`https://img.youtube.com/vi/${video.id}/mqdefault.jpg`}
                      alt={video.title}
                      className="w-28 md:w-44 object-cover"
                    />
                    {isPlaying && (
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <div className="text-white text-[8px] md:text-[9px] font-bold border border-white px-2 py-1 uppercase">
                          En lecture
                        </div>
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          <button 
            onClick={() => { setIsAutoPlaying(false); setViewIndex(prev => (prev + 1) % TESTIMONIAL_VIDEOS.length); }} 
            className="absolute right-0 z-40 p-2 bg-white text-red-600 rounded-full shadow-xl hover:bg-red-50 active:scale-90 transition"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7"/></svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default TemoignageHome;