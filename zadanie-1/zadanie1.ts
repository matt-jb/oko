import moment from "moment";

export default function getExpirationDate(date: Date, status: boolean): Date {
  return moment
    .utc(date)
    .add({ months: status ? 1 : 0, days: status ? 0 : 5 })
    .toDate();
}

const date1 = new Date("2022-10-03T08:12:59Z");
const date2 = new Date("2022-01-31T08:12:59Z");
const now = new Date();

console.log(date1);
console.log(getExpirationDate(date1, true));
console.log(getExpirationDate(date1, false));
console.log(`-----------`);
console.log(date2);
console.log(getExpirationDate(date2, true));
console.log(getExpirationDate(date2, false));
console.log(`-----------`);
console.log(now);
console.log(getExpirationDate(now, true));
console.log(getExpirationDate(now, false));
