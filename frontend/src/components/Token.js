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

    const SessionDataStorage = (e, token) => {
        e.preventDefault();
        sessionStorage.setItem("token", token);
        //console.log(name);
    };

    const getToken = async (value) => {
        const requete = await fetch(
            'http://localhost:5000/token?code='+value
        )
        const response = await requete.json();
        
        sessionStorage(response.token);
        console.log(response.token);
        
        window.location.href = "/search";

    }
}

export default Token;