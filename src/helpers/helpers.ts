import { IPaginateArraySettings, ITransaction } from "../types";

export function formatTransactions(transactions: string): Array<ITransaction> {
  return transactions
    .split(" ")
    .join("")
    .split("\n")
    .reduce((prev: Array<ITransaction>, curr: string): Array<ITransaction> => {
      const [id, date] = curr.split(",");
      if (id === undefined || date === undefined) return [...prev]; // in case there are line breaks in the csv file
      return [...prev, { id, date }];
    }, []);
}

export function paginateArray<T>(entries: T[], pageIdx: number): T[] {
  const entriesPerPage = 5;
  const skip = pageIdx * entriesPerPage;
  return entries.slice(skip, skip + entriesPerPage);
}
