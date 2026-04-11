
import React, {useState} from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

function Donate(){

    const [activeMobile,setActiveMobile] = useState(null)

    const mobiles = [
        {
        name:"Lumicash",
        number:"+257 XXX XXX",
        owner:"Power Church"
        },

        {
        name:"Ecocash",
        number:"+257 XXX XXX",
        owner:"Power Church"
        },

        {
        name:"Pesaflash",
        number:"+257 XXX XXX",
        owner:"Power Church"
        }
    ]

    const banks = [
        {
        name:"Bancobu",
        account:"XXXXXXX",
        owner:"Power Church"
        },

        {
        name:"Equity Bank",
        account:"XXXXXXX",
        owner:"Power Church"
        },

        {
        name:"Inoti Bank",
        account:"XXXXXXX",
        owner:"Power Church"
        }
    ]
   
     const copyNumber = (number) => {
        // api de copier
        navigator.clipboard.writeText(number)
        .then(()=>{
            alert("Numéro copié")
        })
        .catch(()=>{
            alert("Erreur de copié")
        })
        
     }
    

    return(
        <div className="w-full mt-16 font-sans bg-gray-100 dark:bg-gray-900 dark:text-white">

            <Header />

            {/* HERO */}
            <section className="relative h-[70vh] md:h-[85vh] flex items-center justify-center text-center text-white">
                <img
                src="https://images.unsplash.com/photo-1507692049790-de58290a4334"
                className="absolute w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-black/70"/>
                <div className="relative z-10 px-6 max-w-3xl">
                    <h1 className="text-3xl md:text-6xl font-bold mb-6">
                       Soutenir l'œuvre de Dieu
                    </h1>
                    <p className="text-lg md:text-xl">
                       Vos dons permettent d'aider la communauté.
                    </p>
                </div>
            </section>

            {/* BANKS */}

            <section className="py-16 px-6">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold text-center mb-10"> Banques </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    {
                    banks.map((bank,i)=>(
                        <div key={i} className="border border-gray-200 text-gray-700 dark:border-gray-800 p-8 rounded-2xl shadow" >
                            <h3 className="text-xl text-gray-900 dark:text-white opacity-70 font-bold mb-4"> {bank.name} </h3>
                            <p className="text-gray-600  dark:text-white dark:opacity-60"> Titulaire : </p>
                            <p className="font-bold text-blue-400 mb-3"> {bank.owner} </p>
                            <p className="text-gray-600 dark:text-white dark:opacity-60"> Numéro de compte : </p>
                            <p className="font-bold text-blue-300"> {bank.account} </p>
                        </div>
                    ))
                    }
                    </div>
                </div>
            </section>
        

            {/* MOBILE MONEY */}
            <section className="py-16 px-6">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold text-center mb-10"> Mobile Money </h2>

                    <div className="space-y-4">
                        {
                        mobiles.map((mobile,i)=>(
                            <div key={i} onClick={()=>setActiveMobile({...mobile,index:i})}
                              className="border border-gray-200 dark:border-gray-800 p-6 rounded-xl shadow cursor-pointer hover:shadow-xl transition w-full"
                            >
                                <h3 className="font-bold text-lg "> {mobile.name} </h3>
                            </div>
                            ))
                        }
                    </div>

                    {
                    activeMobile && (

                        <div className={`mt-8 p-8 rounded-2xl shadow text-center ${
                                activeMobile.index % 2 === 0 
                                ? "bg-green-900 text-blue-600" 
                                : "bg-pink-200 dark:bg-pink-600 text-yellow-400"
                                }`}>
                            <h3 className="text-xl font-bold mb-4"> {activeMobile.name} </h3>
                            <p className="text-gray-600 dark:text-gray-200"> Nom : {activeMobile.owner} </p>
                            <p className="font-bold text-blue-600 text-xl my-3"> {activeMobile.number} </p>
                            <button onClick={() => copyNumber(activeMobile.number)} className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
                                 Copier numéro
                            </button>
                        </div>
                       )
                    }
                </div>
            </section>

            {/* SCRIPTURE */}
            <section className="py-16 text-center px-6">
                <h2 className="text-2xl md:text-3xl font-bold mb-6"> Actes 20:35 </h2>
                <p className="text-gray-600"> Il y a plus de bonheur à donner qu'à recevoir. </p>
            </section>

            <Footer />
        </div>
    )
}

export default Donate;