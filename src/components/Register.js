import React from "react";
import NewUserForm from "./NewUserForm";
import TermsForm from "./TermsForm";
import {acceptTerms, getUserCookie, registerNewUser, setUserCookie} from "../helpers/authentification";
import { withCookies } from 'react-cookie';
import { withRouter } from "react-router-dom";

class Register extends React.Component {
    constructor(props) {
        super(props);
        const profileStatus = props.user ? props.user.profileStatus : 0;

        this.state = {
            step:  this.getStepData(profileStatus),
            isLoggedIn: !!props.user
        }
    }

    renderStep() {
        if (this.state.step.number == 0) {
            return <NewUserForm onSubmit={(values) => this.createUser(values)}/>;
        } else {
            return <TermsForm user={this.props.user} onSubmit={(isAccepted) => this.acceptTerms(isAccepted)}/>
        }
    }

    getStepData(stepNumber) {
        switch (stepNumber) {
            case '1':
                return {
                    number: 1,
                    title: 'Términos y condiciones',
                    subtitle: ''
                };
            default:
                return {
                    number: 0,
                    title: 'Crea un usuario',
                    subtitle: 'Con este usuario y contraseña podrás accesar nuestra plataforma en línea.'
                };
        }
    }

    acceptTerms() {
        const {cookies, user} = this.props;

        acceptTerms(user.id, user.pmb).then((response) => {
            if (response.status === 200) {
                setUserCookie(cookies, response.data, 'user');
                this.props.history.push('/')
            }
        })
    }

    createUser(values) {
        const {cookies} = this.props;
        const {isLoggedIn} = this.state;

        if (values) {
            registerNewUser(values.email, values.password, values.pmb)
                .then((response) => {
                if (response.status === 200) {
                    setUserCookie(cookies, response.data, 'user');
                    const user = getUserCookie(cookies);

                    this.setState({
                        step:  this.getStepData(user.profileStatus),
                        isLoggedIn: true
                    })
                }

            }).catch((e) => {
                return this.props.history.push('/', {errorMessage: 'PMB is either invalid or already registered with another email. Please login or reset your password.'});
            })
        }
    }

    render() {
        const {step} = this.state;

        return (
            <div className="content-container content-container-with-padding">
                <h2>{step.title}</h2>
                <p>{step.subtitle}</p>
                <h4>Paso {step.number + 1} / 2</h4>
              <div className="content-container-align-center">
                  <div className="panel form-panel">
                      {this.renderStep()}
                  </div>
              </div>
            </div>
        );
    }
}

export default withRouter(withCookies(Register));
