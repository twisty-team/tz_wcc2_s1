import React from "react";
import User from "./User";

const Users = ({ isSearch, users, total_count }) => {
    if (isSearch === true) {
        if (users.length > 0) {
            return (
                <div className="row">
                    <h4 className="text-center" aria-current="page">{total_count} users found</h4>
                    <p>{(total_count > 1000) ? "Only the 100 first pages are availables." : ""}</p>
                    <div className="list-group">
                        {users && users.map(user => (
                            <User
                                key={window.sessionStorage.getItem('token') ? user.username : user.login}
                                username={window.sessionStorage.getItem('token') ? user.username : user.login}
                                user_url={user.html_url}
                                avatar_url={user.avatar_url}
                                pays={document.getElementById('location').value}
                            />
                        ))}
                    </div>
                </div>
            )
        }
        return (
            <h3 className="text-center">No users found</h3>
        )
    } else {
        return (
            <div className="row">
                <h3 className="text-center">Please select country</h3>
            </div>
        )
    }
}

export default Users;