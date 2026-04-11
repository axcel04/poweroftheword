import React, { useState } from "react";
import { Menu } from "lucide-react";
import VideoAdmin from "../components/VideoAdmin";
import { useNavigate } from "react-router-dom";
import LiveAdmin from "../components/LiveAdmin";
import AudioAdmin from "../components/AudioAdmin";
import FeedsAdmin from "../components/FeedsAdmin";

function DashboardAdmin() {

    const [active,setActive] = useState("video")
    const [menuOpen,setMenuOpen] = useState(false)
    const navigate = useNavigate()

    const menus = [

    { name:"Video", id:"video"},
    { name:"Live", id:"live"},
    { name:"Audio", id:"audio"},
    { name:"Feeds", id:"feeds"},
    { name:"Daily Word", id:"dailyword"},
    { name:"Program", id:"program"},
    { name:"Radio", id:"radio"}

    ]

    return (

        <div className="flex min-h-screen bg-gray-100">

            {/* MOBILE OVERLAY */}
            {menuOpen && (

            <div 
                className="fixed inset-0 bg-black/40 z-40 md:hidden"
                onClick={()=>setMenuOpen(false)}
            ></div>

            )}

            {/* SIDEBAR */}
            <div className={`
                fixed md:static min-h-screen z-50 bg-blue-900 text-white w-[240px] p-5 transform 
                ${menuOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 transition-transform duration-300 `}>

                <h1 className="text-xl font-bold mb-8"> Power of the Word </h1>

                <ul className="">
                    {menus.map((menu,index)=>(
                        <li
                        key={index}
                        onClick={()=>{
                        setActive(menu.id)
                        setMenuOpen(false)}}
                        className={`p-3 mb-3 rounded-lg cursor-pointer transition
                         ${active===menu.id ? "bg-white text-blue-900" : "hover:bg-blue-800"}

                        `}
                        >
                        {menu.name}
                        </li>
                    ))}
                </ul>
            </div>

            {/* MAIN CONTENT */}
            <div className="flex-1 flex flex-col md:ml-[14px]">

                {/* TOPBAR */}
                <div className="fixed top-0 right-0 md:left-[240px] left-0 bg-white p-4 shadow flex items-center justify-between z-30">

                    {/* MENU BUTTON MOBILE */}
                    <button 
                    className="md:hidden text-2xl" 
                    onClick={()=>setMenuOpen(true)}
                    >
                        <Menu />
                    </button>

                    <h2 className="font-semibold text-gray-700">
                        Admin Dashboard
                    </h2>

                    <button onClick={()=>navigate("/AdminLogin")} className="bg-red-500 text-white px-4 py-2 rounded">
                        Logout
                    </button>

                </div>

                {/* CONTENT AREA */}
                <div className="
                    mt-[72px]
                    h-[calc(100vh-72px)]
                    
                    p-4 md:p-6
                ">

                    {active==="video" && (
                        <VideoAdmin />
                        
                        )}

                    {active==="live" && (
                       <LiveAdmin />
                    )}

                    {active==="audio" && (
                        <AudioAdmin />
                    )}

                    {active==="feeds" && (
                       <FeedsAdmin />
                    )}

                    {active==="dailyword" && (
                        <div className="bg-white p-6 rounded-xl shadow">
                            <h3 className="font-bold text-lg"> Daily Word </h3>
                            <p>Manage daily bible verses</p>
                        </div>
                    )}

                    {active==="program" && (
                        <div className="bg-white p-6 rounded-xl shadow">
                            <h3 className="font-bold text-lg"> Programs </h3>
                            <p>Manage church programs</p>
                        </div>
                    )}

                    {active==="radio" && (
                        <div className="bg-white p-6 rounded-xl shadow">
                            <h3 className="font-bold text-lg"> Radio </h3>
                            <p>Manage church radio</p>
                        </div>
                    )}

                </div>

            </div>
        </div>
    )
}

export default DashboardAdmin