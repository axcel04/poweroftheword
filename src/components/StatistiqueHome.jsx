import { useState, useEffect } from "react";

function StatistiqueHome() {
    const [inde, setInde] = useState(0);

    const stats = [
        { number: "500+", text: "Membres" },
        { number: "50+", text: "Jeunes" },
        { number: "100+", text: "Familles" },
        { number: "10+", text: "Années de ministère" }
    ];

     useEffect(() => {
        const interval = setInterval(() => {
          setInde((prev) => (prev + 1) % stats.length);
        }, 3000);
        return () => clearInterval(interval);
      }, []);

    return(
        <>
              {/* STATS */}
            <section className="bg-gray-300 text-gray-700 dark:bg-gray-800 dark:text-white py-16 sm:py-24 overflow-hidden">
                <div className="max-w-6xl mx-auto px-4 text-center">
                <h2 className="text-2xl sm:text-3xl font-bold mb-8 sm:mb-16">
                    Notre impact
                </h2>
                <div className="relative h-32 sm:h-40">
                    <div
                    className="flex transition-transform duration-700"
                    style={{ transform: `translateX(-${inde * 100}%)` }}
                    >
                    {stats.map((stat, i) => (
                        <div
                        key={i}
                        className="min-w-full flex flex-col items-center justify-center"
                        >
                        <h3 className="text-3xl sm:text-5xl font-bold text-blue-600">
                            {stat.number}
                        </h3>
                        <p className="text-base sm:text-xl mt-2 sm:mt-4">
                            {stat.text}
                        </p>
                        </div>
                    ))}
                    </div>
                </div>
                
                {/* Touch indicators for stats */}
                <div className="flex justify-center gap-2 mt-6 sm:hidden">
                    {stats.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setInde(i)}
                        className={`w-2 h-2 rounded-full transition ${
                        inde === i ? 'bg-blue-400 w-4' : 'bg-gray-600'
                        }`}
                    />
                    ))}
                </div> 
                </div>
            </section>
        </>
    )
}
export default StatistiqueHome;