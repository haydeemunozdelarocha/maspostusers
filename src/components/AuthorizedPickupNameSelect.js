import React from 'react';
import { Autocomplete } from '@material-ui/lab';
import {FormControl, TextField} from "@material-ui/core";
import { getAutorizados } from "../helpers/customers";
import { formatName } from "../helpers/formatting";

class AuthorizedPickupNameSelect extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            autorizados: [{
                nombre: 'juan'
            }]
        };
    }

    componentDidMount() {
        this.getAuthorizedNameOptions()
    }

    getAuthorizedNameOptions() {
        getAutorizados(this.props.pmb).then((response) => {
            if (response.status === 200 && response.data) {
                const formattedOptions = response.data.map((autorizado) => {
                    return {
                        nombre: formatName(autorizado.nombre)
                    };
                });

                this.setState({
                    autorizados: formattedOptions
                })
            }
        });
    }

    render() {
        const {name, onChange} = this.props;
        const {autorizados} = this.state;

        return (
            <div className="mp-authorized-name-select">
                <label>Quién va a recoger?</label>
                <div className="dialog-autocomplete">
                    {
                        autorizados.length > 0 &&
                        <Autocomplete
                            freeSolo
                            onChange={(e, value) => onChange(value)}
                            value={name}
                            style={{zIndex: '10'}}
                            options={autorizados.map(option => option.nombre)}
                            renderInput={params => (
                                <TextField
                                    {...params}
                                    onInput={(e) => onChange(e.target.value)}
                                    margin="normal"
                                    variant="outlined"
                                    fullWidth
                                    InputProps={{ ...params.InputProps, type: 'search' }}
                                />
                            )}
                        />
                    }
                </div>
            </div>
        );
    }
}

export default AuthorizedPickupNameSelect;
