import React, {useEffect, useState} from "react"


const Token = () => {
    const [token, setToken] = useState([]);
    
    useEffect(()=>{
        const params = new Proxy(new URLSearchParams(window.location.search), {
            get: (searchParams, prop) => searchParams.get(prop),
        });

        let value = params.code;
        getToken(value);
    },[])

    const getToken = async (value) => {
        const requete = await fetch(
            'http://localhost:5000/token?code='+value
        )
        const response = await requete.json();

        console.log(response);

    }

    return (
        <div className="row"></div>
    )
}

export default Token;