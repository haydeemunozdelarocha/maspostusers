import React from "react";
import NewUserForm from "./NewUserForm";

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            step: 0
        }
    }

    renderStep() {
        switch(this.state.step) {
            case 0:
                return (
                    <NewUserForm/>
                )
        }
    }

    render() {
        return (
            <div className="content-container content-container-with-padding">
                <h2>Nuevo Usuario</h2>
                <h4>Paso {this.state.step + 1} / 2</h4>
              <div className="content-container-align-center">
                  <div className="panel form-panel">
                      {this.renderStep()}
                  </div>
              </div>
            </div>
        );
    }
}

export default Register;
