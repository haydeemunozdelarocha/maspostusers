import React from 'react';
import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import {MenuItem, Select} from "@material-ui/core";
import {timelineLabels, isWeekend} from "../helpers/formatting";
import moment from 'moment';

class DateTimeSelect extends React.Component {
    getTimeOptions() {
        const timesAvailable = timelineLabels('09:30 AM', '04:30 PM', '30');
        return timesAvailable.map((time, index) => <MenuItem key={`menu-option${index}`} value={time}>{time}</MenuItem>);
    }

    render() {
        const {date, time, onChange} = this.props;
        const helperText = isWeekend(date) ? 'La fecha seleccionada es en fin de semana. Los fines de semana solamente aceptamos entregas por cita. Al enviar tu solicitud, nuestro equipo confirmará la entrega por correo electrónico.' : '';

        return (
            <div className={"mp-datetime-select"}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                        className={"mp-datetime-select-input"}
                        label={"Fecha"}
                        name={"date"}
                        fullWidth
                        inputVariant="outlined"
                        margin="normal"
                        id="date-picker-dialog"
                        format="dd-MM-yyyy"
                        minDate={new Date()}
                        value={date}
                        onChange={(value) =>  onChange('date',  moment(value, 'MM-DD-YYYY').format('DD-MM-YYYY'))}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                        helperText={helperText}
                    />
                </MuiPickersUtilsProvider>
                <React.Fragment>
                    <Select
                        className={"mp-time-select"}
                        label={"Hora"}
                        variant="outlined"
                        name="time"
                        fullWidth
                        id="time-select"
                        value={time}
                        onChange={(e) => onChange(e.target.name, e.target.value)}
                    >
                        <MenuItem value="none" disabled>Selecciona una hora</MenuItem>
                        {this.getTimeOptions()}
                    </Select>
                </React.Fragment>
            </div>
        );
    }
};

export default DateTimeSelect;
