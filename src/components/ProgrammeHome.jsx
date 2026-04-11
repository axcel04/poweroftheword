function ProgrammeHome() {

    const programmes = [
        {image : "programme1.jpg", desc : "Un moment de louange, enseignement et prière."},
        {image : "programme2.jpg", desc : "Chercher Dieu ensemble."},
        {image : "programme3.jpg", desc : "Former les leaders de demain."},
    ]

    return(
        <>
            {/* ACTIVITIES CARDS */}
            <section className="py-12 sm:py-24 ">
                <div className="max-w-6xl mx-auto px-4">
                <h2 className="text-2xl sm:text-4xl font-bold text-center mb-8 sm:mb-16">
                    Nos principaux programmes
                </h2>
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-10">
                    {programmes.map((Programme, index) => (
                    <div key={index} className="bg-white rounded-2xl shadow hover:scale-105 transition">
            
                        <img src={Programme.image} alt="progra" className="w-full h-full rounded-2xl object-cover shadow hover:scale-105 transition" />
                    
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition duration-500 flex items-center justify-center">
                        <p className="text-white text-lg sm:text-xl font-bold">
                            {Programme.desc}
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
export default ProgrammeHome;