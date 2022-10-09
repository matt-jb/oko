import { JsonController, Get, Param, Post, Body } from "routing-controllers";
import { TransactionsRepository } from "../repositories/TransactionsRepository";
import { TransactionsService } from "../services/TransactionsService";
import { ITransactionBody } from "../types";

@JsonController()
export class TransactionsController {
  @Get("/transactions")
  getAll() {
    return transactionsService.getAllTransactions();
  }

  @Get("/transactions/page/:page")
  getPage(@Param("page") page: string) {
    return transactionsService.getPaginatedTransactions(parseInt(page));
  }

  @Get("/transaction/:id")
  getById(@Param("id") id: string) {
    return transactionsService.getSingleTransaction(id);
  }

  @Post("/transaction")
  postTransaction(@Body() query: ITransactionBody) {
    return transactionsService.addTransaction(query);
  }
}

const transactionsRepository = new TransactionsRepository();
const transactionsService = new TransactionsService({ transactionsRepository });
