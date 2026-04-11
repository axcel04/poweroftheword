import { useState, useEffect } from "react";

function FeedsAdmin() {
  const [feeds, setFeeds] = useState([]);
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
  useEffect(() => {
    const data = localStorage.getItem("feeds");
    if (data) setFeeds(JSON.parse(data));
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("feeds", JSON.stringify(feeds));
    } catch (e) {
      alert("Quota dépassé ! Essayez une photo plus légère.");
    }
  }, [feeds]);

  // Handlers
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editIndex !== null) {
      const updated = [...feeds];
      updated[editIndex] = feed;
      setFeeds(updated);
    } else {
      setFeeds([...feeds, feed]);
    }
    resetForm();
  };

  const resetForm = () => {
    setFeed({ title: "", photo: "", language: "", type: "", desc: "" });
    setEditIndex(null);
    setOpen(false);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* HEADER */}
      <div className="flex justify-between items-center bg-white p-6 rounded-xl shadow-sm mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Feeds CMS</h1>
        <button 
          onClick={() => setOpen(true)}
          className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg transition-colors"
        >
          + Nouveau Feed
        </button>
      </div>

      {/* GRID D'AFFICHAGE */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {feeds.map((f, index) => (
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
                <button onClick={() => { setFeed(feeds[index]); setEditIndex(index); setOpen(true); }} className="flex-1 text-sm bg-gray-50 hover:bg-blue-50 text-blue-600 font-semibold py-2 rounded-lg transition-colors">Modifier</button>
                <button onClick={() => setFeeds(feeds.filter((_, i) => i !== index))} className="text-sm bg-gray-50 hover:bg-red-50 text-red-400 p-2 rounded-lg transition-colors">Supprimer</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL FORMULAIRE */}
      {open && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="bg-white w-full max-w-lg p-8 rounded-2xl shadow-2xl overflow-y-auto max-h-[90vh]">
            <h2 className="text-xl font-bold mb-6 text-gray-800">{editIndex !== null ? "Modifier" : "Créer"} un Feed</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="text" name="title" value={feed.title} onChange={handleChange} placeholder="Titre de l'actu" required className="w-full px-4 py-3 bg-gray-50 border rounded-xl focus:ring-2 focus:ring-green-500 outline-none" />
              
              <div className="grid grid-cols-2 gap-4">
                <select name="type" value={feed.type} onChange={handleChange} required className="px-4 py-3 bg-gray-50 border rounded-xl outline-none">
                  <option value="">Type</option>
                  <option value="News">Actualité</option>
                  <option value="Event">Événement</option>
                  <option value="Promo">Promotion</option>
                </select>
                <select name="language" value={feed.language} onChange={handleChange} required className="px-4 py-3 bg-gray-50 border rounded-xl outline-none">
                  <option value="">Langue</option>
                  <option value="French">Français</option>
                  <option value="English">Anglais</option>
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