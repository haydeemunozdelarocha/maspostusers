import React from 'react';
import { withRouter } from "react-router-dom";
import {formatColumnNameToLabel} from "../helpers/formatting";
import {CircularProgress, TextField} from "@material-ui/core";

class ConfirmExpressPickup extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isSending: true
        };
    }

    render() {
        return (
            <div className="content-container content-container-with-padding">
                <h2>ENTREGAS EXPRESS</h2>
                <div className="content-container-align-center">
                    <div className="panel form-panel">
                        {
                            this.state.isSending ?
                                <div>
                                    <p>Estamos enviando tu solicitud para confirmar la entrega.</p>
                                    <CircularProgress />
                                </div> :
                                <input name="button" type="submit" id="button" value="Confirmar" className="btn white-button" />
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(ConfirmExpressPickup);
