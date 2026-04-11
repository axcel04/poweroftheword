import { useState, useEffect, useMemo } from "react";

function AudioAdmin() {
  /* ================= STATE ================= */
  const [audios, setAudios] = useState([]);
  const [audio, setAudio] = useState({
    id: null,
    title: "",
    file: "",
    language: "",
    date: "",
    time: ""
  });

  const [open, setOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  /* ================= LOAD / SAVE ================= */
  /* ================= LOAD / SAVE (Sécurisé) ================= */

useEffect(() => {
  const data = localStorage.getItem("audios");
  if (data) setAudios(JSON.parse(data));
}, []);

useEffect(() => {
  try {
    localStorage.setItem("audios", JSON.stringify(audios));
  } catch (e) {
    if (e.code === 22 || e.name === 'QuotaExceededError') {
      alert("Erreur : Espace de stockage plein ! Le fichier audio est trop lourd pour le navigateur.");
    }
  }
}, [audios]);

  /* ================= HANDLERS ================= */
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "file" && files[0]) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAudio((prev) => ({ ...prev, file: reader.result }));
      };
      reader.readAsDataURL(files[0]);
    } else {
      setAudio((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editIndex !== null) {
      const updated = [...audios];
      updated[editIndex] = { ...audio, id: Date.now() }; // Update ID to force refresh
      setAudios(updated);
    } else {
      setAudios([...audios, { ...audio, id: Date.now() }]);
    }
    resetForm();
  };

  const resetForm = () => {
    setAudio({ id: null, title: "", file: "", language: "", date: "", time: "" });
    setEditIndex(null);
    setOpen(false);
  };

  const handleEdit = (index) => {
    setAudio(audios[index]);
    setEditIndex(index);
    setOpen(true);
  };

  const handleDelete = (index) => {
    if (window.confirm("Supprimer cet enregistrement ?")) {
      setAudios(audios.filter((_, i) => i !== index));
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
                {a.date} • {a.time}
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
                  required={editIndex === null}
                  className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <input
                    type="date"
                    name="date"
                    value={audio.date}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Heure</label>
                  <input
                    type="time"
                    name="time"
                    value={audio.time}
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
                  <option value="Français">Français</option>
                  <option value="English">English</option>
                  <option value="Kirundi">Kirundi</option>
                  <option value="Kiswahili">Kiswahili</option>
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