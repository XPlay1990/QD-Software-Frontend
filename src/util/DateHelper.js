import moment from 'moment';
import 'moment/locale/de';
import i18n from "i18next";

export function formatDate(dateString) {
    const date = new Date(dateString);

    const monthNames = [
        "January", "February", "March",
        "April", "May", "June", "July",
        "August", "September", "October",
        "November", "December"
    ];

    const monthIndex = date.getMonth();
    const year = date.getFullYear();

    return monthNames[monthIndex] + ' ' + year;
}

export function formatLocalDateTime(input) {
    const date = moment(input.join(),'YYYY,MM,DD,HH,mm,ss');
    return moment(date).locale(i18n.language).format('LL')
}