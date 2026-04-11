import React from "react";
import { CalendarDays, Clock, MapPin } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";

    const upcomingEvents = [
    {
    title: "Culte dominical spécial",
    date: "Dimanche, 5 Avril 2026",
    time: "10h00 - 12h00",
    location: "Eglise Power of the Word",
    image: "https://images.unsplash.com/photo-1507692049790-de58290a4334?w=800&q=80",
    description: "Un moment puissant de louange et d'enseignement."
    },

    {
    title: "Soirée de prière et guérison",
    date: "Mercredi, 8 Avril 2026",
    time: "18h00 - 20h00",
    location: "Salle de prière",
    image: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?w=800&q=80",
    description: "Expérimentez la puissance de Dieu."
    },

    {
    title: "Atelier jeunesse",
    date: "Samedi, 11 Avril 2026",
    time: "09h00 - 13h00",
    location: "Centre communautaire",
    image: "https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?w=800&q=80",
    description: "Formation spirituelle des jeunes."
    }

    ];

    const pastEvents = [

    {
    title: "Culte du vendredi",
    date: "17 Avril 2026",
    time: "18h00",
    location: "Power Church",
    image: "https://images.unsplash.com/photo-1519491050282-cf00c82424b4?w=800&q=80",
    description: "Soirée de louange."
    },

    {
    title: "Séance de méditation",
    date: "21 Avril 2026",
    time: "07h00",
    location: "Salle de prière",
    image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&q=80",
    description: "Moment spirituel."
    },

    {
    title: "Atelier femmes",
    date: "23 Avril 2026",
    time: "14h00",
    location: "Centre",
    image: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?w=800&q=80",
    description: "Formation femmes."
    },

    {
    title: "Jeunesse en action",
    date: "25 Avril",
    time: "10h00",
    location: "Centre jeunesse",
    image: "https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?w=800&q=80",
    description: "Leadership jeunes."
    },

    {
    title: "Culte louange",
    date: "26 Avril",
    time: "10h00",
    location: "Power Church",
    image: "https://images.unsplash.com/photo-1507692049790-de58290a4334?w=800&q=80",
    description: "Louange."
    },

    {
    title: "Prière guérison",
    date: "29 Avril",
    time: "18h00",
    location: "Salle prière",
    image: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?w=800&q=80",
    description: "Guérison."
    },

    {
    title: "Culte familial",
    date: "3 Mai",
    time: "10h00",
    location: "Power Church",
    image: "https://images.unsplash.com/photo-1519491050282-cf00c82424b4?w=800&q=80",
    description: "Famille."
    },

    {
    title: "Conférence foi",
    date: "6 Mai",
    time: "15h00",
    location: "Eglise",
    image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&q=80",
    description: "Foi."
    },

    {
    title: "Mission évangélisation",
    date: "9 Mai",
    time: "09h00",
    location: "Ville",
    image: "https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?w=800&q=80",
    description: "Mission."
    },

    {
    title: "Jeûne prière",
    date: "12 Mai",
    time: "06h00",
    location: "Eglise",
    image: "https://images.unsplash.com/photo-1507692049790-de58290a4334?w=800&q=80",
    description: "Jeûne."
    }

    ];

    const duplicatedEvents = [...pastEvents,...pastEvents];

function Events(){

    return(

       <div className="mt-16 w-full font-sans bg-gray-100 dark:bg-gray-900 dark:text-white ">

           <Header />

           {/* HERO */}
            <section className="relative h-[70vh] flex items-center justify-center text-white text-center">

                <img
                src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1600"
                className="absolute w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-black/70"/>
                <div className="relative z-10 max-w-3xl px-6">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6"> Nos Événements </h1>

                    <p className="text-lg text-gray-200"> Participez aux activités spirituelles de Power of the Word. </p>
                </div>

            </section>

            {/* UPCOMING */}

            <section className="py-20 px-6">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-4xl font-bold text-center mb-16"> Événements à venir </h2>

                    <div className="grid md:grid-cols-3 gap-10">
                        {upcomingEvents.map((event,index)=>(
                        <div key={index}
                            className="rounded-2xl shadow-lg overflow-hidden hover:scale-105 transition duration-300 border border-gray-100 dark:border-gray-800">

                            <img src={event.image} className="w-full h-52 object-cover" />

                            <div className="p-6">
                                <h3 className="text-2xl font-bold mb-3"> {event.title} </h3>
                                <p className="text-gray-600 flex items-center gap-2"> 
                                    <CalendarDays size={20} className="text-blue-500" /> 
                                    <span>{event.date}</span> 
                                </p>
                                <p className="text-gray-600 flex items-center gap-2"> 
                                    <Clock size={20} className="text-blue-500" /> 
                                    <span>{event.time}</span> 
                                </p>
                                <p className="text-gray-600 mb-3 flex items-center gap-2"> 
                                    <MapPin size={20} className="text-blue-500" /> 
                                    <span>{event.location}</span> 
                                </p>
                                <p className="text-gray-700 mb-5"> {event.description} </p>

                                <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
                                   Voir détails
                                </button>
                            </div>
                        </div>
                        ))}

                    </div>
                </div>
            </section>

            {/* PAST EVENTS */}

            <section className="py-24 overflow-hidden">
                <div className="max-w-7xl mx-auto px-6">
                    <h2 className="text-4xl font-bold text-center mb-16">
                       Événements passés
                    </h2>
                    <div className="overflow-hidden">
                        <div className="flex gap-8 animate-scroll">

                            {duplicatedEvents.map((event,index)=>(
                            <div key={index}
                                className="min-w-[320px] rounded-2xl shadow-xl hover:shadow-2xl transition border border-gray-200 dark:border-gray-800">

                                <img
                                src={event.image}
                                className="w-full h-48 object-cover rounded-t-2xl"
                                />

                                <div className="p-5">
                                    <h3 className="text-2xl font-bold mb-3"> {event.title} </h3>
                                <p className="text-gray-600 flex items-center gap-2"> 
                                    <CalendarDays size={20} className="text-blue-500" /> 
                                    <span>{event.date}</span> 
                                </p>
                                <p className="text-gray-600 flex items-center gap-2"> 
                                    <Clock size={20} className="text-blue-500" /> 
                                    <span>{event.time}</span> 
                                </p>
                                <p className="text-gray-600 mb-3 flex items-center gap-2"> 
                                    <MapPin size={20} className="text-blue-500" /> 
                                    <span>{event.location}</span> 
                                </p>
                                <p className="text-gray-700 mb-5"> {event.description} </p>
                                </div>
                            </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}

            <section className="bg-gray-300 text-gray-700 dark:bg-gray-800 dark:text-white py-24 text-center">
                <h2 className="text-4xl font-bold mb-6"> Soutenir l'œuvre de Dieu </h2>
                <p className="mb-8 text-lg"> Vos dons aident l'église à continuer sa mission.</p>
                <button className="bg-white text-blue-600 px-10 py-3 rounded-lg hover:bg-gray-100">
                    Faire un don
                </button>
            </section>

            <style jsx>{`
            @keyframes scrollEvents{

            0%{
            transform:translateX(0);
            }

            100%{
            transform:translateX(-50%);
            }

            }

            .animate-scroll{

            animation:scrollEvents 60s linear infinite;

            }
            `} </style>  

            <Footer />        

        </div>
    )
}

export default Events;