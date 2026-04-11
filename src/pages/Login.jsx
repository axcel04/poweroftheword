import React, {useState} from "react";
import { Link, useNavigate } from "react-router-dom";

function AdminLogin(){

    const [userName,setUserName] = useState("")
    const [password,setPassword] = useState("")
    const [error,setError] = useState("")
    const navigate = useNavigate();

    const handleLogin=(e)=>{

        e.preventDefault()

        if(userName==="axcel" && password==="1234"){
            alert("Connexion réussie")
            setError("")

            // redirection vers dashboard
            navigate("/DashboardAdmin")
        }else{
            setError("Email ou mot de passe incorrect")
        }

    }

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

                        <input
                        type="userName"
                        placeholder="UserName"
                        className="w-full mt-1 p-3 border rounded-lg focus:outline-none focus:border-purple-600"
                        value={userName}
                        onChange={(e)=>setUserName(e.target.value)}
                        />
                    </div>

                    <div className="mb-4">
                        <label className="text-gray-600 text-sm">
                        Password
                        </label>

                        <input
                        type="password"
                        placeholder="Password"
                        className="w-full mt-1 p-3 border rounded-lg focus:outline-none focus:border-purple-600"
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
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