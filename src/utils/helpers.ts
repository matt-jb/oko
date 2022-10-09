import moment from "moment";
import { ITransaction } from "../types";

export const ENTRIES_PER_PAGE = 5;
export const CSV_DB_PATH = "./src/db/transactions.csv";

export function getExpirationDate(date: string, status: boolean): Date {
  return moment
    .utc(date)
    .add({ months: status ? 1 : 0, days: status ? 0 : 5 })
    .toDate();
}

export function formatTransactions(transactions: string): Array<ITransaction> {
  return transactions
    .split(" ")
    .join("")
    .split("\n")
    .reduce((prev: Array<ITransaction>, curr: string): Array<ITransaction> => {
      const [id, dateString] = curr.split(",");
      if (id === undefined || dateString === undefined) return [...prev]; // in case there are unnecessary line breaks in the csv file
      const date = dateString.replace(/(\r\n|\n|\r)/gm, "");
      return [...prev, { id, date }];
    }, []);
}

export function paginateArray<T>(entries: T[], pageIdx: number): T[] {
  const skip = pageIdx * ENTRIES_PER_PAGE;
  return entries.slice(skip, skip + ENTRIES_PER_PAGE);
}
