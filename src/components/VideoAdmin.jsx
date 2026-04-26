import React, {useState,useEffect} from "react";

function VideoAdmin(){

    const [open,setOpen] = useState(false)
    const [editIndex,setEditIndex] = useState(null)
    const [videos,setVideos] = useState([]) // État pour stocker les données
    const [video,setVideo] = useState({ title:"", url:"", type:"", language:"" })
    const [loading, setLoading] = useState(true) // État pour l'écran de chargement
    const [error, setError] = useState(null) // État pour gérer les erreurs
    const [activeIdVideo , setActiveIdVideo] = useState(null)
    const [allow, setAllow] = useState(null)
    const [searchTerm, setSearchTerm] = useState("")
    const [searchType, setSearchType] = useState("")
  
    
    useEffect(()=>{
        const fetchVideos = async() => {
            try{
                const reponse = await fetch("https://poweroftheword.bi/api/video/");
                if(!reponse.ok){
                    throw new Error("Erreur lors de la récupération des données");
                }
                const data = await reponse.json(); // On transforme la réponse en objet JS
                // console.log("Données reçues du backend :", data);
                if(Array.isArray(data)) {
                    setVideos(data); // On met à jour l'état avec les données du serveur
                   
                } else if(data.results && Array.isArray(data.results)){
                    setVideos(data.results);
                     
                }else {
                    // console.error("Le format reçu n'est pas géré :", data);
                    setVideos([]); // On remet à vide pour éviter le crash
                }
                
            } catch(err){
                setError("Erreur de récupération :",err.message);
                setVideos([]); // On remet à vide pour éviter le crash
            } finally{
                setLoading(false); // On arrête l'affichage du chargement
            }
        }
        fetchVideos();
      
    },[video])

    // if (loading) return <p>Chargement en cours...</p>;
    // if (error) return <p>Erreur : {error}</p>;

    const handleChange=(e)=>{

        setVideo({ ...video, [e.target.name]:e.target.value })

    }

    //Bloquer scroll page
    useEffect(()=>{
        if(open){
            document.body.style.overflow="hidden"

        }else{
            document.body.style.overflow="auto"

        }

    },[open])


    /* ADD or EDIT */
    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token"); // Recuperer le token

        // 1. Déterminer l'URL et la méthode (POST pour créer, PUT pour modifier)
        // Si ton API utilise une URL différente pour l'édition, ajuste ici.
        const url = editIndex !== null 
            ? `https://poweroftheword.bi/api/video/${videos[editIndex].id}/` // Exemple si tu as un ID
            : "https://poweroftheword.bi/api/video/";
        
        const method = editIndex !== null ? "PUT" : "POST";

        try {
            const reponse = await fetch(url, {
                method: method,
                headers: { 
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                 },
                body: JSON.stringify(video) //Transforme ton objet JavaScript en texte JSON pour que le serveur Django puisse le comprendre
            });
            
            if(reponse.ok){
                const updatedVideos = await reponse.json();
                console.log("++++++++++++++++++",updatedVideos.id)
                    if(editIndex !== null){
                        setVideos(videos.map(v => v.id === updatedVideos.id ? updatedVideos : v));
                        console.log("Vidéo modifiée avec succès !");
                    } else {
                        console.log("Vidéo enregistrée avec succès sur le serveur");
                    }
                    
             } else {
                console.error("Erreur serveur lors de l'enregistrement");
            }        
               
        } catch (error) {
            console.error("Impossible de contacter le serveur :", error);
            alert("Problème de connexion (CORS ou réseau).");
        }

        setVideo({ title: "", url: "", type: "", language: "" });
        setEditIndex(null);
        setOpen(false);
                
    };

    /* DELETE */
    const deleteVideo= async(id)=>{

        const token = localStorage.getItem("token");
       
         // On vérifie si on a bien récupéré le token depuis le localStorage
        if(!token){
             alert("Accès refusé : Connectez-vous d'abord !")
             return;
        }

        if(!window.confirm("Supprimer cette vidéo ?")) return;

            try{
                const reponse = await fetch(`https://poweroftheword.bi/api/video/${id}/`, {
                    method :"DELETE",
                    headers: {
                        "Content-Type":"application/json",

                        // Permission de supprimer. ici on met le token pour vous donner la permission de supprimer le video
                        "Authorization": `Bearer ${token}`
                    }
                });

                if(reponse.ok){
                    const updatedVideos = videos.filter(v => v.id !== id)
                    setVideos(updatedVideos)
                    console.log("Vidéo supprimée avec succès du serveur");
        
                } else {
                    alert("Erreur : Le serveur n'a pas pu supprimer la vidéo.");
                }

            } catch (error) {
                console.error("Erreur réseau :", error);
                alert("Impossible de contacter le serveur.");
            }    
    }
            

    /* EDIT */
    const editVideo=(id)=>{

        setVideo(videos[id])
        setEditIndex(id)
        setOpen(true)

    }
    const [embedId,setEmbedId] = useState("")

    const getId = (url) => {
        if (!url) return "";

        if (url.includes("watch?v=")) {
            return url.split("watch?v=")[1].split("&")[0];
        } else if (url.includes("youtu.be/")) {
            return url.split("youtu.be/")[1].split("?")[0];
        } else if (url.includes("embed/")) {
            return url.split("embed/")[1];
        }

        return "";
    };


        const getEmbedUrl = (url, autoplay = false) => {
        const id = getId(url);

        return `https://www.youtube-nocookie.com/embed/${id}?autoplay=${autoplay ? 1 : 0}&mute=${autoplay ? 0 : 1}`;
    };

     const handleTogglePlay = (id) => {
        
        // Si on clique sur la vidéo déjà active, on la ferme (null)
        // Sinon, on active la nouvelle vidéo
        setActiveIdVideo(prevId => (prevId===id?null:id));
        
    }

    const videoLang = videos.filter((item) => {
        // On vérifie si la langue correspond (ou si le champ est vide)
        const matchesLanguage = item.language.toLowerCase().includes(searchTerm.toLowerCase());
        
        // On vérifie si le type correspond (ou si le champ est vide)
        const matchesType = item.type.toLowerCase().includes(searchType.toLowerCase());

        // On retourne l'item SEULEMENT si les deux conditions sont vraies
        return matchesLanguage && matchesType;
    });


    return(
        <div className="">

            {/* HEADER */}
         {/* HEADER */}
<div className="sticky top-4 z-50 mx-auto md:w-[1064px] w-[95%] bg-white/80 backdrop-blur-md p-4 md:p-6 rounded-2xl shadow-lg border border-gray-100">
    <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
        
        {/* Titre et Bouton Add (Groupés sur mobile pour gagner de la place) */}
        <div className="flex justify-between items-center w-full md:w-auto gap-4">
            <h3 className="font-extrabold text-xl text-gray-800 whitespace-nowrap">
                Vidéos <span className="text-blue-600 text-sm md:text-lg block md:inline">Témoignage</span>
            </h3>
            <button 
                onClick={() => setOpen(true)}
                className="md:hidden bg-blue-600 text-white p-2 rounded-lg shadow-md hover:bg-blue-700 transition-transform active:scale-95"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                </svg>
            </button>
        </div>

        {/* CONTENEUR DES RECHERCHES */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-2xl">
            {/* Recherche Langue */}
            <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                    </svg>
                </div>
                <input 
                    type="search" 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Langue (ex: French)" 
                    className="block w-full p-2.5 pl-10 text-sm text-gray-900 border border-gray-200 rounded-xl bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                />
            </div>

            {/* Recherche Type */}
            <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                </div>
                <input 
                    type="search" 
                    value={searchType}
                    onChange={(e) => setSearchType(e.target.value)}
                    placeholder="Type (ex: Musique)" 
                    className="block w-full p-2.5 pl-10 text-sm text-gray-900 border border-gray-200 rounded-xl bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                />
            </div>
        </div>

        {/* Bouton Add Video (PC uniquement) */}
        <button 
            onClick={() => setOpen(true)}
            className="hidden md:flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl font-medium hover:bg-blue-700 shadow-md shadow-blue-200 transition-all active:scale-95"
        >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
            <span>Video</span>
        </button>
    </div>
</div>


            {/* VIDEO LIST */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 p-6 mt-28 overflow-y-auto rounded-xl shadow">
               {/* {loading?<p>Chargement en cours...</p>:  */}

               {videoLang.length > 0?(

                videoLang.map((v,id)=>(

                    <div key={id} className="border border-gray-100 rounded-xl shadow-lg bg-white" >

                       {v.url ? (
                         <div  onClick={() => handleTogglePlay(v.id)}  >
                                {activeIdVideo === v.id ? (
                                    /* SI ACTIVE : Le lecteur réel (Le son joue) */
                                    <iframe 
                                        className="w-full h-[180px] rounded-t-xl"
                                        src={`${getEmbedUrl(v.url, true)}?autoplay=1`}
                                        title={v.title}
                                        allow="autoplay; fullscreen"
                                        allowFullScreen
                                    />
                                ) : (
                                    /* SI NON ACTIVE : Une simple image (Zéro son possible) */
                                <div className="relative w-full h-[180px] cursor-pointer">

                                    <img
                                        src={`https://img.youtube.com/vi/${getId(v.url)}/hqdefault.jpg`}
                                        className="w-full h-full object-cover rounded-t-xl"
                                        alt={v.title}
                                    />

                                    {/* bouton play */}
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors">
                                        <div className="bg-white/90 p-3 rounded-full shadow-lg">
                                            <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.333-5.89a1.5 1.5 0 000-2.538L6.3 2.841z" />
                                            </svg>
                                        </div>
                                    </div>

                                </div>
                                )}
                            </div>
                            ) : (
                            <p>Aucune vidéo</p>
                            )
                        }
                        <div className="px-4 pb-4">
                            <h4 className="font-semibold mt-3"> {v.title} </h4>
                            <p className="text-sm text-gray-500"> {v.type} • {v.language} </p>

                            <div className="flex gap-3 mt-3">

                                <button onClick={()=>editVideo(id)}
                                    className="bg-blue-300 text-white px-3 py-1 rounded text-sm"
                                >
                                    Edit
                                </button>

                                <button onClick={()=>deleteVideo(v.id)}
                                    className="bg-red-400 text-white px-3 py-1 rounded text-sm"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))
                ):(
                    <p>Aucune vidéo wapiiii</p> 
                )}
            </div>


            {/* MODAL */}

            {
            open && (

            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">
                <div className="bg-white w-[90%] md:w-[400px] p-6 rounded-xl">
                    <h3 className="font-bold text-lg mb-4">
                        {editIndex!==null ? "Edit Video" : "Add Video"}
                    </h3>

                    <form onSubmit={handleSubmit}>

                        <input type="text" name="title"
                            onChange={handleChange} placeholder="Title"
                            value={video.title} className="w-full p-2 border rounded mb-3" required
                        />

                        <input type="text" name="url"
                            onChange={handleChange} placeholder="YouTube URL"
                            value={video.url} className="w-full p-2 border rounded mb-3" required
                        />

                        <select name="type" value={video.type}
                            onChange={handleChange} className="w-full p-2 border rounded mb-3" required
                        >

                            <option value="">Type</option>
                            <option>testimony</option>
                            <option>preach</option>
                            <option>live</option>

                        </select>


                        <select name="language" value={video.language}
                            onChange={handleChange} className="w-full p-2 border rounded mb-4"required
                        >
                            <option value="">Language</option>
                            <option>EN</option>
                            <option>FR</option>
                            <option>KI</option>
                            <option>SW</option>

                        </select>

                        <div className="flex justify-end gap-3">

                            <button type="button"
                                onClick={()=>{
                                    setVideo({ url:"", type:"", language:"" })
                                    setOpen(false)
                                    setEditIndex(null)
                                }}
                                className="bg-gray-300 px-4 py-2 rounded"
                            >
                                Cancel
                            </button>

                            <button className="bg-blue-600 text-white px-4 py-2 rounded">
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            )
            }
        </div>
    )
}

export default VideoAdmin