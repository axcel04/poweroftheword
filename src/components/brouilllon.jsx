     
    const galleries = [
    "gloire4.jpg",
    "gloire1.jpg",
    "gloire2.jpg",
    "gloire3.jpg"
  ];
     
     <div className="w-full h-full min-h-[400px]">
                  <iframe
                    key={index}
                    src={`https://www.youtube.com/embed/${videoId}`}
                    title="YouTube video player"
                    className="w-full h-full"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                    
                  ></iframe>
                </div>