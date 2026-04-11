import { Link } from "react-router-dom";

function Eglise() {

    return(
        <>
            {/* ABOUT IMAGE LEFT */}
            <section className="py-12 sm:py-24">
                <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-8 sm:gap-16 items-center">
                <img
                    className="rounded-2xl shadow-xl w-full h-64 sm:h-auto object-cover order-1 md:order-none"
                    src="https://images.unsplash.com/photo-1438032005730-c779502df39b"
                    alt="Église Power of the Word"
                    loading="lazy"
                />
                <div className="text-center md:text-left">
                    <h2 className="text-2xl sm:text-4xl font-bold mb-4 sm:mb-6">
                    Eglise Power of the Word
                    </h2>
                    <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">
                    Notre église est un lieu où Dieu agit puissamment,
                    où les familles sont restaurées et où les vies
                    sont transformées.
                    </p>
                    <Link to="/about" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition">
                    Notre histoire
                    </Link>
                </div>
                </div>
            </section>
        </>
    )
}
export default Eglise;