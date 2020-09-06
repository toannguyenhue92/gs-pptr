const { addDays } = require('date-fns');

const convertToDateString = (s) => {
    const year = Number(s.substr(13, 4));
    const month = Number(s.substr(10, 2));
    const day = Number(s.substr(7, 2));
    const hour = Number(s.substr(0, 2));
    const minute = Number(s.substr(3, 2));
    const date = new Date(year, month - 1, day, hour, minute);
    return date.toISOString().slice(0, 19).replace('T', ' ');
}

const nextDateString = (s) => {
    const nextDate = addDays(new Date(s), 1);
    return nextDate.toISOString().substr(0, 10);
}

module.exports = dateHelper = { convertToDateString, nextDateString }