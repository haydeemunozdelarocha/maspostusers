import React from 'react';
import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import {MenuItem, Select} from "@material-ui/core";
import {timelineLabels, isWeekend} from "../helpers/formatting";
import moment from 'moment';

const closingTime = moment('04:30 PM', "HH:mm A");

class DateTimeSelect extends React.Component {

    getTimeOptions(isClosed) {
        let startTime;

        if (isClosed) {
            startTime = moment('09:00 AM', 'HH:mm A');
        } else {
            startTime = moment();
        }

        const startRemainder = 30 - (startTime.minute() % 30);
        const startDateTime = moment(startTime).add(startRemainder, "minutes");
        const timesAvailable = timelineLabels(startDateTime.format("HH:mm A"), closingTime.format("HH:mm A"), '30');
        return timesAvailable.map((time, index) => <MenuItem key={`menu-option${index}`} value={time}>{time}</MenuItem>);
    }

    render() {
        const {date, time, onChange} = this.props;
        const momentDate = date ? moment(date) : moment();
        const isClosed = closingTime.diff(momentDate, 'hours') < 3;

        const helperText = isWeekend(date) ? 'La fecha seleccionada es en fin de semana. Los fines de semana solamente aceptamos entregas por cita. Al enviar tu solicitud, nuestro equipo confirmará la entrega por correo electrónico.' : '';

        return (
            <div className={"mp-datetime-select"}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                        className={"mp-datetime-select-input"}
                        label={"Fecha"}
                        autoOk={true}
                        name={"date"}
                        fullWidth
                        inputVariant="outlined"
                        margin="normal"
                        id="date-picker-dialog"
                        format="dd-MM-yyyy"
                        minDate={new Date(date)}
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
                        variant="outlined"
                        name="time"
                        fullWidth
                        id="time-select"
                        value={time}
                        onChange={(e) => onChange(e.target.name, e.target.value)}
                    >
                        <MenuItem value="none" disabled>Selecciona una hora</MenuItem>
                        {this.getTimeOptions(isClosed)}
                    </Select>
                </React.Fragment>
            </div>
        );
    }
};

export default DateTimeSelect;
