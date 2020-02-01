import React from "react";
import NewUserForm from "./NewUserForm";
import TermsForm from "./TermsForm";
import { acceptTerms, registerNewUser, setUserCookie } from "../helpers/authentification";
import { withCookies } from 'react-cookie';
import { withRouter } from "react-router-dom";

const stepTexts = {
    0: {
        title: 'Crea un usuario',
        subtitle: 'Con este usuario y contraseña podrás accesar nuestra plataforma en línea.'
    },
    1: {
        title: 'Términos y condiciones',
        subtitle: ''
    }
};

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            step:  props.user ?  props.user.perfil_status : 0,
            isLoggedIn: !!props.user
        }
    }

    renderStep() {
        if (this.state.step == 0) {
            return <NewUserForm onSubmit={(values) => this.createUser(values)}/>;
        } else {
            return <TermsForm user={this.props.user} onSubmit={(isAccepted) => this.acceptTerms(isAccepted)}/>
        }
    }

    acceptTerms() {
        acceptTerms(this.props.user.id, this.props.user.pmb).then((response) => {
            if (response.status === 200) {
                setUserCookie(this.props.cookies, response.data);
                this.props.history.push('/')
            }
        })
    }

    createUser(values) {
        if (values) {
            registerNewUser(values.email, values.password, values.pmb)
                .then((response) => {
                if (response.status === 200) {
                    if (!this.state.isLoggedIn) {
                        setUserCookie(this.props.cookies, response.data);
                    }

                    this.props.history.push(null, '/')
                }

            }).catch(() => {
                this.props.history.push('/', {errorMessage: 'PMB is either invalid or already registered with another email. Please login or reset your password.'});

            })
        }
    }

    render() {
        return (
            <div className="content-container content-container-with-padding">
                <h2>{stepTexts[this.state.step].title}</h2>
                <p>{stepTexts[this.state.step].subtitle}</p>
                <h4>Paso {Number(this.state.step) + 1} / 2</h4>
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
