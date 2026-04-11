import { MapPin,Phone,Mail,CalendarDays,Heart,Facebook, Youtube, Instagram, ArrowUp, MessageCircle,Home,Building, CalendarClock, Mic,HandCoins} from "lucide-react";
import { Link } from "react-router-dom";
import { FaTiktok } from "react-icons/fa";

function Footer(){

    const scrollTop=()=>{
        window.scrollTo({

        top:0,
        behavior:"smooth"

        })
    }

    return(

        <footer className="bg-gradient-to-r from-gray-500 to-blue-300 dark:from-gray-800 dark:to-gray-950 relative overflow-hidden ">

            {/* GRADIENT LINE */}
            {/* <div className="h-1 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600"></div> */}

            <div className="max-w-7xl mx-auto px-6 py-10 grid md:grid-cols-4 gap-12">

                {/* ABOUT */}
                <div className="space-y-6">
                    <h2 className="text-3xl font-bold text-white">
                    Power of Word
                    </h2>

                    <p className="dark:text-gray-400 leading-relaxed">
                    Une église moderne engagée à impacter les vies à travers la foi,
                    la parole de Dieu et la prière.
                    </p>

                    <Link to={"/donate"} className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 px-6 py-3 rounded-xl text-white font-medium hover:scale-105 transition">
                        <Heart size={18}/> Support Ministry
                    </Link>

                </div>

                {/* LINKS */}

                <div>
                    <h3 className="text-white font-semibold mb-6"> Quick Links </h3>
                    <nav className="space-y-2 flex flex-col">
                        <Link to={"/"} className="hover:text-white cursor-pointer transition flex items-center gap-2">
                            <Home size={20} className="dark:text-blue-500 text-blue-700"/> 
                            <span className="dark:text-gray-400 hover:text-white">Accueil</span>
                        </Link>
                        <Link to={"/about"} className="hover:text-white cursor-pointer transition flex items-center gap-2"> 
                            <Building size={20} className="dark:text-blue-500 text-blue-700"/>
                             <span className="dark:text-gray-400 hover:text-white">À propos</span>
                        </Link>
                        <Link to={"/programs"} className="hover:text-white cursor-pointer transition flex items-center gap-2"> 
                            <CalendarClock size={20} className="dark:text-blue-500 text-blue-700"/> 
                            <span className="dark:text-gray-400 hover:text-white">Programmes</span>
                        </Link>
                        <Link to={"/events"} className="hover:text-white cursor-pointer transition flex items-center gap-2"> 
                            <CalendarDays size={20} className="dark:text-blue-500 text-blue-700"/> 
                            <span className="dark:text-gray-400 hover:text-white">Événements</span>
                        </Link>
                        <Link to={"/audio"} className="hover:text-white cursor-pointer transition flex items-center gap-2"> 
                           <Mic size={20} className="dark:text-blue-500 text-blue-700"/> 
                           <span className="dark:text-gray-400 hover:text-white">Audio</span>
                        </Link>
                        <Link to={"/donate"} className="hover:text-white cursor-pointer transition flex items-center gap-2"> 
                           <HandCoins size={20} className="dark:text-blue-500 text-blue-700"/> 
                           <span className="dark:text-gray-400 hover:text-white">Faire un don</span>
                        </Link>
                    </nav>
                </div>

                {/* CONTACT */}
                <div>
                    <h3 className="text-white font-semibold mb-6"> Contact </h3>
                    <div className="space-y-4">
                        <div className="flex gap-3">
                            <MapPin className="dark:text-blue-500 text-blue-700"/>
                            <p className="dark:text-gray-400">Bujumbura Burundi</p>
                        </div>

                        <div className="flex gap-3">
                            <Phone className="dark:text-blue-500 text-blue-700"/>
                            <p className="dark:text-gray-400">+257 69 90 35 06</p>
                        </div>

                        <div className="flex gap-3">
                            <Mail className="dark:text-blue-500 text-blue-700"/>
                            <p className="dark:text-gray-400">theword.bd350@gmail.com</p>
                        </div>
                    </div>
                </div>

                {/* MAP */}
                <div>
                    <h3 className="text-white font-semibold mb-6"> Location </h3>
                    <div className="rounded-xl overflow-hidden border border-gray-800">
                        <iframe
                        title="map"
                        src="https://www.google.com/maps?q=Bujumbura&output=embed"
                        className="w-full h-40 border-0"
                        loading="lazy"
                        />
                    </div>
                </div>
            </div>

            {/* BOTTOM */}

            <div className="border-t border-gray-800">
                <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="dark:text-gray-500 text-sm">
                    © {new Date().getFullYear()} Power of Word
                    </p>

                    {/* SOCIAL */}
                    <div className="flex gap-5">
                        <Link to="https://www.facebook.com/profile.php?id=100084121850117" className="bg-gray-700 p-3 rounded-xl text-white hover:bg-blue-600 transition cursor-pointer">
                            <Facebook size={18}/>
                        </Link>

                        <Link to="https://www.youtube.com/@poweroftheword2505?si=v-pTq94-ne5TWNVl" className="bg-gray-700 text-white p-3 rounded-xl hover:bg-red-600 transition cursor-pointer">
                            <Youtube size={18}/>
                        </Link>

                        <Link to="https://www.instagram.com/nitezuwera_justin/" className="bg-gray-700 text-white p-3 rounded-xl hover:bg-pink-600 transition cursor-pointer">
                            <Instagram size={18}/>
                        </Link>
                        <Link to="https://www.tiktok.com/@nitezuwerajustin" className="bg-gray-700 text-white p-3 rounded-xl hover:bg-black transition cursor-pointer">
                            <FaTiktok size={18}/>
                        </Link>
                    </div>

                    {/* TOP BUTTON */}

                    <button
                    onClick={scrollTop}
                    className="bg-blue-600 p-3 rounded-xl hover:bg-blue-700 transition md:mr-2"
                    >
                        <ArrowUp size={18}/>
                    </button>
                </div>
            </div>

            {/* FLOATING WHATSAPP */}

            <a
            href="https://wa.me/25769903506"
            className="fixed bottom-6 right-4 bg-green-500 p-4 rounded-full shadow-lg hover:scale-80 transition z-50"
            >
                <MessageCircle className="text-white"/>
            </a>

        </footer>

    )
}

export default Footer;