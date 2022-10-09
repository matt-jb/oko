import { HttpError } from "routing-controllers";
import {
  ITransactionBody,
  ITransactionsRepository,
  ITransactionsRepositoryOptions,
  ITransactionsService,
} from "../types";
import { ENTRIES_PER_PAGE, getExpirationDate } from "../utils/helpers";
import Validator from "../utils/Validator";

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

    const lastPage = Math.floor((length - 1) / ENTRIES_PER_PAGE);

    if (page > lastPage)
      throw new HttpError(400, `The last page is ${lastPage}`);

    if (page < 0 || data.length === 0)
      throw new HttpError(400, `Invalid page number`);

    return {
      page,
      lastPage,
      data,
    };
  }

  public async getSingleTransaction(id: string) {
    Validator.toCheck(id, "id").isProvided().isNotEmpty().clean();

    const transaction = await this._transRepo.getSingleTransaction(id);
    return {
      success: true,
      data: transaction,
    };
  }

  public async addTransaction(query: ITransactionBody) {
    const { id, date, status } = query;
    Validator.toCheck(id, "id").isProvided().isNotEmpty().clean();
    Validator.toCheck(date, "date").isProvided().isNotEmpty().isDate().clean();
    Validator.toCheck(status, "status").isProvided().isBool().clean();

    const expirationDate = getExpirationDate(date, status);
    const transaction = await this._transRepo.addTransaction(
      id,
      expirationDate
    );

    return {
      success: true,
      data: transaction,
    };
  }
}
