import moment from "moment"

export default function (date: any, type: number) {
    if (type === 1) return moment.unix(date).format('DD.MM.YYYY')
    else if (type === 2) return moment.unix(date).format('Do MMM YYYY')
}