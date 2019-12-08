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
    const date = new Date(parseInt(input[0]), parseInt(input[1])-1, parseInt(input[2]), parseInt(input[3]), parseInt(input[4]), parseInt(input[5]));
    return date.toDateString()
}  