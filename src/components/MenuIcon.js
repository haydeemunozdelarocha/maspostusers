import React from 'react';

const MenuIcon = ({isOpen, onClick}) => {
    return (
        <div onClick={onClick} className={`menu-icon ${isOpen ? 'open' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
        </div>
    );
}

export default MenuIcon;
