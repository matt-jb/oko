import moment from "moment";

export default function getExpirationDate(date: Date, status: boolean): Date {
  return moment
    .utc(date)
    .add({ months: status ? 1 : 0, days: status ? 0 : 5 })
    .toDate();
}