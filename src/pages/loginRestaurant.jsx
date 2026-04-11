// function loginRestaurant() {
//     const [restaurantName, setRestaurantName] = useState('')
//     const [email, setEmail] = useState('')
//     const [phoneNumber, setPhoneNumber] = useState('')
//     const [address, setAddress] = useState('')
//     const [password, setPassword] = useState('')

//     const handleSubmit = (e) => {
//         e.preventDefault()
//         // Handle login logic here
//         const restaurantData = {
//             restaurantName,
//             email,
//             phoneNumber,
//             address,
//             password
//         }
//         console.log(restaurantData)
//     }
//   return (
//     <div>
//       <h1>Login Restaurant</h1>
//       <p>Welcome to the restaurant login page!</p>
//       <form onSubmit={handleSubmit}>
//         <input type="text" placeholder="Restaurant Name" />
//         <input type="email" placeholder="Email" />
//         <input type="text" placeholder="Phone Number" />
//         <input type="text" placeholder="Address" />
//         <input type="password" placeholder="Password" />
//         <button type="submit">Login</button>
//       </form>
//     </div>
//   )
// } 

import React, { useState } from 'react';
// import { useAuth } from '../context/AuthContext';
import { Mail, Lock, Eye, EyeOff, Utensils } from 'lucide-react';
// import toast from 'react-hot-toast';

const LoginRestaurant = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
//   const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error('Veuillez remplir tous les champs');
      return;
    }

    if (!email.includes('@')) {
      toast.error('Veuillez entrer un email valide');
      return;
    }

    setIsLoading(true);
    const result = await login(email, password);
    setIsLoading(false);
    
    if (result.success && rememberMe) {
      localStorage.setItem('rememberedEmail', email);
    }
  };

  const fillDemoCredentials = () => {
    setEmail('restaurant@lepetitbistro.com');
    setPassword('123456');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo et titre */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-primary-600 rounded-full mb-4 shadow-lg">
            <Utensils className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Espace Restaurant
          </h1>
          <p className="text-gray-600">
            Connectez-vous pour gérer votre restaurant
          </p>
        </div>

        {/* Formulaire de connexion */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Adresse email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field pl-10"
                  placeholder="restaurant@exemple.com"
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Mot de passe */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mot de passe
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field pl-10 pr-10"
                  placeholder="••••••••"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Options supplémentaires */}
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                />
                <span className="ml-2 text-sm text-gray-600">Se souvenir de moi</span>
              </label>
              <a href="#" className="text-sm text-primary-600 hover:text-primary-700">
                Mot de passe oublié ?
              </a>
            </div>

            {/* Bouton de connexion */}
            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary relative"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Connexion en cours...
                </div>
              ) : (
                'Se connecter'
              )}
            </button>

            {/* Démos rapides */}
            <div className="pt-4">
              <p className="text-center text-sm text-gray-600 mb-3">
                Comptes de démonstration :
              </p>
              <button
                type="button"
                onClick={fillDemoCredentials}
                className="w-full text-sm text-primary-600 hover:text-primary-700 underline"
              >
                Utiliser un compte de démo
              </button>
            </div>
          </form>

          {/* Séparateur */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Nouveau sur la plateforme ?</span>
            </div>
          </div>

          {/* Lien d'inscription */}
          <div className="text-center">
            <a href="#" className="text-primary-600 hover:text-primary-700 font-medium">
              Créer un compte restaurant
            </a>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-sm text-gray-600">
            © 2025 FoodExpress - Plateforme de gestion restaurant
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginRestaurant;