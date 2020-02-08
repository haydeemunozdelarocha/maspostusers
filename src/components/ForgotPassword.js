import React from 'react';
import { withCookies } from 'react-cookie';
import LandingPage from "./LandingPage";
import {forgotPassword} from "../helpers/authentification";
import { withRouter } from "react-router-dom";
import { TextField } from '@material-ui/core';
import { CircularProgress } from '@material-ui/core';

class ForgotPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            submitting: false,
        };
        this.clearForm();
        this.clearErrors();
    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState({
            submitting: true
        }, () => {
            forgotPassword(this.state.username, this.state.pmb).then(res => {
                if (res.status === 200) {
                    this.setState({
                        submitting: false,
                        errorEnabled: true,
                        errorMessage: 'Listo! Hemos enviado a tu correo las instrucciones para crear una nueva contraseña.'
                    }, this.clearForm);
                }
            }).catch((e) => {
                this.setState({
                    submitting: false,
                    errorEnabled: true,
                    errorMessage: e.message
                });
                return new Error(`Error on Forgot Password at API ${e.message}`)
            })
        })
    }

    resetError() {
        this.setState({
            errorEnabled: false,
            errorMessage: ''
        })
    }

    handleChange(event) {
        this.resetError();
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    clearForm() {
        this.setState({
            username: '',
            pmb: ''
        });
    }

    clearErrors() {
        this.setState({
            errorMessage: '',
            errorEnabled: false
        });
    }

    render() {
        return (
            <LandingPage>
                <div className="login-form-wrapper">
                    <h2>REESTABLECER CONTRASEÑA</h2>
                    <div className={`form-error-wrapper ${this.state.errorEnabled ? 'form-error-wrapper__show' : ''}`} dangerouslySetInnerHTML={{__html: this.state.errorEnabled ? this.state.errorMessage : ''}}></div>
                    <form className="form-centered form-light" onSubmit={this.handleSubmit.bind(this)}>
                        <TextField
                            InputLabelProps={{
                                shrink: true,
                            }}
                            margin="normal"
                            variant="outlined"
                            name="pmb"
                            type="text"
                            label="No. de PMB"
                            value={this.state.pmb}
                            onChange={this.handleChange.bind(this)}
                        />
                        <TextField
                            InputLabelProps={{
                                shrink: true,
                            }}
                            margin="normal"
                            variant="outlined"
                            name="username"
                            type="text"
                            label="Email"
                            value={this.state.username}
                            onChange={this.handleChange.bind(this)}
                        />

                        <div id="login-button-container">
                            {
                                this.state.submitting ?
                                <CircularProgress /> :
                                <input name="button" type="submit" id="button" value="Enviar" className="btn white-button" />
                            }
                        </div>
                    </form>
                </div>
            </LandingPage>
        );
    }
}

export default withRouter(withCookies(ForgotPassword));
