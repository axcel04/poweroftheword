import React,{useState,useEffect} from "react";
import { Sun , Moon } from "lucide-react";    

function ThemeToggle(){

    const [dark,setDark]=useState(
       localStorage.getItem("theme")==="dark"
    );

    useEffect(()=>{

        if(dark){
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme","dark");
        }else{
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme","light");
        }

    },[dark]);

    return(

        <button
        onClick={()=>setDark(!dark)}
        className="flex items-center gap-2 bg-white dark:bg-gray-800 dark:border-gray-600 px-2 py-2 md:px-4 rounded-full shadow cursor-pointer hover:bg-gray-600 hover:text-white"
        >
            <span> {dark ? <Sun size={16} /> : <Moon size={16} />}</span>
            <span className="hidden md:block "> {dark ? "Light mode" : "Dark mode"} </span>
        </button>
    )
}

export default ThemeToggle;