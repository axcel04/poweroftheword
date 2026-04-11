import React, {useState} from "react";

function Location(){

const [location,setLocation] = useState(null);

const getLocation = ()=>{

navigator.geolocation.getCurrentPosition(

(position)=>{

setLocation({
latitude:position.coords.latitude,
longitude:position.coords.longitude
})

},

(error)=>{
console.log(error);
}

);

}

return(

<div className="p-10 text-center">

<button 
onClick={getLocation}
className="bg-blue-600 text-white px-6 py-3 rounded-lg"
>

Activer localisation

</button>

{
location && (

                <div>
                    <h3 className="text-white font-semibold mb-6"> Location </h3>
                    <div className="rounded-xl overflow-hidden border border-gray-800">
                        <iframe
                        title="map"
                        src={`https://www.google.com/maps?q=${location.latitude},${location.longitude}`}
                        className="w-full h-40 border-0"
                        loading="lazy"
                        />
                    </div>
                </div>

)
}

</div>

)

}

export default Location;