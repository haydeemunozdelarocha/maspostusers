import React from 'react';
import { withRouter } from "react-router-dom";

class Form extends React.Component {


    handleChange(event) {
        this.props.handleChange(event);
    }

    render() {
        return (
            <div className={this.props.customClasses}>
                <h2>{this.props.title}</h2>
                { !this.props.errorEnabled ||
                <div className="form-error-wrapper">{this.props.errorMessage}</div>
                }
                <form className="form" onSubmit={this.props.handleSubmit} onChange={this.props.handleChange}>
                    {this.props.children}

                    <div id="login-button-container">
                        <input name="button" type="submit" id="button" value={this.props.submitLabel} className="btn white-button" />
                    </div>
                </form>
            </div>
        );
    }
}

export default withRouter(Form);
