import React from 'react';
import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import {MenuItem, Select} from "@material-ui/core";
import {timelineLabels} from "../helpers/formatting";
import moment from 'moment';

class DateTimeSelect extends React.Component {

    getTimeOptions() {
        const timesAvailable = timelineLabels('09:30 AM', '04:30 PM', '30');
        return timesAvailable.map((time, index) => <MenuItem key={`menu-option${index}`} value={time}>{time}</MenuItem>);
    }

    render() {
        const today = moment().format('DD-MM-YYYY');
        const {date, time, onChange} = this.props;
        return (
            <div className={"mp-datetime-select"}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <label>Día</label>
                    <KeyboardDatePicker
                        name={"date"}
                        fullWidth
                        margin="normal"
                        id="date-picker-dialog"
                        format="dd-MM-yyyy"
                        minDate={today}
                        value={date}
                        onChange={(value) =>  onChange('date',  moment(value).format('DD-MM-YYYY'))}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                </MuiPickersUtilsProvider>
                <React.Fragment>
                    <label>Hora</label>
                    <Select
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
