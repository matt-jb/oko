import { HttpError } from "routing-controllers";
import {
  ITransaction,
  ITransactionsRepository,
  ITransactionsRepositoryOptions,
  ITransactionsService,
} from "../types";

export class TransactionsService implements ITransactionsService {
  private readonly _transRepo: ITransactionsRepository;

  constructor({ transactionsRepository }: ITransactionsRepositoryOptions) {
    this._transRepo = transactionsRepository;
  }

  public async getAllTransactions() {
    const transactions = await this._transRepo.getAllTransactions();
    return transactions;
  }

  public async getPaginatedTransactions(page: number) {
    const { length, data } = await this._transRepo.getPaginatedTransactions(
      page
    );
    const entriesPerPage = 5;

    const lastPage = Math.floor((length - 1) / entriesPerPage);

    if (page > lastPage)
      throw new HttpError(400, `The last page is ${lastPage}.`);

    if (page < 0) throw new HttpError(400, `You can't view a negative page.`);

    return {
      page,
      lastPage,
      data,
    };
  }

  public async addTransaction(transaction: ITransaction) {
    return transaction;
  }
}
