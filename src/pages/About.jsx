import React from "react";
import { Heart, Users, Church, HandHeart, MapPin, Phone, Mail, CalendarDays, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

function About(){

  const programs = [
  {
  title:"Culte dominical",
  day:"Dimanche",
  time:"09:00 - 12:00",
  actions:["Louange et adoration","Prédication","Prière de guérison","Accompagnement spirituel"],
  icon:<Church size={28}/>
  },
  {
  title:"Réunion de prière",
  day:"Mercredi",
  time:"16:00 - 18:00",
  actions:["Intercession","Etude biblique","Conseils spirituels","Prière pour les familles"],
  icon:<HandHeart size={28}/>
  },
  {
  title:"Programme des jeunes",
  day:"Samedi",
  time:"14:00 - 17:00",
  actions:["Formation biblique","Motivation","Musique gospel","Encadrement des jeunes"],
  icon:<Users size={28}/>
  }
  ]

  return(

    <div className="w-full font-sans bg-gray-100 dark:bg-gray-900 dark:text-white">
      <Header />

      {/* HERO */}
      <section className="relative h-[65vh] md:h-[80vh] flex items-center justify-center text-white text-center">
        <img
        src="https://images.unsplash.com/photo-1438032005730-c779502df39b?w=1600"
        className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/70"/>
        <div className="relative z-10 px-6 max-w-3xl">
          <h1 className="text-3xl md:text-6xl font-bold mb-6">
          Eglise Power of the Word
          </h1>

          <p className="text-lg md:text-xl text-gray-200">
          Un lieu de transformation, de guérison et de restauration par la puissance de Dieu.
          </p>
        </div>
      </section>

      {/* ABOUT INFO */}
      <section className="py-16 md:py-24 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">

          <img
          src="https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=900"
          className="rounded-2xl shadow-xl w-full h-[320px] md:h-[450px] object-cover"
          />

          <div>
            <h2 className="text-2xl md:text-4xl font-bold mb-6"> Qui sommes‑nous ? </h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
            Power of the Word Church est une église engagée à répandre l'évangile de Jésus‑Christ,
            restaurer les vies et accompagner chaque personne dans sa destinée spirituelle.
            </p>

            <p className="text-gray-600 leading-relaxed">
            Nous croyons dans la puissance de la parole de Dieu, la prière, l'amour fraternel
            et l'action du Saint‑Esprit pour transformer les vies.
            </p>

            <div className="mt-8 flex flex-col md:flex-row gap-4">
              {/* <button className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition">
              Voir nos programmes
              </button> */}

              <Link to={"/donate"} className="border border-blue-600 text-blue-600 px-6 py-3 rounded-xl hover:bg-blue-600 hover:text-white transition">
              Faire un don
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* PROGRAMS */}
      <section className="py-16 md:py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-4xl font-bold text-center mb-4"> Nos programmes </h2>
          <p className="text-gray-500 text-center mb-14 max-w-2xl mx-auto">
          Découvrez les différents moments de communion, de prière et d'enseignement organisés chaque semaine.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {programs.map((prog,index)=>(
              <div
              key={index}
              className=" p-8 rounded-2xl shadow hover:shadow-2xl hover:-translate-y-3 transition duration-300 border border-gray-100 dark:border-gray-800"
              >

                <div className="flex items-center justify-between mb-6">

                  <div className="w-14 h-14 bg-blue-200 text-blue-600 rounded-xl flex items-center justify-center">
                  {prog.icon}
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500 flex items-center gap-1 justify-end">
                      <CalendarDays className="text-blue-400" /> {prog.day}</p>
                    <p className="text-sm text-gray-500 flex items-center gap-1 justify-end">
                      <Clock className="text-blue-400" /> {prog.time}</p>
                  </div>
                </div>

                <h3 className="text-xl font-bold mb-4 border-b pb-3"> {prog.title} </h3>
                <p className="text-sm font-semibold text-gray-500 mb-3"> Activités réalisées :</p>
                <ul className="text-gray-600 space-y-3 text-sm">
                  {prog.actions.map((act,i)=>(
                    <li key={i} className="flex items-center gap-3 bg-gray-200 dark:bg-gray-700 dark:text-gray-300 p-2 rounded-lg">
                    <span className="w-3 h-3 bg-blue-600 rounded-full"/>
                    {act}
                    </li>
                  ))}
                </ul>

                <button className="mt-6 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
                Participer
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>


      <section className="py-16 md:py-24 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-2xl md:text-4xl font-bold mb-6"> Contactez-nous </h2>

          <p className="text-gray-500 mb-12">
          Nous sommes disponibles pour prière, information ou accompagnement spirituel.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 shadow hover:shadow-2xl hover:-translate-y-3 transition duration-300 border border-gray-100 dark:border-gray-800 rounded-2xl hover:shadow-lg transition">
              <h3 className="font-bold mb-3 flex items-center justify-center gap-2"> <MapPin className="text-blue-700" /> Adresse</h3>
              <p className="text-gray-600"> Bujumbura, Burundi Power of the Word Church </p>
            </div>

            <div className="p-8 shadow hover:shadow-2xl hover:-translate-y-3 transition duration-300 border border-gray-100 dark:border-gray-800 rounded-2xl hover:shadow-lg transition">
              <h3 className="font-bold mb-3 flex items-center justify-center gap-2"> <Phone className="text-blue-700" /> Téléphone</h3>
              <p className="text-gray-600"> +257 69 90 35 06 </p>
            </div>

            <div className="p-8 border shadow border-gray-100 dark:border-gray-800 rounded-2xl hover:-translate-y-3 transition duration-300 ">
              <h3 className="font-bold mb-3 flex items-center justify-center gap-2"> <Mail className="text-blue-700" /> Email</h3>
              <p className="text-gray-600"> theword.bd350@gmail.com </p>
            </div>
          </div>

          <div className="mt-12">
            <button className="bg-blue-700 text-white px-10 py-3 rounded-xl hover:bg-blue-700 transition shadow-lg">
            Nous écrire
            </button>
          </div>
        </div>
      </section>

      {/* MODERN STRIP */ }
      <section className="bg-gray-300 dark:bg-gray-800 dark:text-gray-300 text-gray-700 py-16 text-center px-6">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
        Une famille spirituelle pour grandir ensemble
        </h2>

        <p className="max-w-2xl mx-auto  mb-8">
        Rejoignez une communauté dynamique où la foi, l'amour et la parole de Dieu sont au centre.
        </p>

        <button className="bg-white text-blue-600 px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition">
        Nous rejoindre
        </button>

      </section>

      {/* VALUES MODERN */}
      <section className="py-16 md:py-24 px-6">

        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-2xl md:text-4xl font-bold mb-12"> Nos valeurs </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 shadow hover:shadow-2xl hover:-translate-y-3 transition duration-300 border border-gray-100 dark:border-gray-800 rounded-2xl">
              <Heart className="mx-auto mb-4 text-blue-600" size={32}/>
              <h3 className="font-bold mb-3">Amour</h3>
              <p className="text-gray-600">Aimer Dieu et aimer les autres.</p>
            </div>

            <div className="p-8 border shadow hover:shadow-2xl hover:-translate-y-3 transition duration-300 border-gray-100 dark:border-gray-800 rounded-2xl">
              <Users className="mx-auto mb-4 text-blue-600" size={32}/>
              <h3 className="font-bold mb-3">Communauté</h3>
              <p className="text-gray-600">Grandir ensemble comme une famille.</p>
            </div>

            <div className="p-8 shadow hover:shadow-2xl hover:-translate-y-3 transition duration-300 border border-gray-100 dark:border-gray-800 rounded-2xl">
              <Church className="mx-auto mb-4 text-blue-600" size={32}/>
              <h3 className="font-bold mb-3">Parole</h3>
              <p className="text-gray-600">Fondés sur la Bible.</p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}

export default About;
