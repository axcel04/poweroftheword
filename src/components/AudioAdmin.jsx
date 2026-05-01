import axios from "axios";
import { useState, useEffect, useMemo } from "react";
import { DiSafari } from "react-icons/di";

function AudioAdmin() {
  /* ================= STATE ================= */
  const [audios, setAudios] = useState([]);
  const [audio, setAudio] = useState({
    
    title: "",
    file: "",
    language: "",
    visible_date: "",
    visible_time: ""
  });

  const [open, setOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  /* ================= LOAD / SAVE ================= */
  /* ================= LOAD / SAVE (Sécurisé) ================= */

// useEffect(() => {
//   const data = localStorage.getItem("audios");
//   if (data) setAudios(JSON.parse(data));
// }, []);

console.log("==================== " , audios[0]);

useEffect(() => {
  fetchAudio();
  }, []);

  const fetchAudio = async() => {
  const token = localStorage.getItem("token");

  try {
    const reponse = await axios.get("https://poweroftheword.bi/api/audio/",
      {
      headers:{
        Authorization:`Bearer ${token}`,
      }
      
    })

     console.log(reponse.data.results || reponse.data )
    setAudios( reponse.data.results || reponse.data );
    console.log("Les resultats vient au Bakend sont: ",reponse.data.results || reponse.data );
  } catch (e) {
      console.error("Erreur:", e);

    if (e.response) {
      console.log("Status:", e.response.status);
      console.log("Data:", e.response.data);
  }}
}


  /* ================= HANDLERS ================= */
 const handleChange = (e) => {
  const { name, value, files } = e.target;

  if (name === "file" && files[0]) {
    const file = files[0];
    setAudio({ ...audio,file: file, // ✅ File réel
    });
  } else {
    setAudio({ ...audio, [name]: value,});
  }
};


    // console.log("FILE:", audio.file);
    // console.log("IS FILE:", audio.file instanceof File);

  const handleSubmit = async(e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const url = editIndex !== null ? `https://poweroftheword.bi/api/audio/${audios[editIndex].id}/`:
                                      "https://poweroftheword.bi/api/audio/";

    const method = editIndex !== null ? "put" : "post";

    const formData = new FormData();
   
    formData.append("title", audio.title);
    formData.append("language", audio.language);
    formData.append("visible_date", audio.visible_date);
    formData.append("visible_time", audio.visible_time);

    if(audio.file instanceof File){
      formData.append("file", audio.file)
    }

    try{
      const reponse = await axios[method](url,formData,{
        headers:{
          Authorization:`Bearer ${token}`,
        }
      }) 
      if(reponse){

        console.log("+++++++++++++++++++++++++",reponse.data)

        if(editIndex !== null){
          setAudios(audios.map(a => a.id === reponse.data.id ? reponse.data : a ))
        } else {
          console.log("Audio est enregistre avec succes");
          alert("Audio est enregistre avec succes");

        } 
      }
    } catch(error){
      console.error("Erreur lors de la connection du serveur: ", error);

      if(error.response){
        console.log("Status: ", error.response.status);
        console.log("Data : ", error.response.data);

        alert(JSON.stringify(error.response.data));
      } else{
        console.log("Erreur : ", error.message);
      }
    } 
  };

  const resetForm = () => {
    setAudio({ id: null, title: "", file: "", language: "", visible_date: "", visible_time: "" });
    setEditIndex(null);
    setOpen(false);
  };

  const handleEdit = (index) => {
    const item = audios[index];
    console.log(item.time);
    setAudio({...item,
      date: item.visible_date ? item.visible_date.split("T")[0]: "",
      time: item.visible_time ? item.visible_time.slice(0, 5) : ""
  });
    setEditIndex(index);
    setOpen(true);
  };

  const handleDelete = async(index) => {
    const token = localStorage.getItem("token");
    if (!window.confirm("Supprimer cet enregistrement ?")) return;

    try{
      const reponse = await axios.delete(`https://poweroftheword.bi/api/audio/${audios[index].id}/`, {
        headers: {
          Authorization:`Bearer ${token}`,
        }
      })

      if(reponse){
         setAudios(audios.filter((_, i) => i !== index));
         console.log("L'audio est supprimé avec succes.");
         alert("L'audio est supprimé avec succes.")
      } else {
        console.log("Erreur de supprimer l'audio.")
        alert("Erreur de supprimer l'audio.")
      }
        
    } catch(error) {
      console.error(" Erreur de connexion de serveur:", error);
      if(error.response){
        console.log("Status :", error.response.status);
        console.log("Details :",error.response.data );
        alert("Erreur details : " + JSON.stringify(error.response.data));
      } else {
        console.log(error.message);
      }
    }
    
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* HEADER - Rendu plus responsive */}
      <header className="flex flex-col sm:flex-row justify-between items-center bg-white p-6 sticky top-0 z-40 rounded-xl shadow-sm mb-10 border border-gray-100">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-800">Audio Manager</h1>
          <p className="text-gray-500 text-sm">{audios.length} fichier(s) enregistré(s)</p>
        </div>
        <button
          onClick={() => setOpen(true)}
          className="mt-4 sm:mt-0 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-lg transition-all shadow-md active:scale-95"
        >
          + Ajouter un Audio
        </button>
      </header>

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {audios.map((a, index) => (
          <div key={a.id || index} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <span className="bg-indigo-100 text-indigo-700 text-[10px] uppercase font-bold px-2 py-1 rounded">
                {a.language || "Inconnu"}
              </span>
              <p className="text-gray-400 text-[11px] font-mono">
                {a.visible_date} • {a.visible_time}
              </p>
            </div>

            <h2 className="font-semibold text-gray-800 truncate mb-4" title={a.title}>
              {a.title || "Sans titre"}
            </h2>

            {/* Lecteur Audio Stylisé */}
            <audio controls className="w-full h-10 mb-4" key={a.file}>
              <source src={a.file} type="audio/mpeg" />
            </audio>

            {/* ACTIONS */}
            <div className="flex gap-2 border-t pt-4">
              <button
                onClick={() => handleEdit(index)}
                className="flex-1 bg-gray-100 hover:bg-indigo-50 text-gray-600 hover:text-indigo-600 font-medium py-2 rounded-lg transition-colors"
              >
                Éditer
              </button>
              <button
                onClick={() => handleDelete(index)}
                className="bg-gray-100 hover:bg-red-50 text-gray-400 hover:text-red-500 p-2 rounded-lg transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {open && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-2xl animate-in fade-in zoom-in duration-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              {editIndex !== null ? "Modifier l'audio" : "Nouvel Audio"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Titre</label>
                <input
                  type="text"
                  name="title"
                  value={audio.title}
                  onChange={handleChange}
                  placeholder="Ex: Podcast #12"
                  required
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Fichier Audio</label>
                <input
                  type="file"
                  accept="audio/*"
                  name="file"
                  onChange={handleChange}
                  
                  className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date de visible</label>
                  <input
                    type="date"
                    name="visible_date"
                    value={audio.visible_date}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Heure de visible</label>
                  <input
                    type="time"
                    name="visible_time"
                    value={audio.visible_time}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Langue</label>
                <select
                  name="language"
                  value={audio.language}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
                >
                  <option value="">Sélectionner une langue</option>
                  <option value="FR">Français</option>
                  <option value="EN">English</option>
                  <option value="KI">Kirundi</option>
                  <option value="SW">Kiswahili</option>
                </select>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={resetForm}
                  className="flex-1 px-4 py-2.5 text-gray-600 font-medium hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-indigo-600 text-white font-medium py-2.5 rounded-lg hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all"
                >
                  {editIndex !== null ? "Mettre à jour" : "Enregistrer"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AudioAdmin;