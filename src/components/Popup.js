import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

export default function Popup(props) {
    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        if (props.onSubmit) {
            props.onSubmit();
        }
        setOpen(false);
    };

    return (
        <div>
            <button className="btn btn-default" onClick={handleClickOpen}>
                {props.buttonLabel}
            </button>
            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">
                    {props.title}
                    <div className="popup-close" onClick={handleClose}>X</div>
                </DialogTitle>
                <DialogContent>
                    {props.children}
                </DialogContent>
                {
                    props.hasActionButtons &&
                    <DialogActions>
                        <button className="btn btn-default" onClick={handleClose}>
                            Cancelar
                        </button>
                        <button className="btn btn-default" onClick={handleClickOpen}>
                            Enviar
                        </button>
                    </DialogActions>
                }
            </Dialog>
        </div>
    );
}
