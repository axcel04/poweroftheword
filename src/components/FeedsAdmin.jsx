import { useState, useEffect } from "react";
import axios from "axios";

function FeedsAdmin() {
  const [feeds, setFeeds] = useState([]);
  // 1. Nouvel état pour la recherche
  const [searchTerm, setSearchTerm] = useState(""); 
  
  const [feed, setFeed] = useState({
    title: "", photo: "", language: "", type: "", desc: "",
    date:"",start_hour:"", end_hour:"", lacation:"", host:"", expectation:""
  });
  const [preview, setPreview] = useState("")
  const [open, setOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  useEffect(()=>{

    const fetchFeed = async () => {
      const token = localStorage.getItem("token")

      try{
        const reponse = await axios.get("https://poweroftheword.bi/api/feeds/",
           {
          
          headers:{
            Authorization:`Bearer ${token}`,
            
          }
        });
        console.log("Resultats viennent a la BD sont : ",reponse.data.results || reponse.data)
    
        setFeeds(reponse.data.results || reponse.data)
      } catch(error){
        console.error("erreur lors de recuperation : ", error )
      }
      
  }
fetchFeed();
},[feed])

 
 const handleChange = (e) => {
  const { name, value, files } = e.target;

  if (name === "photo" && files[0]) {

    const file = files[0];

    setFeed({ ...feed,photo: file});

    setPreview(URL.createObjectURL(file));

  } else {
    setFeed({ ...feed,[name]: value});
  }
};

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    const url =
      editIndex != null
        ? `https://poweroftheword.bi/api/feeds/${feeds[editIndex].id}/`
        : "https://poweroftheword.bi/api/feeds/";

    const method = editIndex != null ? "put" : "post";

    const formData = new FormData();
    formData.append("title", feed.title);
    formData.append("language", feed.language);
    formData.append("type", feed.type);
    formData.append("desc", feed.desc);
    formData.append("date", feed.date);
    formData.append("start_hour", feed.start_hour);
    formData.append("end_hour", feed.end_hour);
    formData.append("lacation", feed.lacation);
    formData.append("host", feed.host);
    formData.append("expectation", feed.expectation);

    if (feed.photo instanceof File) {
      formData.append("photo", feed.photo); // IMPORTANT
    }

    console.log("Image est : ", feed.photo)
    // console.log(feed.photo instanceof File);

    
    try {
      const response = await axios[method](url,
        formData,
        {
        headers: {
          Authorization: `Bearer ${token}`,
          // ❌ DO NOT set Content-Type here
        },
      });
      

      if (response) {

        if(editIndex !== null){
          setFeeds(feeds.map(f => f.id === response.data.id ? response.data : f));
          console.log("Feed edited successfully");
          alert("Feed edited successfully")
        }
        console.log("Feed saved successfully");
      } 
    } catch (error) {
      console.error("Server connection error", error);

      if(error.response){
        console.log("Status : ", error.response.status);
        console.log("Détails: ", error.response.data);
        alert("Erreurs: " + JSON.stringify(error.response.data))

      } else {
        console.log("Erreur :", error.message);
        alert("Erreur de server : ", error.message)
      }
      
    }

    resetForm()
  };
          

  const resetForm = () => {
    setFeed({ title: "", photo: "", language: "", type: "", desc: "",  date:"",
       start_hour:"", end_hour:"", lacation:"", host:"", expectation:"" });
      setEditIndex(null);
      setOpen(false);
  };

  const handleEdit = (index) => {
    setFeed(feeds[index]);
    // setFeed({photo:feeds[index].photo});
    setEditIndex(index);
    setOpen(true)
  }
  
  const handleDelet = async(id) => {
    const token = localStorage.getItem("token");
    if(!token){
      console.log("Vous devez d'abord de se connecter");
      alert("Vous devez d'abord de se connecter");
      return;
    }
    if(!window.confirm("Vous pouvez besoin de supprimer ce feed ?")) return;
    try{ 
      const reponse = await axios.delete(`https://poweroftheword.bi/api/feeds/${id}/`,{
        headers:{
          Authorization:`Bearer${token}`,
        }
      });

      if(reponse){
        setFeeds(feeds.filter(v => v.id !== id));
        console.log("Video est supprimé avec succes");
        alert("Video est supprimé avec succes");

      }
    } catch(error){
      console.log(error);
    }
  }
   // 2. Logique de filtrage (basée sur la langue)
  const filteredFeeds = feeds.filter((f) =>
    f.language.toLowerCase().includes(searchTerm.toLowerCase())
  );


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
                  <button onClick={() => { handleEdit(index)}} className="flex-1 text-sm bg-gray-50 hover:bg-blue-50 text-blue-600 font-semibold py-2 rounded-lg transition-colors">Modifier</button>
                  <button onClick={() => {handleDelet(f.id)}} className="text-sm bg-gray-50 hover:bg-red-50 text-red-400 p-2 rounded-lg transition-colors">Supprimer</button>
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
  <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-md flex justify-center items-center z-50 p-4 transition-all">
    <div className="bg-white w-full max-w-2xl p-0 rounded-2xl shadow-2xl overflow-hidden max-h-[95vh] flex flex-col">
      
      {/* Header Stylé */}
      <div className="bg-gradient-to-r from-green-600 to-green-500 p-6 text-white">
        <h2 className="text-2xl font-bold">{editIndex !== null ? "📝 Modifier l'actualité" : "✨ Nouvelle actualité"}</h2>
        <p className="text-green-100 text-sm">Remplissez les informations ci-dessous pour publier sur Power of the Word.</p>
      </div>

      <form onSubmit={handleSubmit} className="p-8 overflow-y-auto space-y-6">
        
        {/* Section 1 : Informations Générales */}
        <div className="space-y-4">
          <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Informations de base</label>
          <input 
            type="text" name="title" value={feed.title} onChange={handleChange} 
            placeholder="Titre accrocheur de l'actualité" required 
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:bg-white outline-none transition-all" 
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <span className="text-sm ml-1 text-gray-600">Catégorie</span>
              <select name="type" value={feed.type} onChange={handleChange} required className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-green-500">
                <option value="">Sélectionner un type</option>
                <option value="igikorane">Igikorane</option>
                <option value="itangazo">Itangazo</option>
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-sm ml-1 text-gray-600">Langue de diffusion</span>
              <select name="language" value={feed.language} onChange={handleChange} required className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-green-500">
                <option value="">Sélectionner la langue</option>
                <option value="FR">Français</option>
                <option value="EN">Anglais</option>
                <option value="SW">Kiswahili</option>
                <option value="KI">Kirundi</option>
              </select>
            </div>
          </div>
        </div>

        {/* Section 2 : Logistique (Date, Lieu, Heure) */}
        <div className="p-4 bg-slate-50 rounded-2xl space-y-4 border border-slate-100">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Logistique & Temps</label>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-600 ml-1">Date de l'événement</label>
              <input type="date" name="date" value={feed.date} onChange={handleChange} required className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 outline-none" />
            </div>
            <div>
              <label className="text-sm text-gray-600 ml-1">Lieu</label>
              <input type="text" name="lacation" value={feed.lacation} onChange={handleChange} placeholder="ex: Stade Intwari" required className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 outline-none" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-600 ml-1">Début</label>
              <input type="time" name="start_hour" value={feed.start_hour} onChange={handleChange} required className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 outline-none" />
            </div>
            <div>
              <label className="text-sm text-gray-600 ml-1">Fin</label>
              <input type="time" name="end_hour" value={feed.end_hour} onChange={handleChange} required className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 outline-none" />
            </div>
          </div>
        </div>

        {/* Section 3 : Détails supplémentaires */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-gray-600 ml-1">Invité / Responsable</label>
            <input type="text" name="host" value={feed.host} onChange={handleChange} placeholder="Nom du chef de prog." className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none" />
          </div>
          <div>
            <label className="text-sm text-gray-600 ml-1">Thème du programme</label>
            <input type="text" name="expectation" value={feed.expectation} onChange={handleChange} placeholder="Sujet abordé" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none" />
          </div>
        </div>

        {/* Upload Photo avec Preview (Optionnel visuellement) */}
        <div className="border-2 border-dashed border-gray-200 p-4 rounded-xl hover:border-green-400 transition-colors">
          <label className="block text-sm font-medium text-gray-700 mb-2">Image de couverture</label>
          <input type="file" name="photo" accept="image/*" onChange={handleChange}
             className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100 cursor-pointer" />
        </div>

        <textarea name="desc" value={feed.desc} onChange={handleChange} placeholder="Décrivez l'actualité en quelques mots..." rows="3" required className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none min-h-[100px]"></textarea>

        {/* Actions Footer */}
        <div className="flex gap-4 pt-4 border-t border-gray-100">
          <button type="button" onClick={resetForm} className="flex-1 py-3 text-gray-600 font-semibold hover:bg-gray-100 rounded-xl transition-all">
            Annuler
          </button>
          <button type="submit" className="flex-1 py-3 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 hover:scale-[1.02] active:scale-95 shadow-lg shadow-green-200 transition-all">
            {editIndex !== null ? "Mettre à jour" : "Publier maintenant"}
          </button>
        </div>
      </form>
    </div>
  </div>
)}
    </div>
  );
}

export default FeedsAdmin;