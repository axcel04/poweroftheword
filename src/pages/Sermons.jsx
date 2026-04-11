// import React from "react";

// function Sermons() {

//     const sermons = [
//     {
//     title:"La foi qui déplace les montagnes",
//     pastor:"Pasteur Jean",
//     date:"12 Mars 2026",
//     video:"/videos/sermon1.mp4",
//     image:"https://images.unsplash.com/photo-1507692049790-de58290a4334"
//     },

//     {
//     title:"Marcher avec Dieu",
//     pastor:"Pasteur Paul",
//     date:"10 Mars 2026",
//     video:"/videos/sermon2.mp4",
//     image:"https://images.unsplash.com/photo-1490730141103-6cac27aaab94"
//     },

//     {
//     title:"La puissance de la prière",
//     pastor:"Pasteur David",
//     date:"08 Mars 2026",
//     video:"/videos/sermon3.mp4",
//     image:"https://images.unsplash.com/photo-1478145046317-39f10e56b5e9"
//     }

//     ];

//     return (

//         <div>

//             {/* HERO */}
//             <section className="relative h-80 flex items-center justify-center">
//                 <img
//                 src="https://images.unsplash.com/photo-1438232992991-995b7058bbb3"
//                 className="absolute w-full h-full object-cover"
//                 />

//                 <div className="absolute inset-0 bg-black/60"></div>

//                 <div className="relative text-center text-white">
//                     <h1 className="text-5xl font-bold mb-3"> Sermons </h1>
//                     <p className="text-lg"> Ecoutez la parole de Dieu chaque semaine </p>
//                 </div>

//             </section>

//             {/* SERMON LIST */}
//             <section className="max-w-7xl mx-auto px-6 py-16">
//                 <h2 className="text-3xl font-bold text-center mb-12"> Derniers sermons </h2>

//                 <div className="grid md:grid-cols-3 gap-10">
//                     {sermons.map((sermon,index)=>(
//                         <div
//                         key={index}
//                         className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition"
//                         >
//                             <img
//                             src={sermon.image}
//                             className="h-52 w-full object-cover"
//                             />

//                             <div className="p-6">
//                                 <h3 className="text-xl font-bold mb-2"> {sermon.title} </h3>
//                                 <p className="text-gray-600"> {sermon.pastor} </p>
//                                 <p className="text-gray-400 text-sm mb-4"> {sermon.date} </p>

//                                 {/* VIDEO */}
//                                 <video controls className="rounded-lg mb-4" >
//                                 <source src={sermon.video}/>
//                                 </video>
//                                 <div className="flex gap-3">
//                                 <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"> Voir </button>
//                                 <button className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"> Télécharger </button>
//                                 </div>
//                             </div>

//                         </div>
//                     ))}

//                 </div>

//             </section>

//             {/* FEATURE SERMON */}
//             <section className="bg-blue-900 text-white py-20 text-center">
//                 <h2 className="text-3xl font-bold mb-6"> Sermon de la semaine </h2>
//                 <div className="max-w-4xl mx-auto">
//                     <video controls className="rounded-xl shadow-2xl" >
//                     <source src="/videos/sermon-main.mp4"/>
//                     </video>
//                 </div>
//             </section>
//         </div>

//     );
// }

// export default Sermons;
