import React from "react";


const User = ({country, username}) => {
    return (
        <div className="list-item">
            {username} {country}
        </div>
    );
}

export default User;