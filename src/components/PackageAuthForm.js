import React from 'react';
import {login} from "../helpers/authentification";
import {timelineLabels} from "../helpers/formatting";
import {getAutorizados} from "../helpers/customers";

class PackageAuthForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            packageAuthInfo: {
                date: '',
                time: '',
                name: '',
            },
            errorMessage: '',
            errorEnabled: false,
            autorizados: []
        };
    }

    componentWillMount() {
        this.getAuthorizedNameOptions();
    }

    handleSubmit(event) {
        event.preventDefault();
        login(this.state.packageAuthInfo).then(res => {
            if (res.status === 200) {
            }
        }).catch((e) => {
            console.log(e);
            this.setState({
                errorEnabled: true,
                errorMessage: 'Usuario o contraseña inválida.'
            })
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

    getTimeOptions() {
        const timesAvailable = timelineLabels('09:30 AM', '04:30 PM', '30');
        return timesAvailable.map((time, index) => <option key={`option_time_${index}`} value={time}>{time}</option>);
    }

    getAuthorizedNameOptions() {
        getAutorizados(this.props.pmb).then((response) => {
            if (response.status === 200 && response.data) {
                return response.data.map((autorizado) => {
                    console.log(autorizado.nombre);
                    this.setState({
                        autorizados: response.data.map((autorizado) => autorizado.nombre)
                    });
                });
            }
        });
    }

    render() {

        return (
            <form className="form">
                <label>Día</label>
                <input className="form-control" name="date" type="date" onChange={this.handleChange.bind(this)}/>
                <label>Hora</label>
                <select className="form-control">
                    <option value="">Selecciona una hora</option>
                    {this.getTimeOptions()}
                </select>
                <label>Quién va a recojer?</label>
                <select className="form-control">
                    <option value="">Selecciona un nombre de la lista</option>
                    {this.state.autorizados.map((nombre, index) => <option key={`option_name_${index}`} value={nombre}>{nombre}</option>)}
                </select>
                <input name="button" type="submit" value="Autorizar" className="btn btn-default form-button" />
            </form>
        );
    }
}

export default PackageAuthForm;
