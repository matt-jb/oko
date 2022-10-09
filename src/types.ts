import { HttpError } from "routing-controllers";

export interface ITransactionsRepository {
  getAllTransactions(): Promise<ITransaction[]>;
  getPaginatedTransactions(page: number): Promise<IPageInfo>;
}

export interface ITransactionsRepositoryOptions {
  transactionsRepository: ITransactionsRepository;
}

export interface ITransactionsService {
  getAllTransactions(): Promise<ITransaction[]>;
  getPaginatedTransactions(page: number): Promise<IPage | HttpError>;
}

export interface ITransactionsServiceOptions {
  transactionsService: ITransactionsService;
}

export interface ITransaction {
  id: string;
  date: string;
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

export interface IPaginateArraySettings {
  pageIdx: number;
  entriesPerPage: number;
}
