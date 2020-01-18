import React from 'react';
import moment from 'moment';

function Footer() {
    const year = moment().format("YYYY");
    return (
        <footer className="main-footer">
            <div className="footer-bottom">
                <div className="text-right">
                        © +Post Warehouse {year}
                </div>
            </div>
        </footer>
);
}

export default Footer;
