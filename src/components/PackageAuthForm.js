import React from 'react';
import { submitExpressPickup, submitPackageAuth } from "../helpers/inventory";
import { FormControl } from '@material-ui/core';
import SubmittingForm from "./SubmittingForm";
import { packageAuthFormTypes } from "../helpers/inventory";
import DateTimeSelect from "./DateTimeSelect";
import AuthorizedPickupNameSelect from "./AuthorizedPickupNameSelect";
import moment from 'moment';

const defaultTimeout = 2000;
const closingTime = moment('04:30 PM', "HH:mm A");
const isClosed = closingTime.diff(moment(), 'hours') < 3;
const tomorrow = moment().add(1,'days');
const defaultDate = isClosed ? tomorrow.format('MM-DD-YYYY') : moment().format('MM-DD-YYYY');

class PackageAuthForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            packageAuthInfo: {
                date: defaultDate,
                time: 'none',
                name: null,
            },
            errorMessage: '',
            errorEnabled: false,
            isSubmitting: false,
            isSubmitted: false,
            disableSubmit: false
        };
    }

    resetError() {
        this.setState({
            errorEnabled: false,
            errorMessage: ''
        })
    }

    handleChange(name, value) {
        this.resetError();
        if (value && value.length === 0) {
            this.setState({
                disableSubmit: true,
                errorMessage: '',
                errorEnabled: false,
            });

            return;
        }

        this.setState({
            disableSubmit: false,
            errorMessage: '',
            errorEnabled: false,
            packageAuthInfo: {
                ...this.state.packageAuthInfo,
                ...{
                    [name]: value
                }
            }
        });
    }

    onSubmit(popup, details) {
        const {pmb, packages, onStartSubmit } = this.props;
        this.resetError();
        const params = {...details, pmb, packages};
        params.date = moment(params.date).format('DD-MM-YYYY');

        if (!params ||
            !params.packages
            || !params.name
            || (packageAuthFormTypes.EXPRESS_PICKUP === popup ? (!params.date || !params.time || params.time === 'none') : false)) {
            this.setState({
                disableSubmit: true,
                errorMessage: 'Por favor llena todos los campos.',
                errorEnabled: true,
            });

            return new Error(`Error on Package Auth form submit params ${JSON.stringify(params)}`);
        }

        this.setState({
            isSubmitted: true,
            isSubmitting: true,
            disableSubmit: false,
            errorMessage: '',
            errorEnabled: false,
        });

        const action = popup === packageAuthFormTypes.EXPRESS_PICKUP ? submitExpressPickup : submitPackageAuth;

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
        }).catch((e) => {
            this.failSubmitCallback(popup);
            return new Error(`Error on Package Auth form submit at API ${e.message}`);
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
        const { isSubmitting, isSubmitted, disableSubmit, packageAuthInfo, errorEnabled, errorMessage } = this.state;
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
                        <input disabled={disableSubmit} name="button" type="button" onClick={()=> this.onSubmit(formType, this.state.packageAuthInfo)} value="Programar" className={`btn btn-default form-button ${disableSubmit ? 'disabled' : ''}`} />
                    </FormControl>
            }
        </React.Fragment>);
    }
}

export default PackageAuthForm;
