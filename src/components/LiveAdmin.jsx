import { useState, useEffect } from "react";

function LiveAdmin(){

/* ================= STATE ================= */

const [liveVideos,setLiveVideos]=useState([])

const [liveVideo,setLiveVideo]=useState({
title:"",
thumbnail:"",
url:"",
language:"",
isLive : true
})

const [open,setOpen]=useState(false)
const [editIndex,setEditIndex]=useState(null)
const [activeVideo,setActiveVideo]=useState(null)


/* ================= LOAD / SAVE ================= */

useEffect(()=>{
const data=localStorage.getItem("lives")
if(data) setLiveVideos(JSON.parse(data))
},[])

useEffect(()=>{
localStorage.setItem("lives",JSON.stringify(liveVideos))
},[liveVideos])


/* ================= INPUT ================= */

const handleChange=(e)=>{

const {name,value,files}=e.target

if(name==="thumbnail"){
const file=files[0]
if(file){
const imageUrl=URL.createObjectURL(file)
setLiveVideo({...liveVideo,thumbnail:imageUrl})
}
}else{
setLiveVideo({...liveVideo,[name]:value})
}

}


/* ================= YOUTUBE EMBED ================= */

const getEmbedUrl = (url) => {

    if (!url) return ""

    try {
        const parsed = new URL(url)

        if (parsed.hostname.includes("youtube.com")) {
            const videoId = parsed.searchParams.get("v")
            if (videoId) {
                return `https://www.youtube.com/embed/${videoId}`
            }
        }

        if (parsed.hostname.includes("youtu.be")) {
            const videoId = parsed.pathname.slice(1)
            return `https://www.youtube.com/embed/${videoId}`
        }

        return url

    } catch {
        return ""
    }
}

/* ================= SUBMIT ================= */

const handleSubmit=(e)=>{

e.preventDefault()

if(editIndex!==null){

const updated=[...liveVideos]
updated[editIndex]=liveVideo
setLiveVideos(updated)

}else{

setLiveVideos([...liveVideos,liveVideo])

}

resetForm()

}


/* ================= HELPERS ================= */

const resetForm=()=>{
setLiveVideo({title:"",thumbnail:"",url:"",language:""})
setEditIndex(null)
setOpen(false)
}


/* ================= ACTIONS ================= */

const handleEdit=(index)=>{
setLiveVideo(liveVideos[index])
setEditIndex(index)
setOpen(true)
}

const handleDelete=(index)=>{
if(!window.confirm("Delete this video ?")) return
setLiveVideos(liveVideos.filter((_,i)=>i!==index))
}


/* ================= UI ================= */

return(

<div className="">

{/* ===== HEADER ===== */}

<div className="flex justify-between bg-white p-6 fixed top-24 md:w-[1064px] w-[90%] rounded-xl shadow">

<h1 className="text-2xl font-bold">Live CMS</h1>

<button
onClick={()=>setOpen(true)}
className="bg-blue-600 text-white px-5 py-2 rounded-lg shadow"
>
Add Live
</button>

</div>


{/* ===== GRID ===== */}

<div className="grid md:grid-cols-3 gap-6 mt-32">

{liveVideos.map((v,index)=>(

<div key={index} className="bg-white rounded-xl shadow p-4">

{/* VIDEO / THUMB */}

<div className="w-full h-[180px] rounded overflow-hidden relative">

{activeVideo===index ? (

<iframe
className="w-full h-full"
src={v.isLive ? getEmbedUrl(v.url) + "&autoplay=1" : getEmbedUrl(v.url)}
title={v.title}
allow="autoplay; encrypted-media"
allowFullScreen
/>

) : (

<div
className="w-full h-full cursor-pointer relative"
onClick={()=>setActiveVideo(index)}
>

<img
src={v.thumbnail || "https://via.placeholder.com/300"}
className="w-full h-full object-cover"
/>

{v.isLive && (
    <div className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded">
        🔴 LIVE
    </div>
)}

<div className="absolute inset-0 flex items-center justify-center">
<div className="bg-black/60 text-white px-4 py-2 rounded-full">
▶ Play
</div>
</div>

</div>

)}

</div>


{/* INFO */}

<h2 className="font-bold mt-3">{v.title}</h2>
<p className="text-gray-500">{v.language}</p>


{/* ACTIONS */}

<div className="flex gap-3 mt-4">

<button
onClick={()=>handleEdit(index)}
className="bg-blue-500 text-white px-3 py-2 rounded"
>
Edit
</button>

<button
onClick={()=>handleDelete(index)}
className="bg-red-500 text-white px-3 py-2 rounded"
>
Delete
</button>

</div>

</div>

))}

</div>


{/* ===== MODAL ===== */}

{open &&(

<div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">

<div className="bg-white w-[420px] p-6 rounded-xl shadow-xl">

<h2 className="text-xl font-bold mb-5">
{editIndex!==null?"Edit Live":"Add Live"}
</h2>


<form onSubmit={handleSubmit}>

<input
type="text"
name="title"
value={liveVideo.title}
onChange={handleChange}
placeholder="Title"
required
className="w-full h-11 bg-gray-100 rounded mb-3 px-3"
/>


<input
type="file"
name="thumbnail"
onChange={handleChange}
className="w-full mb-3"
/>


{liveVideo.thumbnail &&(
<img
src={liveVideo.thumbnail}
className="w-full h-[120px] object-cover rounded mb-3"
/>
)}


<input
type="url"
name="url"
value={liveVideo.url}
onChange={handleChange}
placeholder="Youtube URL"
required
className="w-full h-11 bg-gray-100 rounded mb-3 px-3"
/>


<select
name="language"
value={liveVideo.language}
onChange={handleChange}
required
className="w-full h-11 bg-gray-100 rounded mb-4 px-3"
>
<option value="">Language</option>
<option>English</option>
<option>French</option>
<option>Kirundi</option>
<option>Kiswahili</option>
</select>

{/* <label className="flex items-center gap-2 mb-3">
    <input 
        type="checkbox"
        checked={liveVideo.isLive}
        onChange={(e)=>setLiveVideo({...liveVideo,isLive:e.target.checked})}
    />
    Live (Direct)
</label> */}


<div className="flex gap-3">

<button
type="button"
onClick={resetForm}
className="bg-gray-300 px-4 py-2 rounded"
>
Cancel
</button>

<button
className="bg-blue-600 text-white px-4 py-2 rounded"
>
Save
</button>

</div>

</form>

</div>

</div>

)}

</div>

)

}

export default LiveAdmin;