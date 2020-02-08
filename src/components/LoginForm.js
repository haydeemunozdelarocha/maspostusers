import React from 'react';
import {login, setUserCookie} from '../helpers/authentification';
import { withRouter } from "react-router-dom";
import {CircularProgress, TextField} from "@material-ui/core";
import {userTypes} from "../helpers/authentification";

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            errorMessage: props.errorMessage || '',
            errorEnabled: !!props.errorMessage,
            submitting: false
        };
    }

    handleSubmit(event) {
        const { isAdmin, cookies } = this.props;

        event.preventDefault();
        this.setState({
            submitting: true
        }, () => {
            login(this.state.username, this.state.password, isAdmin).then(res => {
                if (res.status === 200) {
                    const user = res.data;
                    const isSuperAdmin = user.tipo && user.tipo == 1;
                    const userType = isSuperAdmin ? userTypes.SUPER_ADMIN : userTypes.USER;
                    setUserCookie(cookies, user, userType);
                    return this.redirectToUrl(userType);
                }
            }).catch((e) => {
                this.setState({
                    submitting: false,
                    errorEnabled: true,
                    errorMessage: 'Usuario o contraseña inválida.'
                });
                return new Error(`Error on Login at API ${e.message}`);
            })
        });
    }

    redirectToUrl(userType) {
        switch(userType) {
            case userTypes.SUPER_ADMIN:
                return this.props.history.push("/admin/dashboard");
            default:
                return this.props.history.push("/");
        }
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

    render() {
        return (
            <div className="login-form-wrapper">
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
                    <a href="/forgot-password">Olvidó su contraseña?</a>

                    <div id="login-button-container">
                        {
                            this.state.submitting ?
                                <CircularProgress /> :
                                <input name="button" type="submit" id="button" value="Entrar" className="btn white-button" />
                        }
                    </div>
                </form>
            </div>
        );
    }
}

export default withRouter(LoginForm);
