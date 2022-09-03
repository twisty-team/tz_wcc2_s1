import React from "react";


const Pays = ({name}) => {
    return (
        <option value={name}>
            {name}
        </option>
    );
}

export default Pays;