import React from 'react';

const AdminNavigation = ({onClick}) => {
    return (
        <React.Fragment>
            <li><span onClick={() => onClick('/admin')}>Home</span></li>
            <li><span onClick={() => onClick('/logout')}>Logout</span></li>
        </React.Fragment>
    );
}

export default AdminNavigation;
