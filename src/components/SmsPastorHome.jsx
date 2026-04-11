function SmsPastorHome() {

    return(
        <>  
             {/* PASTOR MESSAGE */}
            <section className="py-12 sm:pb-12">
                <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-8 sm:gap-16 items-center">
                <div className="flex justify-center order-2 md:order-none">
                    <img
                    className="w-64 sm:w-80 h-80 sm:h-96 object-cover rounded-2xl shadow-2xl"
                    src="paster.jpg"
                    alt="Pasteur"
                    loading="lazy"
                    />
                </div>
                <div className="text-center md:text-left">
                    <h2 className="text-2xl sm:text-4xl font-bold mb-4 sm:mb-6">
                    Message du Pasteur
                    </h2>
                    <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">
                    Notre mission est d'aider chaque personne à découvrir
                    l'amour de Dieu et marcher dans sa destinée.
                    Peu importe votre passé, Dieu a un futur glorieux pour vous.
                    </p>
                    <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">
                    Nous croyons que Dieu peut transformer votre vie,
                    restaurer votre famille et vous donner la paix.
                    </p>
                    <h3 className="text-lg sm:text-xl font-bold text-blue-600">
                    Pasteur Justin NITEZUWERA
                    </h3>
                    <p className="text-gray-500 text-sm sm:text-base">
                    Pasteur principal
                    </p>
                    {/* <button className="mt-4 sm:mt-6 bg-blue-600 text-white px-6 py-2 sm:py-3 rounded-lg hover:bg-blue-700 transition">
                    Lire plus
                    </button> */}
                </div>
                </div>
            </section>
        </>
    )
}
export default SmsPastorHome;