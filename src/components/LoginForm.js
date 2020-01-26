import React from 'react';
import {login, setUserCookie} from '../helpers/authentification';
import { withRouter } from "react-router-dom";
import {CircularProgress, TextField} from "@material-ui/core";

class LoginForm extends React.Component {
    constructor(props) {
        console.log('ERRROR', props.errorMessage);
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
        const { isAdmin } = this.props;

        event.preventDefault();
        this.setState({
            submitting: true
        }, () => {
            login(this.state.username, this.state.password, isAdmin).then(res => {
                if (res.status === 200) {
                    const user = res.data;
                    const isSuperAdmin = user.tipo && user.tipo === 1;
                    const userType = isSuperAdmin ? 'superadmin' : 'user';
                    setUserCookie();
                    return this.redirectToUrl(userType);
                }
            }).catch((e) => {
                this.setState({
                    submitting: false,
                    errorEnabled: true,
                    errorMessage: 'Usuario o contraseña inválida.'
                })
            })
        });
    }

    redirectToUrl(userType) {
        switch(userType) {
            case 'user':
                return this.props.history.push("/");
            case 'superadmin':
                return this.props.history.push("/admin/dashboard");
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
                <h2>PORTAL DE USUARIOS</h2>
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
