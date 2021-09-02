import moment from "moment"

export function parseDate(date) {
  return moment(date).format("DD/MM/YYYY HH:mm")
}