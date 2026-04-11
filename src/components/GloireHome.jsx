function GloireHome() {
    const galleries = [
        "gloire4.jpg",
        "gloire1.jpg",
        "gloire2.jpg",
        "gloire3.jpg"
    ];
    return(
        <>
            {/* MOMENT DE GLOIRE */}
            <section className="py-12 sm:py-24">
                <div className="max-w-6xl mx-auto px-4">
                <h2 className="text-2xl sm:text-4xl font-bold text-center mb-8 sm:mb-16">
                    Moments de gloire
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
                    {galleries.map((img, index) => (
                    <div
                        key={index}
                        className="group relative overflow-hidden rounded-xl shadow-lg"
                    >
                        <img
                        src={img}
                        alt={`Galerie ${index + 1}`}
                        className="rounded-xl h-56 sm:h-64 w-full object-cover transform group-hover:scale-110 transition duration-700"
                        loading="lazy"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition duration-500 flex items-center justify-center">
                        <p className="text-white text-lg sm:text-xl font-bold">
                            Power of the word
                        </p>
                        </div>
                    </div>
                    ))}
                </div>
                </div>
            </section>
        </>
    )
}
export default GloireHome;