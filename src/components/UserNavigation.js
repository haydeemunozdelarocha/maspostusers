import React from 'react';

const UserNavigation = ({onClick}) => {
    return (
        <React.Fragment>
            <li><span onClick={() => onClick('/')}>Home</span></li>
            <li><span onClick={() => onClick('/inventario')}>Inventario</span></li>
            <li><span onClick={() => onClick('/logout')}>Logout</span></li>
        </React.Fragment>
    );
}

export default UserNavigation;
