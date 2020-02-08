import React from 'react';
import AdminNavigation from "./Header";
import UserNavigation from "./UserNavigation";
import MenuIcon from "./MenuIcon";
import {isMobileMedium} from "../helpers/responsive";
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';

class ResponsiveMenu extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: false,
            isMobile: isMobileMedium()
        }
    }

    componentDidMount() {
        window.addEventListener('resize', () => this.resizeWindow());
    }

    resizeWindow() {
        this.setState({
            isMobile: isMobileMedium()
        });
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    };

    getNavigationItems() {
        const {isSuperAdmin} = this.props;
        return (isSuperAdmin ? <AdminNavigation/> : <UserNavigation/>);
    }

    render() {
        const {isMobile, isOpen} = this.state;
        return (
            <React.Fragment>
                {
                    isMobile &&
                    <MenuIcon isOpen={isOpen} onClick={() => this.toggle()}/>
                }
                {
                    !isMobile &&
                    <ul className="menu-list">
                        {this.getNavigationItems()}
                    </ul>
                }
                <Dialog
                    className={'mobile-menu'}
                    fullScreen={isMobile}
                    open={isOpen}
                    onClose={() => this.close()}
                    aria-labelledby="responsive-dialog-title"
                >
                    <DialogContent>
                        <ul className="menu-list">
                            {this.getNavigationItems()}
                        </ul>
                    </DialogContent>
                </Dialog>
            </React.Fragment>
        );
    }
}

export default ResponsiveMenu;
