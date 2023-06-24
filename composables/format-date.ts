import moment from "moment"

export default function (date: any, type: number) {
    if (type === 1) return moment.unix(date).format('YYYY.MM.DD')
    else if (type === 2) return moment.unix(date).format('YYYY MMMM Do')
}