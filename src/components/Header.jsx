import { useState , useNavigate, useEffect } from "react";
import { Link } from "react-router-dom";
import ThemeToggle from "./Toggle";

function Header(){

    const [menuOpen , setMenuOpen] = useState(false)
    // const navigate = useNavigate()

    const closeMenu = ()=>{
    setMenuOpen(false)
    }

     //Bloquer scroll page
    useEffect(() =>{
        if(menuOpen){
            document.body.style.overflow="hidden"
        } else {
            document.body.style.overflow = "auto"
        }
    } , [menuOpen])

    return(

        <header className="w-full bg-gray-100 dark:bg-gray-900 dark:text-white shadow-md fixed top-0 z-50">
            <div className="max-w-7xl mx-auto flex justify-between items-center p-4">

                {/* Logo */}
                <div className="text-2xl font-bold  flex items-center justify-center gap-2">
                    <img src="logo.png" alt="imge" className="w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center" />

                    <h3 className="hidden md:block">Power of the Word</h3>
                </div>

                {/* Desktop menu */}
                <nav className="hidden md:flex gap-8 text-gray-500 font-medium">
                    <Link to="/" className="hover:text-blue-600">Accueil</Link>
                    <Link to="/about" className="hover:text-blue-600">Appropos</Link>
                    <Link to="/programme" className="hover:text-blue-600">Programmes</Link>
                    <Link to="/events" className="hover:text-blue-600">Événements</Link>
                    <Link to="/audio" className="hover:text-blue-600">Audio</Link>
                </nav>

                {/* Desktop button */}
                <div className="hidden md:block">
                    <Link to="/donate" className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-400">
                        Faire un don
                    </Link>
                </div>
                <div className="flex justify-center gap-2">
                    <ThemeToggle />

                    {/* Mobile button */}
                    <button
                    onClick={()=>setMenuOpen(!menuOpen)}
                    className="md:hidden text-3xl text-right focus:outline-none"
                    >
                    {menuOpen ? "✕" : "☰"}
                    </button>
                </div>
  

            </div>

            {/* Overlay */}
            {menuOpen && (
                <div onClick={closeMenu} className="fixed inset-0 bg-black/50 md:hidden" ></div>

                )
            }

            {/* Mobile menu */}

            <div className={`
               fixed top-0 right-0 h-full w-72 bg-white dark:bg-gray-900 dark:text-white shadow-lg transform transition-transform duration-300 md:hidden ${menuOpen ? "translate-x-0" : "translate-x-full"} `}>

                <div className="p-6 flex flex-col gap-6">
                    <Link to="/" onClick={closeMenu}> Accueil </Link>
                    <Link to="/about" onClick={closeMenu}>Appropos</Link>
                    <Link to="/programme" onClick={closeMenu}> Programmes </Link>
                    <Link to="/events" onClick={closeMenu}> Événements </Link>
                    <Link to="/donate" onClick={closeMenu} className="bg-blue-600 text-white p-3 rounded-lg"> Faire un don </Link>

                </div>
                <span onClick={closeMenu} className="absolute top-4 right-4 text-2xl cursor-pointer">✕</span>

            </div>
        </header>
    )
}

export default Header;