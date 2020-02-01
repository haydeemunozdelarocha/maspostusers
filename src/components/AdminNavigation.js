import React from 'react';
import {Link} from "react-router-dom";

const AdminNavigation = (props) => {
    return (
        <React.Fragment>
            <li><Link to="/admin">Home</Link></li>
            <li><Link to="/logout">Logout</Link></li>
        </React.Fragment>
    );
}

export default AdminNavigation;
