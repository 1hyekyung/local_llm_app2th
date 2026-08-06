// import { useEffect, useState } from "react" 
// import axios from "axios"; 

// function UseEffectRender() { 
//     const [models, setModels] = useState([])
//     const URL = "http://localhost:8000/models"

//     useEffect(() => { 
//     //fetch 함수 사용    
//         fetch(URL) 
//         .then((response) => response.json()) 
//         .then((data) => setModels(data.models || []))
//         .catch((error) => console.error(error)); 
//     }, []);  // [] 처음 실행될 때 한번만 실행하도록 함 
      

//     return ( 
//         <main> 
//             <h1>모델 목록</h1> 
//             <ul> 
//                 {models.map((model) => ( 
//                     <li key={model}>{model}</li> 
//                 ))} 
//             </ul>
//         </main> 
//     )
// } 
// export default UseEffectRender

import { useEffect, useState } from "react";
import axios from "axios";

function UseEffectRender() {
    const [models, setModels] = useState([]);
    const URL = "http://localhost:8000/models";


    useEffect(() => {
        const fetchModels = async () => {
            try {
                const response = await axios.get(URL);

                setModels(response.data.models || []);

            } catch (error) {
                console.error(
                    "API 호출 오류:",
                    error
                );
            }
        };

        fetchModels();

    }, []);


    return (
        <main>
            <h1>모델 목록</h1>

            <ul>
                {models.map((model) => (
                    <li key={model}>
                        {model}
                    </li>
                ))}
            </ul>

        </main>
    );
}

export default UseEffectRender;