import React, {useState} from "react";
import { Link, useNavigate } from "react-router-dom";

function AdminLogin(){

    const [login, setLogin] = useState({ username:"", password:"" })
    const [token, setToken] = useState(localStorage.getItem("token") || null)
    const [error,setError] = useState("")
    const navigate = useNavigate();

    const handleChange = (e) => {
        setLogin({...login, [e.target.name]:e.target.value})
    }

    const handleLogin= async(e)=>{

        e.preventDefault()

        try{
            const reponse = await fetch("https://poweroftheword.bi/token/",{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify(login)
            })

            if(reponse.ok){
                const data = await reponse.json();

                const userToken = data.access; // Le backend renvoie souvent { "token": "abc123..." }
                
                setToken(userToken);// 1. Enregistrer dans le State
                localStorage.setItem("token",userToken); // 2. Enregistrer dans le navigateur (pour rester connecté après F5)
                alert("Connexion reussi");
                navigate("/DashboardAdmin")
            } else {
                setError("Email ou mot de passe incorrect")
            }
        } catch(error){
            console.error("Erreur de connexion au serveur", error);
        }

    }

     console.log("=====================",token)

    return(

        <div className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-800 flex justify-center items-center">
            <div className="bg-white w-[380px] p-8 rounded-2xl shadow-2xl">
                <div className="text-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-800"> Power of the Word </h1>
                    <p className="text-gray-500 text-sm"> Admin Dashboard Login </p>
                </div>

                <form onSubmit={handleLogin}>

                    <div className="mb-4">
                        <label className="text-gray-600 text-sm">
                        Email
                        </label>

                        <input type="text"
                        name="username"
                        placeholder="UserName"
                        className="w-full mt-1 p-3 border rounded-lg focus:outline-none focus:border-purple-600"
                        value={login.username}
                        onChange={handleChange}
                        />
                    </div>

                    <div className="mb-4">
                        <label className="text-gray-600 text-sm"> Password </label>

                        <input type="password" name="password" placeholder="Password"
                            className="w-full mt-1 p-3 border rounded-lg focus:outline-none focus:border-purple-600"
                            value={login.password} onChange={handleChange}
                        />
                    </div>

                    {
                    error && (
                    <p className="text-red-500 text-sm mb-3">
                    {error}
                    </p>
                    )
                    }

                    <button className="w-full bg-purple-700 text-white p-3 rounded-lg hover:bg-purple-800 transition">
                        Login
                    </button>
                </form>

                <div className="text-center mt-6">
                    <p className="text-gray-400 text-sm"> Power of the Word Church Admin System </p>
                </div>
            </div>
        </div>
    )
}

export default AdminLogin