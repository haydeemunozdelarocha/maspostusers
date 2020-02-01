import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import { Tooltip } from '@material-ui/core';
import {
    withStyles
} from "@material-ui/core/styles";

const CustomTooltip = withStyles({
    tooltip: {
        fontSize: '14px',
        padding:  '10px'
    }
})(Tooltip);

class Popup extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false,
            fullScreen: false
        }
    }

    componentDidMount() {
        console.log('huh?', this.isMobile());
        const isFullScreen = this.isMobile();
        this.setState({
            fullScreen: isFullScreen
        });

        window.addEventListener('resize', () => this.resizeWindow());
    }

    isMobile() {
        return window.innerWidth < 556;
    }

    resizeWindow() {
        console.log('resizing window', this.isMobile());
        const isFullScreen = this.isMobile();

        this.setState({
            fullScreen: isFullScreen
        });
    }

    open() {
        if (!this.props.disableOpen) {
            this.setState({
                open: true
            });
        }
    };

    close() {
        this.setState({
            open: false
        });
    };

    renderButton() {
        const {disableOpen, buttonLabel} = this.props;
        if (disableOpen) {
            return (
                <CustomTooltip title="Primero selecciona los paquetes. Después agenda tu autorización o entrega.">
                    <span>
                        <button className={`btn btn-default ${disableOpen && 'disabled'}`} onClick={() => this.open()}>
                            {buttonLabel}
                        </button>
                    </span>
                </CustomTooltip>
            );
        } else {
            return (
                <button className="btn btn-default" onClick={() => this.open()}>
                {buttonLabel}
                </button>);
        }
    }

    render() {
        const {handleSubmit, title, children, hideHeader, hasActionButtons} = this.props;

        return (
            <div>
                {this.renderButton()}
                <Dialog
                    className={'popup-dialog'}
                    fullScreen={this.state.fullScreen}
                    open={this.state.open}
                    onClose={() => this.close()}
                    aria-labelledby="responsive-dialog-title"
                >
                    {
                        !hideHeader &&
                        <DialogTitle className="popup-title" id="responsive-dialog-title">
                            {title}
                            <div className="popup-close" onClick={() => this.close()}></div>
                        </DialogTitle>
                    }
                    <DialogContent>
                        {children}
                    </DialogContent>
                    {
                        hasActionButtons &&
                        <DialogActions>
                            <button className="btn btn-default" onClick={() => this.close()}>
                                Cancelar
                            </button>
                            <button className="btn btn-default" onClick={handleSubmit}>
                                Enviar
                            </button>
                        </DialogActions>
                    }
                </Dialog>
            </div>
        );
    }
}

export default Popup;
