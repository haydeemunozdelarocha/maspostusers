import React from 'react';
import { submitExpressPickup, submitPackageAuth } from "../helpers/inventory";
import { FormControl } from '@material-ui/core';
import SubmittingForm from "./SubmittingForm";
import { packageAuthFormTypes } from "../helpers/inventory";
import DateTimeSelect from "./DateTimeSelect";
import AuthorizedPickupNameSelect from "./AuthorizedPickupNameSelect";
import moment from 'moment';

const today = moment().format('DD-MM-YYYY');
const defaultTimeout = 2000;

class PackageAuthForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            packageAuthInfo: {
                date: today,
                time: 'none',
                name: null,
            },
            errorMessage: '',
            errorEnabled: false,
            isSubmitting: false,
            isSubmitted: false
        };
    }

    resetError() {
        this.setState({
            errorEnabled: false,
            errorMessage: ''
        })
    }

    handleChange(name, value) {
        console.log('hhh', name, value)
        this.resetError();

        this.setState({
            packageAuthInfo: {
                ...this.state.packageAuthInfo,
                ...{
                    [name]: value
                }
            }
        })
    }

    onSubmit(popup, details) {
        const {pmb, packages, onStartSubmit } = this.props;
        this.resetError();
        this.setState({
            isSubmitted: true,
            isSubmitting: true,
        });
        const action = popup === packageAuthFormTypes.EXPRESS_PICKUP ? submitExpressPickup : submitPackageAuth;
        const params = {...details, pmb, packages};

        if (onStartSubmit) {
            onStartSubmit();
        }

        action(params).then((response) => {
            this.setState({
                isSubmitting: false
            }, () => {
                if (response.status === 200) {
                    setTimeout(() => {
                        this.successSubmitCallback(popup);
                    }, defaultTimeout);
                }
            });
        }).catch(() => {
            this.failSubmitCallback(popup);

        });
    }

    failSubmitCallback() {
        const {onEndSubmit } = this.props;

        setTimeout(() => {
            this.setState({
                isSubmitted: false,
                errorMessage: 'Hubo un error al enviar tu solicitud, por favor inténtalo de nuevo',
                errorEnabled: true
            });

            if (onEndSubmit) {
                onEndSubmit();
            }
        }, defaultTimeout);
    }

    successSubmitCallback(popup) {
        const { onEndSubmit } = this.props;

        if (onEndSubmit) {
            onEndSubmit(popup);
        }

        setTimeout(() => {
            this.setState({
                isSubmitted: false,
            });
        }, 400)
    }

    render() {
        const { isSubmitting, isSubmitted, packageAuthInfo, errorEnabled, errorMessage } = this.state;
        const { formType, pmb } = this.props;

        return (<React.Fragment>
            {
                errorEnabled &&
                <div className={`form-error-wrapper ${errorEnabled ? 'form-error-wrapper__show' : ''}`} dangerouslySetInnerHTML={{__html: errorEnabled ? errorMessage : ''}}></div>
            }
            {
                isSubmitted ?
                    <SubmittingForm isSubmitted={isSubmitted} isSubmitting={isSubmitting}/> :
                    <FormControl className="form">
                        {
                            formType === packageAuthFormTypes.EXPRESS_PICKUP &&
                            <DateTimeSelect date={packageAuthInfo.date} time={packageAuthInfo.time} onChange={(type, value) => this.handleChange(type, value)}/>
                        }
                        <AuthorizedPickupNameSelect pmb={pmb} name={packageAuthInfo.name} onChange={(value)=> this.handleChange('name', value)}/>
                        <input name="button" type="button" onClick={()=> this.onSubmit(formType, this.state.packageAuthInfo)} value="Programar" className="btn btn-default form-button" />
                    </FormControl>
            }
        </React.Fragment>);
    }
}

export default PackageAuthForm;
