import React, { useState, useEffect } from "react";
import Pays from "./Pays"; 
import User from "./User";

const Search = () => {
    const items_per_page = 10;
    const [isSearch, setIsSearch] = useState(false);
    const [pays, setPays] = useState([]);
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(0);


    useEffect(() => {
        getPays();
        document.getElementById('username').disabled = true;
        document.getElementById('btn-search').disabled = true;
    }, []);

    /*const SessionDataStorage = (e) => {
        e.preventDefault();
        sessionStorage.setItem("name", 'test');
        //console.log(name);
    };*/


    const getPays = async () => {
        const requete = await fetch(
            'https://data.gouv.nc/api/records/1.0/search/?dataset=liste-des-pays-et-territoires-etrangers&q=&rows=10000&facet=cog'
        );
        const response = await requete.json();
        setPays(response.records);
    }

    const getUsers = async () => {
        document.getElementById('username').disabled = false;
        document.getElementById('btn-search').disabled = false;
        setIsSearch(true);
        setPage(1);
        var location = document.getElementById('location').value;
        var username = document.getElementById('username').value;
        var query = '';
        if (location !== undefined) {
            query = 'https://api.github.com/search/users?q=location:' + location + '&sort=joined&per_page=' + items_per_page + '&page=' + page;
            if (username !== undefined) {
                query = 'https://api.github.com/search/users?q=' + username + '+in:name+location:' + location + '&sort=joined&per_page=' + items_per_page + '&page=' + page;
            }
        }
        const req = await fetch(
            query
            //'http://localhost:5000/users'
        )
        const response = await req.json();
        //console.log(response.items);
        setUsers(response.items);
        console.log(users);
        const number_of_page = calculate_total_page(response.total_count, items_per_page);

    }

    const calculate_total_page = (total_items, items_per_page) => {
        var total;
        if (total_items % items_per_page === 0) {
            total = total_items / items_per_page;
        } else {
            total = Math.floor(total_items / items_per_page) + 1;
        }
        return total;
    }

    const Users = ({isSearch, users}) => {
        //console.log(isSearch);
        //console.log(users);
        if(isSearch === true){
            return(
                <div className="list-group">
                    {users.map(user => (
                        <User
                            key={user.login}
                            pays={document.getElementById('location').value}
                            username={user.login}
                            user_url={user.html_url}
                            avatar_url={user.avatar_url}
                        />
                    ))}
                </div>
            )
        }else{
            return (
                <div className="row">
                    <h3 className="text-center">Please select country</h3>
                </div>
            )
        }
    }

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-8 mx-auto">
                    <div className="row">
                        <div className="col-md-4">
                            <select name="" id="location" className="form-control" onChange={getUsers}>
                                <option>Country</option>
                                {pays.map(p => (
                                    <Pays
                                        key={p.fields.libcog}
                                        name={p.fields.libcog.toLowerCase()}
                                    />
                                ))}
                            </select>
                        </div>
                        <div className="col-md-8">
                            <div className="input-group mb-3">
                                <input type="text" name="" id="username" className="form-control" placeholder="Search by username" />
                                <button className="btn btn-secondary" onClick={getUsers} id="btn-search">Search</button>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <Users 
                            isSearch={isSearch}
                            users={users}
                        />
                    </div>
                </div>
            </div>
        </div>
    );

}

export default Search;