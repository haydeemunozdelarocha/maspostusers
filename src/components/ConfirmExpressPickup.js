import React from 'react';
import { withRouter } from "react-router-dom";
import SubmittingForm from "./SubmittingForm";
import {confirmExpressPickup} from "../helpers/admin";
import queryString from 'query-string';

class ConfirmExpressPickup extends React.Component {
    constructor(props) {
        super(props);
        let params = queryString.parse(this.props.location.search);
        const packages = params.id ? params.id.split(',') : [];

        this.state = {
            isSubmitted: true,
            isSubmitting: true,
            packages,
            id: params.id
        };
    }

    componentDidMount() {
        confirmExpressPickup(this.state.id, this.state.packages).then((response) => {
            this.setState({
                isSubmitting: false
            });
        }).catch((e) => {
            return new Error(e.message);
        });
    }

    render() {
        const {isSubmitted, isSubmitting} = this.state;

        return (
            <div className="content-container content-container-with-padding">
                <h2>Confirmacion de Entrega Express</h2>
                <div className="content-container-align-center">
                    <div className="panel form-panel">
                        {
                                isSubmitted ?
                                <SubmittingForm isSubmitted={isSubmitted} isSubmitting={isSubmitting}/> :
                                <input name="button" type="submit" id="button" value="Confirmar" className="btn white-button" />
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(ConfirmExpressPickup);
