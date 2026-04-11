import React, {useState,useEffect} from "react";

function VideoAdmin(){

    const [open,setOpen] = useState(false)
    const [editIndex,setEditIndex] = useState(null)
    const [videos,setVideos] = useState([]) // État pour stocker les données
    const [video,setVideo] = useState({ title:"", url:"", type:"", language:"" })
    const [loading, setLoading] = useState(true) // État pour l'écran de chargement
    const [error, setError] = useState(null) // État pour gérer les erreurs

    /* LOAD localStorage */
    // useEffect(()=>{
    //     const data = localStorage.getItem("videos")
    //     if(data){
    //         setVideos(JSON.parse(data))
    //     }

    // },[])

    // /* SAVE localStorage */
    // useEffect(()=>{
    //     localStorage.setItem("videos",JSON.stringify(videos))

    // },[videos])

    useEffect(()=>{
        const fetchVideos = async() => {
            try{
                const reponse = await fetch("https://poweroftheword.bi/api/video/");
                if(!reponse.ok){
                    throw new Error("Erreur lors de la récupération des données");
                }
                const data = await reponse.json(); // On transforme la réponse en objet JS
                setVideos(data); // On met à jour l'état avec les données du serveur

            } catch(err){
                setError(err.message);
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
    // const handleSubmit= async(e)=>{

    //     e.preventDefault()

    //     if(editIndex!==null){
    //         const updated = [...videos] // copy array
    //         updated[editIndex] = video  // replace item
    //         setVideos(updated) // update state
    //         setEditIndex(null) // exit edit mode

    //     }else{

    //     setVideos([...videos,video]) // add new video

    //     }

    //     try{
    //     const reponse = await fetch ("https://poweroftheword.bi/api/video/",{
    //         method :"POST",
    //         headers: {"Content-Type" : "application/json"},
    //         body : JSON.stringify(video)

    //     });
    //     if(reponse.ok){
    //         console.log("Vidéo enregistrée avec succès sur le serveur");
    //     } else {
    //         console.error("Erreur serveur lors de l'enregistrement");
    //     }
    //     } catch(error) {
    //         console.error("Impossible de contacter le serveur :", error);
    //     }
         
    //     // reunitialisation de form
    //     setVideo({ title:"", url:"", type:"", language:"" }) // reset form
    //     setEditIndex(null)
    //     setOpen(false)  // close modal
    // }

    /* ADD or EDIT */
    const handleSubmit = async (e) => {
        e.preventDefault();

        // 1. Déterminer l'URL et la méthode (POST pour créer, PUT pour modifier)
        // Si ton API utilise une URL différente pour l'édition, ajuste ici.
        const url = editIndex !== null 
            ? `https://poweroftheword.bi/api/video/${videos[editIndex].id}` // Exemple si tu as un ID
            : "https://poweroftheword.bi/api/video/";
        
        const method = editIndex !== null ? "PUT" : "POST";

        try {
            const reponse = await fetch(url, {
                method: method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(video)
            });
            
            if(reponse.ok){
                    console.log("Vidéo enregistrée avec succès sur le serveur");
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
    const deleteVideo=(index)=>{
        if(window.confirm("Supprimer cette vidéo ?")){
            const updated = videos.filter((v,i)=>i!==index)
            setVideos(updated)
        }
    }

    /* EDIT */
    const editVideo=(index)=>{

        setVideo(videos[index])
        setEditIndex(index)
        setOpen(true)

    }

    /* YOUTUBE EMBED */
    const getEmbedUrl=(url)=>{
    
        if(url.includes("watch?v=")){
            return url.replace("watch?v=","embed/")

        }
        if(url.includes("youtu.be/")){
            return url.replace("youtu.be/","youtube.com/embed/")

        }

        if (!url) return ""

        return url
        
    }


    return(
        <div className="">

            {/* HEADER */}
            <div className=" fixed top-24 md:w-[1064px] w-[90%] flex justify-between items-center mb-6 bg-white p-6 rounded-xl shadow ">
                <h3 className="font-bold text-lg"> Videos de Temoignage </h3>
                <button onClick={()=>setOpen(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Add Video
                </button>

            </div>


            {/* VIDEO LIST */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 p-6 mt-28  overflow-y-auto rounded-xl shadow">

                {
                videos.map((v,index)=>(

                    <div key={index} className="border border-gray-100 rounded-xl shadow-lg bg-white" >

                        <iframe className="w-full h-[180px] rounded-t-xl"
                            src={getEmbedUrl(v.url)}
                            title={v.title}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer"
                        ></iframe>

                       <div className="px-4 pb-4">
                            <h4 className="font-semibold mt-3"> {v.title} </h4>
                            <p className="text-sm text-gray-500"> {v.type} • {v.language} </p>

                            <div className="flex gap-3 mt-3">

                                <button onClick={()=>editVideo(index)}
                                    className="bg-blue-300 text-white px-3 py-1 rounded text-sm"
                                >
                                    Edit
                                </button>

                                <button onClick={()=>deleteVideo(index)}
                                    className="bg-red-400 text-white px-3 py-1 rounded text-sm"
                                >
                                    Delete
                                </button>

                            </div>
                        </div>
                    </div>
                ))
                }
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