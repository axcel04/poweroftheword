function RadioHome() {
    const photos = [
        "https://images.unsplash.com/photo-1504052434569-70ad5836ab65",
        "https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a",
        "https://images.unsplash.com/photo-1529070538774-1843cb3265df",
        "https://images.unsplash.com/photo-1519491050282-cf00c82424b4",
        "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3"
    ];
    return(
        <>
              {/* RADIO IMAGES - SCROLLING */}
            <section className="py-12 sm:py-20">
                <div className="max-w-7xl mx-auto px-4">
                <h2 className="text-2xl sm:text-4xl font-bold text-center mb-8 sm:mb-12">
                    Notre Radio de l'évangelisation
                </h2>
                <div className="overflow-hidden relative">
                    <div className="flex gap-4 sm:gap-8 animate-scroll">
                    {photos.concat(photos).map((img, index) => (
                        <img
                        key={index}
                        src={img}
                        alt={`Communauté ${index + 1}`}
                        className="w-64 sm:w-80 h-40 sm:h-52 object-cover rounded-xl shadow-lg"
                        loading="lazy"
                        />
                    ))}
                    </div>
                </div>
                </div>
            </section>
            
            {/* pour que les images tournent de maniere fluide et infinie de adroite vers la gauche, on utilise les keyframes et les animations css. Voici un exemple de code que vous pouvez ajouter à votre fichier CSS pour créer cet effet :  */}
            <style jsx>{`
                @keyframes scroll{

                0%{

                transform: translateX(0);

                }

                100%{

                transform: translateX(-50%);

                }

                }

                .animate-scroll{

                animation: scroll 20s linear infinite;

                } 
            `} </style>   
        </>

    )
}
export default RadioHome;