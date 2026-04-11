import Header from "../components/Header"
import Footer from "../components/Footer"

const Audios = () => {

    const audios = [

        {
        title:"La puissance de la foi",
        author:"Pasteur John",
        file:"/audios/sermon1.mp3"
        },

        {
        title:"Dieu guérit encore",
        author:"Pasteur David",
        file:"/audios/sermon2.mp3"
        }

    ]

    return(
        <div className="w-full mt-16 pb-16 font-sans bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-white">

            <Header />
             
            {/* HERO */}
            <section className="relative h-80 flex items-center justify-center">
                <img
                src="https://images.unsplash.com/photo-1438232992991-995b7058bbb3"
                className="absolute w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-black/60"></div>

                <div className="relative text-center text-white">
                    <h1 className="text-5xl font-bold mb-3"> Sermons </h1>
                    <p className="text-lg"> Ecoutez la parole de Dieu chaque semaine </p>
                </div>

            </section>

            <div className="grid md:grid-cols-2 gap-6 mt-4 mx-6">

                {
                audios.map((audio,i)=>(

                <div key={i} className=" p-6 rounded-xl shadow border border-gray-100 dark:border-gray-800 hover:shadow-2xl transition">

                <h3 className="font-bold">

                {audio.title}

                </h3>

                <p className="text-gray-500 mb-3">

                {audio.author}

                </p>

                <audio controls className="w-full">

                <source src={audio.file}/>

                </audio>

                </div>

                ))
                }

            </div>
            <Footer />
        </div>

    )
}

export default Audios