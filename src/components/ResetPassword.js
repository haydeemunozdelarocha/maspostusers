import React from 'react';
import { withCookies } from 'react-cookie';
import LandingPage from "./LandingPage";
import {resetPassword} from "../helpers/authentification";
import {CircularProgress, TextField} from "@material-ui/core";
import { withRouter } from "react-router-dom";
import queryString from 'query-string'

class ResetPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            submitting: false,
        };
        this.clearForm();
        this.clearErrors();
    }

    isPasswordValid() {
        return this.state.password && this.state.password === this.state.confirmPassword;
    }

    getUrlAuthParams() {
        const params = queryString.parse(this.props.location.search)
        const {pmb, token} = params;

        if (pmb && pmb.length > 0 && token && token.length > 0) {
            return { pmb, token};
        } else {
            return null;
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState({
            submitting: true
        }, () => {
            const authParams = this.getUrlAuthParams();

            if (this.isPasswordValid() && authParams) {
                console.log(this.state.username, this.state.password, authParams.pmb, authParams.token)
                resetPassword(this.state.username, this.state.password, authParams.pmb, authParams.token).then(res => {
                    console.log(res);
                    if (res.status === 200) {
                        this.setState({
                            submitting: false,
                            errorEnabled: true,
                            errorMessage: 'Listo! Tu contraseña ha sido actualizada. Para ingresar a tu perfil haz click <a href="/">aqui</a>'
                        }, this.clearForm);
                    }
                }).catch((e) => {
                    console.log(e.response)
                    this.setState({
                        submitting: false,
                        errorEnabled: true,
                        errorMessage: e.response.data
                    })
                })
            } else {
                this.setState({
                    submitting: false,
                    errorEnabled: true,
                    errorMessage: 'Por favor ingresa un email válido y confirma tu contraseña.'
                })
            }
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
            pmb: '',
            password: '',
            confirmPassword: ''
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
                            name="username"
                            type="text"
                            label="Email"
                            value={this.state.username}
                            onChange={this.handleChange.bind(this)}
                        />

                        <TextField
                            InputLabelProps={{
                                shrink: true,
                            }}
                            margin="normal"
                            variant="outlined"
                            name="password"
                            type="password"
                            label="Contraseña"
                            value={this.state.password}
                            onChange={this.handleChange.bind(this)}
                        />

                        <TextField
                            InputLabelProps={{
                                shrink: true,
                            }}
                            margin="normal"
                            variant="outlined"
                            name="confirmPassword"
                            type="password"
                            label="Confirma tu contraseña"
                            value={this.state.confirmPassword}
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

export default withRouter(withCookies(ResetPassword));
