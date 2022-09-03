import React, { useState, useEffect } from "react";
import Pays from "./Pays";
import User from "./User";


const Search = () => {

    const [pays, setPays] = useState([]);
    const [users, setUsers] = useState([]);
    useEffect(() => {
        getPays();
    }, []);

    const SessionDataStorage = (e) => {
        e.preventDefault();
        sessionStorage.setItem("name", 'test');
        //console.log(name);
    };


    const getPays = async () => {
        const requete = await fetch(
            'https://data.gouv.nc/api/records/1.0/search/?dataset=liste-des-pays-et-territoires-etrangers&q=&rows=10000&facet=cog'
        );
        const response = await requete.json();
        setPays(response.records);
    }

    const getUsers = async () => {
        var location = document.getElementById('location').value;
        var username = document.getElementById('username').value;
        var query = '';
        if(location !== undefined){
            query = 'https://api.github.com/search/users?q=location:'+location+'&sort=joined'
            if(username !== undefined){
                query = 'https://api.github.com/search/users?q='+username+'+in:name+location:'+location+'&sort=joined'
            }
        } 
        const req = await fetch(
            //query
            'http://localhost:5000/users'
        )
        const response = req.json();
        setUsers(response);
        console.log(response);
        response.items.map(rep=>(
            console.log(rep)
        ))
    }

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-8 mx-auto">
                    <div className="row">
                        <div className="col-md-4">
                            <select name="" id="location" className="form-control" onChange={getUsers}>
                                <option>Pays</option>
                                { pays.map(p => (
                                    <Pays 
                                        key={p.fields.libcog}
                                        name={p.fields.libcog.toLowerCase()}
                                    />
                                ))}
                            </select>
                        </div>
                        <div className="col-md-8">
                            <input type="text" name="" id="username" className="form-control" onChange={getUsers} placeholder="username" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="list-group">
                            {/*users.map(user => (
                                <User 
                                    key={user}
                                    pays={"test"}
                                    username={"test"}
                                />
                            ))*/}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default Search;