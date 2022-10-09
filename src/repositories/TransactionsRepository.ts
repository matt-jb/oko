import { ITransactionsRepository } from "../types";
import {
  CSV_DB_PATH,
  formatTransactions,
  paginateArray,
} from "../utils/helpers";
import fs from "fs";
import { promisify } from "util";
import { HttpError } from "routing-controllers";

const readFileAsync = promisify(fs.readFile);
const appendFileAsync = promisify(fs.appendFile);

export class TransactionsRepository implements ITransactionsRepository {
  public async getAllTransactions() {
    const transactionString = await readFileAsync(CSV_DB_PATH, "utf8").catch(
      (err) => {
        throw new HttpError(500, `Error reading CSV file: ${err.message}`);
      }
    );
    return formatTransactions(transactionString);
  }

  public async getPaginatedTransactions(page: number) {
    const allTransactions = await this.getAllTransactions();
    const pageTransactions = paginateArray(allTransactions, page);
    return { length: allTransactions.length, data: pageTransactions };
  }

  public async addTransaction(id: string, date: Date) {
    const allTransactions = await this.getAllTransactions();
    const isTaken =
      allTransactions.findIndex((el) => el.id === id) === -1 ? false : true;

    if (isTaken) throw new HttpError(403, `ID ${id} already exists.`);

    appendFileAsync(CSV_DB_PATH, `\r\n${id},${date.toISOString()}`).catch(
      (err) => {
        throw new HttpError(500, `Error writing CSV file: ${err.message}`);
      }
    );

    return { id, date };
  }

  public async getSingleTransaction(id: string) {
    const allTransactions = await this.getAllTransactions();

    const Idx = allTransactions.findIndex((el) => el.id === id);

    if (Idx === -1)
      throw new HttpError(404, `Transaction with the id of ${id} not found.`);

    return allTransactions[Idx];
  }
}
