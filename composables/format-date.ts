import moment from "moment"

export default function (date: string, type: number) {
    if (type === 1) return moment(date).format('YYYY.MM.DD')
    else if (type === 2) return moment(date).format('YYYY MMMM Do')
}