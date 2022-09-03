import React from "react";


const User = ({ pays, username, user_url, avatar_url }) => {
    return (
        <li className="list-group-item d-flex justify-content-between align-items-start">
            <img src={avatar_url} alt="user avatar" className="avatar" />
            <div className="ms-2 me-auto">
                <div className="fw-bold">{username}</div>
                {pays}
            </div>
            <a href={user_url} className="btn btn-primary">Go to profil</a>
        </li>
    );
}

export default User;