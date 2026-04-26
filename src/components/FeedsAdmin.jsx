import { useState, useEffect } from "react";

function FeedsAdmin() {
  const [feeds, setFeeds] = useState([]);
  // 1. Nouvel état pour la recherche
  const [searchTerm, setSearchTerm] = useState(""); 
  
  const [feed, setFeed] = useState({
    title: "",
    photo: "",
    language: "",
    type: "",
    desc: ""
  });
  const [open, setOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  // Chargement / Sauvegarde
  // useEffect(() => {
  //   const data = localStorage.getItem("feeds");
  //   if (data) setFeeds(JSON.parse(data));
  // }, []);

  // useEffect(() => {
  //   try {
  //     localStorage.setItem("feeds", JSON.stringify(feeds));
  //   } catch (e) {
  //     alert("Quota dépassé ! Essayez une photo plus légère.");
  //   }
  // }, [feeds]);

  useEffect(()=>{
    try {
      const fetchFeed = async () => {
        const reponse = await fetch("https://poweroftheword.bi/api/feeds/");
        if(!reponse.ok){
          console.error("Erreurs lors de la recuperation des donnees")
        } 
        const data = await reponse.JSON()// On transforme la réponse en objet JS

        if(Array.isArray(data)){
          setFeeds(data)
        } else if(data.results && Array.isArray(data.results)){
          setFeeds(data.results)
        } else {
          console.error("Format de recus n'a pas gere", data)
          setFeeds([])
        }

      };
    } catch(error){
                console.error("Erreur de la recuperation des donees", error);
                setFeeds([]);
            }
    
  })

  // 2. Logique de filtrage (basée sur la langue)
  const filteredFeeds = feeds.filter((f) =>
    f.language.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "photo" && files[0]) {
      const reader = new FileReader();
      reader.onloadend = () => setFeed({ ...feed, photo: reader.result });
      reader.readAsDataURL(files[0]);
    } else {
      setFeed({ ...feed, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if (editIndex !== null) {
    //   const updated = [...feeds];
    //   updated[editIndex] = feed;
    //   setFeeds(updated);
    // } else {
    //   setFeeds([...feeds, feed]);
    // }
    // resetForm();

    const token = localStorage.getItem("token")

    const url = editIndex != null? 
                `https:https://poweroftheword.bi/api/feeds/${editIndex[index]}`
                :"https://poweroftheword.bi/api/feeds/";
   

    const method = editIndex != null ? "PUT" : "POST";
    try{
      const reponse = await fetch(url, {
        method : method,
        headers:{
          "Content-Type":"application/json",
          "Authorization":`Bearer ${token}`
        },
        body:JSON.stringify(feed)
      });

      if(reponse.ok){
        console.log("Le feed est enregistre avec succes")
      } else{
         const errorDetails = await reponse.json()
         console.log("Le details d'erreurs est :", errorDetails )
         alert("Erreur : ", errorDetails)
      }
    } catch(error){
        console.error("Impossible de contacter avec le serveur", error);
        alert("Probleme de connexion (Cors ou reseaux)");
    }

     setFeed({ title: "", photo: "", language: "", type: "", desc: ""})
     };

          

  const resetForm = () => {
    setFeed({ title: "", photo: "", language: "", type: "", desc: "" });
    setEditIndex(null);
    setOpen(false);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* HEADER AVEC BARRE DE RECHERCHE */}
      <div className="flex flex-col md:flex-row justify-between items-center bg-white p-6 rounded-xl shadow-sm mb-8 gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Feeds CMS</h1>
        
        {/* INPUT DE RECHERCHE STYLISÉ */}
        <div className="relative w-full max-w-md">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input 
            type="search" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Rechercher par langue (ex: French)..." 
            className="block w-full p-3 pl-10 text-sm text-gray-900 border border-gray-200 rounded-xl bg-gray-50 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
          />
        </div>

        <button 
          onClick={() => setOpen(true)}
          className="w-full md:w-auto bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-lg transition-colors font-bold shadow-md shadow-green-100"
        >
          + Nouveau Feed
        </button>
      </div>

      {/* GRID D'AFFICHAGE - On utilise filteredFeeds ici */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFeeds.length > 0 ? (
          filteredFeeds.map((f, index) => (
            <div key={index} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100">
              {/* APERÇU PHOTO */}
              <div className="h-48 bg-gray-200 overflow-hidden">
                {f.photo ? (
                  <img src={f.photo} alt={f.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400 text-xs">Aucune image</div>
                )}
              </div>

              <div className="p-5">
                <div className="flex gap-2 mb-3">
                  <span className="text-[10px] bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full font-bold uppercase">{f.type}</span>
                  <span className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full font-bold uppercase">{f.language}</span>
                </div>
                
                <h2 className="text-lg font-bold text-gray-800 mb-2 truncate">{f.title}</h2>
                <p className="text-gray-500 text-sm line-clamp-3 mb-4">{f.desc}</p>

                <div className="flex gap-2 pt-4 border-t">
                  <button onClick={() => { setFeed(f); setEditIndex(feeds.indexOf(f)); setOpen(true); }} className="flex-1 text-sm bg-gray-50 hover:bg-blue-50 text-blue-600 font-semibold py-2 rounded-lg transition-colors">Modifier</button>
                  <button onClick={() => setFeeds(feeds.filter((item) => item !== f))} className="text-sm bg-gray-50 hover:bg-red-50 text-red-400 p-2 rounded-lg transition-colors">Supprimer</button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-20 text-gray-400">
            Aucun résultat trouvé pour "{searchTerm}"
          </div>
        )}
      </div>

      {/* MODAL (Inchangé mais conservé pour le fonctionnement) */}
      {open && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="bg-white w-full max-w-lg p-8 rounded-2xl shadow-2xl overflow-y-auto max-h-[90vh]">
            <h2 className="text-xl font-bold mb-6 text-gray-800">{editIndex !== null ? "Modifier" : "Créer"} un Feed</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="text" name="title" value={feed.title} onChange={handleChange} placeholder="Titre de l'actu" required className="w-full px-4 py-3 bg-gray-50 border rounded-xl focus:ring-2 focus:ring-green-500 outline-none" />
              <div className="grid grid-cols-2 gap-4">
                <select name="type" value={feed.type} onChange={handleChange} required className="px-4 py-3 bg-gray-50 border rounded-xl outline-none">
                  <option value="">Type</option>
                  <option value="testimony">Testimony</option>
                  <option value="preach">Preach</option>
                  <option value="live">Live</option>
                </select>
                <select name="language" value={feed.language} onChange={handleChange} required className="px-4 py-3 bg-gray-50 border rounded-xl outline-none">
                  <option value="">Langue</option>
                  <option value="FR">Français</option>
                  <option value="EN">Anglais</option>
                  <option value="SW">Kiswahili</option>
                  <option value="KI">Kirundi</option>
                </select>
              </div>
              <input type="file" name="photo" accept="image/*" onChange={handleChange} className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-green-50 file:text-green-700 hover:file:bg-green-100" />
              <textarea name="desc" value={feed.desc} onChange={handleChange} placeholder="Description détaillée..." rows="4" required className="w-full px-4 py-3 bg-gray-50 border rounded-xl focus:ring-2 focus:ring-green-500 outline-none"></textarea>
              <div className="flex gap-3 mt-6">
                <button type="button" onClick={resetForm} className="flex-1 py-3 text-gray-500 font-medium hover:bg-gray-100 rounded-xl transition-colors">Annuler</button>
                <button type="submit" className="flex-1 py-3 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 shadow-lg shadow-green-100 transition-all">Publier</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default FeedsAdmin;