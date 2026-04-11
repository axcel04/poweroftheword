import videoBg from "../assets/gloire.mp4";
import { Link } from "react-router-dom";

function HeroHome() {

    return(
        <>
              {/* HERO */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden">
                {/* VIDEO */}
                <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
                >
                <source src={videoBg} type="video/mp4" />
                </video>

                {/* GRADIENT OVERLAY */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/90" />

                {/* CONTENT */}
                <div className="relative z-10 text-center text-white max-w-5xl px-4 sm:px-6 animate-fade">
                <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold mb-4 sm:mb-6 leading-tight">
                    La présence de Dieu transforme les vies
                </h1>
                <p className="text-base sm:text-xl text-gray-200 mb-6 sm:mb-10 max-w-2xl mx-auto px-4">
                    Venez expérimenter l'amour, la paix et la puissance du Seigneur dans une atmosphère de gloire.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center px-4">
                    <Link to="/about" className="bg-blue-600 px-6 sm:px-10 py-3 sm:py-4 rounded-xl text-base sm:text-lg hover:bg-blue-700 transition shadow-lg">
                    Découvrir l'église
                    </Link>
                    <Link to="/programme" className="border border-white px-6 sm:px-10 py-3 sm:py-4 rounded-xl text-base sm:text-lg hover:bg-white hover:text-black transition">
                    Nous rejoindre
                    </Link>
                </div>
                </div>

                {/* SCROLL INDICATOR */}
                <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 hidden sm:block">
                <div className="w-8 h-14 border-2 border-white rounded-full flex justify-center">
                    <div className="w-2 h-3 bg-white rounded-full mt-2 animate-scroll" />
                </div>
                </div>
            </section>
      </>
    )
}

export default HeroHome;