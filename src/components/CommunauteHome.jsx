import { useState,useEffect } from "react";

function CommunauteHome() {
    const [index, setIndex] = useState(0);
    
    const images = [
        "https://images.unsplash.com/photo-1529070538774-1843cb3265df",
        "https://images.unsplash.com/photo-1504052434569-70ad5836ab65",
        "https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a"
    ];

      // Changement automatique toutes les 3 secondes
    useEffect(() => {
        const interval = setInterval(() => {
          setIndex((prev) => (prev + 1) % images.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return(
        <>
             {/* IMAGE RIGHT WITH SLIDER */}
            <section className="py-12 sm:py-24">
                <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-8 sm:gap-16 items-center">
                <div className="text-center md:text-left">
                    <h2 className="text-2xl sm:text-4xl font-bold mb-4 sm:mb-6">
                    Une communauté d'amour
                    </h2>
                    <p className="text-gray-600 text-sm sm:text-base">
                    Nous croyons que chaque personne est précieuse aux yeux de Dieu.
                    Dans notre communauté, chacun est accueilli avec amour, guidé dans la foi,
                    et encouragé à grandir spirituellement. Ensemble, nous bâtissons des vies pleines
                    d'espérance, de paix et de joie.
                    </p>
                </div>
                <div className="flex justify-center">
                    <img
                    src={images[index]}
                    alt="Communauté"
                    className="rounded-2xl shadow-xl w-full h-64 sm:h-[400px] object-cover transition duration-1000"
                    loading="lazy"
                    />
                </div>
                </div>
            </section>
       </>
    )
}
export default CommunauteHome;