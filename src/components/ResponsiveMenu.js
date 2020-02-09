import React from 'react';
import AdminNavigation from "./Header";
import UserNavigation from "./UserNavigation";
import MenuIcon from "./MenuIcon";
import {isMobileMedium} from "../helpers/responsive";
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import { withRouter } from "react-router-dom";

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

    navigateTo(path) {
        if (this.state.isMobile) {
            this.toggle();
        }
        this.props.history.push(path)
    }

    getNavigationItems() {
        const {isSuperAdmin} = this.props;
        return (isSuperAdmin ? <AdminNavigation/> : <UserNavigation onClick={(path) => this.navigateTo(path)}/>);
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

export default withRouter(ResponsiveMenu);
