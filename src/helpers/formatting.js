import moment from 'moment';

export function parseDataKeyNames(data) {
    const keys = Object.keys(data);
    if (keys.length) {
        Object.keys(data).forEach((key) => {
            if (!isNaN(key)) {
                delete data[key];
            }
        });

        return data;
    }
}

export function formatData(data, formatter) {
    console.log(data);
    return data ? data.map((object) => formatter(object)) : [];
}

export function getDataKeys(data) {
    let keys = data ? Object.keys(data) : [];

    if (keys.length) {
        return keys.map((key) => {
            if (!isNaN(key)) {
                return false;
            }

            key = key.replace('_', ' ').trim();
            return {
                id: key,
                label: `${key.charAt(0).toUpperCase()}${key.slice(1)}`,
            };
        });
    }

    return keys;
}

export function truncateMiddleOfString(string, charCountStart = 4, charCountEnd = 4) {
    let start = string.substring(0, charCountStart);
    let end = string.substring(string.length - charCountEnd, string.length);
    return `${start}....${end}`
}

export function formatInventoryData(data, keys) {
    return formatData(data, (data) => {
        console.log('DATA!', data);
        let formattedData = formatDataKey(parseDataKeyNames(data), 'traking', (string) => {
            return truncateMiddleOfString(string, );
        });

        return showOnlyColumnsInData(keys, formattedData);
    });
}

export function formatDataKey(data, keyToFormat, formatter) {
    let keys = Object.keys(data);
    keys.forEach((key) => {
        if (key === keyToFormat) {
            data[key] = formatter(data[key]);
        }
    });

    return data;
}

export function showOnlyColumnsInData(columnsToShow, data) {
    const formattedData = {};
    console.log('columnsToShow', columnsToShow)

    if (columnsToShow.length > 0) {
        columnsToShow.forEach((key) => {
            if (key in data) {
                formattedData[key] = data[key];
            }
        });

        return formattedData;
    }

    return data;
}

export function timelineLabels(start, end, interval) {
    const startTime = moment(start, 'HH:mm A');
    const endTime = moment(end, 'HH:mm A');
    const timeStops = [];

    while (startTime <= endTime) {
        timeStops.push(new moment(startTime).format('hh:mm A'));
        startTime.add(interval, 'minutes');
    }
    return timeStops;
};

export function getSpanishMonthName(monthNumber) {
    const months = {
        '01': 'Enero',
        '02': 'Febrero',
        '03': 'Marzo',
        '04': 'Abril',
        '05': 'Mayo',
        '06': 'Junio',
        '07': 'Julio',
        '08': 'Agosto',
        '09': 'Septiembre',
        '10': 'Octubre',
        '11': 'Noviembre',
        '12': 'Diciembre'
    };
    return months[monthNumber] || 'Invalid month';
}