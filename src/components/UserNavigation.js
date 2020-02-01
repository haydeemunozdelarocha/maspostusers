import React from 'react';
import {Link} from "react-router-dom";

const UserNavigation = (props) => {
    return (
        <React.Fragment>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/inventario">Inventario</Link></li>
            <li><Link to="/logout">Logout</Link></li>
        </React.Fragment>
    );
}

export default UserNavigation;
