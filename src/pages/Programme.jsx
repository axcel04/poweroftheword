import { useState, useEffect } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";

function Programme() {
  const schedule = [
    {
      day: "Dimanche",
      events: [
        { time: "08:00 - 09:00", title: "Louange et prière", img: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?crop=entropy&cs=tinysrgb&fit=max&w=400" },
        { time: "09:00 - 10:30", title: "Culte principal", img: "https://images.unsplash.com/photo-1503945438517-f65904a52ce6?crop=entropy&cs=tinysrgb&fit=max&w=400" },
        { time: "10:30 - 11:00", title: "Partage & Témoignages", img: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?crop=entropy&cs=tinysrgb&fit=max&w=400" },
      ],
    },
    {
      day: "Mercredi",
      events: [
        { time: "18:00 - 19:00", title: "Étude biblique", img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?crop=entropy&cs=tinysrgb&fit=max&w=400" },
        { time: "19:00 - 20:00", title: "Groupe de jeunes", img: "https://images.unsplash.com/photo-1596495577886-d920f1f1422c?crop=entropy&cs=tinysrgb&fit=max&w=400" },
      ],
    },
    {
      day: "Vendredi",
      events: [
        { time: "18:30 - 20:00", title: "Réunion de prière", img: "https://images.unsplash.com/photo-1589308078059-06d9f5b2b94e?crop=entropy&cs=tinysrgb&fit=max&w=400" },
      ],
    },
  ];

  const [activeDay, setActiveDay] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile screen
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveDay(prev => (prev + 1) % schedule.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [schedule.length]);

  const minSwipeDistance = 50;

  return (
    <div className="min-h-screen font-sans overflow-x-hidden">

      <Header />
        
      {/* HERO SECTION AMÉLIORÉE */}
      <section className="relative h-[400px] sm:h-[500px] flex flex-col items-center justify-center overflow-hidden">
        {/* Vidéo de louange locale */}
        <video
          className="absolute w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
          <source 
            src="/Videos/louange.mp4"
            type="video/mp4" 
          />
          {/* Votre navigateur ne supporte pas la vidéo. */}
        </video>

        {/* Overlay sombre pour meilleure lisibilité */}
        <div className="absolute inset-0 bg-black/80"></div>

        {/* Texte principal */}
        <div className="relative z-10 text-center text-white px-4 sm:px-6">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold mb-3 sm:mb-4 animate-fade">
            Programme Hebdomadaire
          </h1>
          <p className="text-sm sm:text-base md:text-xl max-w-2xl mx-auto animate-fade-delay px-4">
            Rejoignez-nous chaque semaine pour des moments de louange, prière et fraternité.
          </p>
          <button className="mt-4 sm:mt-6 bg-blue-600 px-6 sm:px-8 py-2 sm:py-3 rounded-lg hover:bg-blue-700 transition transform hover:scale-105 text-sm sm:text-base">
            Découvrir l'église
          </button>
        </div>

        {/* Slider miniatures événements - Mobile optimized */}
        <div className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 flex gap-2 sm:gap-3 overflow-x-auto px-3 sm:px-4 py-2 bg-black/50 rounded-xl scrollbar-hide w-full justify-center">
          {schedule[activeDay].events.map((event, idx) => (
            <img
              key={idx}
              src={event.img}
              alt={event.title}
              className="h-12 sm:h-16 w-20 sm:w-24 object-cover rounded-lg border-2 border-white/70 hover:border-blue-500 transition flex-shrink-0"
              loading="lazy"
            />
          ))}
        </div>
      </section>

      {/* PAGE BACKGROUND */}
      <div
        className="bg-cover bg-center bg-fixed"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1507692049790-de58290a4334?crop=entropy&cs=tinysrgb&fit=max&w=1400')" }}
      >
        {/* SCHEDULE SLIDER */}
        <section className="relative z-10 max-w-6xl mx-auto py-12 sm:py-24 px-4 sm:px-6">
          <div className="bg-black/40 rounded-2xl sm:rounded-3xl p-4 sm:p-8 md:p-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-16 text-white animate-fade shadow-md">
              Nos Activités Hebdomadaires
            </h2>

            {/* Navigation des jours - Horizontal scroll on mobile */}
            <div className="flex justify-center gap-2 sm:gap-4 mb-8 sm:mb-12 overflow-x-auto pb-2 px-2 scrollbar-hide">
              {schedule.map((dayItem, i) => (
                <button
                  key={i}
                  onClick={() => setActiveDay(i)}
                  className={`px-2 sm:px-5 py-1.5 sm:py-2 rounded-xl font-semibold transition-all duration-300 whitespace-nowrap text-sm sm:text-base ${
                    i === activeDay
                      ? "bg-blue-600 text-white shadow-lg"
                      : "bg-white/90 text-blue-700 hover:bg-blue-100"
                  }`}
                >
                  {dayItem.day}
                </button>
              ))}
            </div>

            {/* Carousel des événements avec swipe mobile */}
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
                {schedule[activeDay].events.map((event, idx) => (
                  <div
                    key={idx}
                    className="group relative bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all transform hover:-translate-y-2 sm:hover:-translate-y-3"
                  >
                    <div className="h-48 sm:h-56 w-full overflow-hidden">
                      <img
                        src={event.img}
                        alt={event.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-4 sm:p-6 text-center">
                      <span className="inline-block bg-blue-100 text-blue-700 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium mb-2 sm:mb-3">
                        {schedule[activeDay].day}
                      </span>
                      <h3 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2">{event.title}</h3>
                      <p className="text-gray-500 text-sm sm:text-base">{event.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Dots indicator for mobile */}
            <div className="flex justify-center gap-2 mt-6 sm:hidden">
              {schedule.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveDay(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === activeDay 
                      ? 'bg-blue-500 w-6' 
                      : 'bg-white/50 w-2'
                  }`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* HIGHLIGHT SECTION */}
        <section className="relative z-10 bg-black/50 py-12 sm:py-24 mt-6 sm:mt-12 rounded-2xl sm:rounded-3xl mx-4 sm:mx-6">
          <div className="max-w-6xl mx-auto text-center px-4 sm:px-6">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-white animate-fade shadow-md">
              Venez vivre la foi avec nous !
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-200 mb-6 sm:mb-10 animate-fade-delay px-4">
              Chaque activité est une opportunité de rencontrer le Seigneur et de grandir dans la foi.
            </p>
            <button className="bg-blue-600 px-6 sm:px-8 md:px-10 py-2.5 sm:py-3 md:py-4 rounded-xl text-white hover:bg-blue-700 transition transform hover:scale-105 text-sm sm:text-base">
              Contactez-nous
            </button>
          </div>
        </section>
      </div>

      {/* Add custom styles for scrollbar hiding */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        @keyframes fade {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade {
          animation: fade 0.8s ease-out;
        }
        .animate-fade-delay {
          animation: fade 0.8s ease-out 0.3s both;
        }
      `}</style>

      <Footer />

    </div>
  );
}

export default Programme;