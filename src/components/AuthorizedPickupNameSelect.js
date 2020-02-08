import React from 'react';
import { Autocomplete } from '@material-ui/lab';
import {TextField} from "@material-ui/core";
import { getAutorizados } from "../helpers/customers";
import { formatName } from "../helpers/formatting";

class AuthorizedPickupNameSelect extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            autorizados: [],
            hasErrorMessage: false
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

    onInput(e, value) {
        const inputValue = value ? value : e.target.value;
        const {onChange} = this.props;
        this.setState({
            hasErrorMessage: inputValue && inputValue.length === 0
        });

        return onChange(inputValue);
    }

    render() {
        const {autorizados, hasErrorMessage} = this.state;
        return (
            <div className="mp-authorized-name-select">
                <div className="dialog-autocomplete">
                    {
                        autorizados.length > 0 &&
                        <Autocomplete
                            freeSolo
                            onChange={(e, value) => this.onInput(e, value)}
                            style={{zIndex: '10'}}
                            options={autorizados.map(option => option.nombre)}
                            renderInput={params => (
                                <TextField
                                    required
                                    {...params}
                                    onInput={(e) => this.onInput(e)}
                                    variant="outlined"
                                    margin="normal"
                                    label={"Quién va a recoger?"}
                                    fullWidth
                                    error={hasErrorMessage}
                                    InputProps={{ ...params.InputProps, type: 'search' }}
                                    helperText="Si el nombre del autorizado no aparece en la lista, solamente agrega un nombre nuevo."
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
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
