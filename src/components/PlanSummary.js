import React from 'react';
import {getCustomerPlanInfo} from "../helpers/customers";
import {getUserCookie, logOut} from '../helpers/authentification';

class PlanSummary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nombre: '',
            pmb: '',
            saldo: '',
            plan: ''
        }
    }

    componentWillMount() {
        const userCookie = getUserCookie(this.props.cookies);

        if (userCookie) {
            getCustomerPlanInfo(userCookie.pmb).then(res => {
                if(res.status === 200) {
                    const planInfo = res.data[0] || {};

                    this.setState({
                        nombre: planInfo.nombre,
                        pmb: planInfo.pmb,
                        saldo: planInfo.saldo,
                        plan: planInfo.plan
                    });
                }
            }).catch((e) => {
                logOut(this.props.cookies);
                return new Error(`Error getting customer plan info. message: ${e.message}`);
            });
        }
    }

    render() {
        const {pmb, nombre, plan } = this.state;
        return (
            <React.Fragment>
                {
                    pmb && pmb.length > 0 &&
                    <div className="circle-number-wrapper">
                        <div className="circle-number-content">
                            <h1>{pmb}</h1>
                            <h5>PMB</h5>
                        </div>
                    </div>
                }
                <div className="circle-number-description">
                    <h4>{nombre}</h4>
                    <h4>{plan}</h4>
                </div>
            </React.Fragment>
        );
    }
}

export default PlanSummary;
