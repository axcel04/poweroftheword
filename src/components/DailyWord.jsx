import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DailyWord = () => {
    // ÉTATS
    const [dailyWords, setDailyWords] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [wordData, setWordData] = useState({ language: '', photo: null });
    const [preview, setPreview] = useState(null);
    const [editIndex, setEditIndex] = useState(null);

    const languages = ["Français", "English", "Kiswahili", "Kirundi"];

    // 1. CHARGEMENT INITIAL DES DONNÉES
    useEffect(() => {
        fetchDailyWords();
    }, []);

    const fetchDailyWords = async () => {
        const token = localStorage.getItem("token");
        try {
            const reponse = await axios.get("https://poweroftheword.bi/api/dailyword/",{
            
                headers:{
                    Authorization:`Bearer ${token}`,
                }
            });
            console.log("Resultats vient au BD sont: ", reponse.data)

            setDailyWords(reponse.data.results || reponse.data);
        } catch (error) {
            console.error("Erreur de chargement:", error);
        } finally {
            setLoading(false);
        }
    };

    // 2. GESTION DU FORMULAIRE
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setWordData({ ...wordData, photo: file });
            setPreview(URL.createObjectURL(file));
        }
    };

    console.log(wordData.photo)

    //   Enregister le formulaire
   const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token");

        const formData = new FormData();
        formData.append("language", wordData.language);

        if (wordData.photo instanceof File) {
            formData.append("photo", wordData.photo);
        }

        try {
            const response = await axios.post(
            "https://poweroftheword.bi/api/dailyword/",
            formData,
            {
                headers: {
                Authorization: `Bearer ${token}`,
                },
            }
            );

            console.log("Enregistré avec succès :", response.data);
            alert("Enregistré avec succès !");

        } catch (error) {

            console.log("Erreur complète :", error);

            if (error.response) {
            console.log("Status :", error.response.status);
            console.log("Détails :", error.response.data);

            alert("Erreur : " + JSON.stringify(error.response.data));

            } else {
            console.log("Erreur :", error.message);
            alert("Erreur serveur : " + error.message);
            }
        }
    };

    const handleDelete = async (id) =>{
          const token = localStorage.getItem("token");
        console.log(id)
         // On vérifie si on a bien récupéré le token depuis le localStorage
        if(!token){
             alert("Accès refusé : Connectez-vous d'abord !")
             return;
        }

        if(!window.confirm("Supprimer cette le mot du jour ?")) return;

        try{
            const response = await axios.delete(`https://poweroftheword.bi/api/dailyword/${id}/`,
                {
                     headers: {
                        Authorization: `Bearer ${token}`,
                        },
                })
             
            if(response){
                const updatedDailyWord = dailyWords.filter(w => w.id !== id)
                    setDailyWords(updatedDailyWord)
                    alert("Le mot du jour est supprimé avec succés") 
                    console.log("Le mot du jour est supprimé avec succés")
            }
            

        }catch(error){
             console.log("Erreur complète :", error);

            if (error.response) {
            console.log("Status :", error.response.status);
            console.log("Détails :", error.response.data);

            alert("Erreur : " + JSON.stringify(error.response.data));

            } else {
            console.log("Erreur :", error.message);
            alert("Erreur serveur : " + error.message);
            }
        }
        
    }

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8">
            
            {/* --- HEADER --- */}
            <header className="sticky top-4 z-50 max-w-6xl mx-auto flex justify-between items-center mb-10 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div>
                    <h1 className="text-2xl font-black text-gray-800">Daily Words</h1>
                    <p className="text-sm text-gray-500">Gérez vos publications quotidiennes</p>
                </div>
                <button 
                    onClick={() => setIsModalOpen(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg active:scale-95"
                >
                    + Add Word
                </button>
            </header>

            {/* --- GRILLE DE RÉSULTATS --- */}
            <main className="max-w-6xl mx-auto">
                {loading ? (
                    <div className="text-center py-20 text-gray-400">Chargement...</div>
                ) : (
               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {dailyWords.map((word,index) => (
                    <div key={index} className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
                        {/* CONTENEUR IMAGE AVEC ACTIONS AU SURVOL */}
                        <div className="h-48 overflow-hidden bg-gray-200 relative">
                            <img src={word.photo} alt={word.language} className="w-full h-full object-cover" />
                            
                            {/* BOUTONS ACTIONS (Apparaissent au survol sur PC) */}
                            <div className="absolute top-2 right-2 flex gap-2 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                                {/* <button 
                                    onClick={() => handleEdit(index)}
                                    className="p-2 bg-white/90 backdrop-blur-sm text-blue-600 rounded-lg shadow-sm hover:bg-blue-600 hover:text-white transition-colors"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                    </svg>
                                </button> */}
                                <button 
                                    onClick={() => handleDelete(word.id)}
                                    className="p-2 bg-white/90 backdrop-blur-sm text-red-600 rounded-lg shadow-sm hover:bg-red-600 hover:text-white transition-colors"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {/* INFOS BAS DE CARTE */}
                        <div className="p-4 flex justify-between items-center bg-white">
                            <span className="text-xs font-bold px-2 py-1 bg-blue-50 text-blue-600 rounded-lg">
                                {word.language}
                            </span>
                            <span className="text-[10px] text-gray-400 font-medium uppercase">
                                {new Date(word.created_at || Date.now()).toLocaleDateString()}
                            </span>
                        </div>
                    </div>
                ))}
                </div>
                )}
            </main>

            {/* --- MODALE --- */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    {/* Fond sombre cliquable pour fermer */}
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
                    
                    {/* Contenu Formulaire */}
                    <div className="relative bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in duration-200">
                        <div className="p-8">
                            <h2 className="text-xl font-bold text-gray-800 mb-6">Ajouter un Daily Word</h2>
                            
                            <form onSubmit={handleSubmit} className="space-y-5">
                                {/* Select Langue */}
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Langue</label>
                                    <select 
                                        value={wordData.language}
                                        onChange={(e) => setWordData({...wordData, language: e.target.value})}
                                        className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                                    >
                                        <option value="">Sélectionner la langue</option>
                                        <option value="FR">Français</option>
                                        <option value="EN">Anglais</option>
                                        <option value="SW">Kiswahili</option>
                                        <option value="KI">Kirundi</option>

                                    </select>
                                </div>

                                {/* Upload Image */}
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Image</label>
                                    <div className="relative h-48 border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center overflow-hidden hover:border-blue-400 transition-colors">
                                        {preview ? (
                                            <img src={preview} alt="Aperçu" className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="text-center text-gray-400">
                                                <p className="text-sm">Cliquez pour choisir</p>
                                            </div>
                                        )}
                                        <input 
                                            type="file" 
                                            accept="image/*"
                                            onChange={handleImageChange}
                                            className="absolute inset-0 opacity-0 cursor-pointer"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="flex gap-3 pt-2">
                                    <button 
                                        type="button"
                                        onClick={() => setIsModalOpen(false)}
                                        className="flex-1 px-4 py-3 border border-gray-200 rounded-xl font-bold text-gray-500 hover:bg-gray-50"
                                    >
                                        Annuler
                                    </button>
                                    <button 
                                        type="submit" 
                                        className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 shadow-lg shadow-blue-200"
                                    >
                                        Enregistrer
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DailyWord;