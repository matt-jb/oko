export interface ITransactionsRepository {
  getAllTransactions(): Promise<ITransaction[]>;
  getPaginatedTransactions(page: number): Promise<IPageInfo>;
  addTransaction(id: string, date: Date): Promise<ITransaction>;
  getSingleTransaction(id: string): Promise<ITransaction>;
}

export interface ITransactionsService {
  getAllTransactions(): Promise<ITransaction[]>;
  getPaginatedTransactions(page: number): Promise<IPage>;
  addTransaction(query: ITransactionBody): Promise<ITransactionSuccessResponse>;
  getSingleTransaction(id: string): Promise<ITransactionSuccessResponse>;
}

export interface ITransaction {
  id: string;
  date: string | Date;
}

export interface ITransactionSuccessResponse {
  success: boolean;
  data: ITransaction;
}

export interface IPageInfo {
  length: number;
  data: ITransaction[];
}

export interface IPage {
  page: number;
  lastPage: number;
  data: ITransaction[];
}

export interface ITransactionBody {
  id: string;
  date: string;
  status: boolean;
}
