import { JsonController, Get, Param, Post, Body } from "routing-controllers";
import TransactionsService from "../services/TransactionsService";
import { ITransactionBody } from "../types";

@JsonController()
export class TransactionsController {
  @Get("/transactions")
  getAll() {
    return TransactionsService.getAllTransactions();
  }

  @Get("/transactions/page/:page")
  getPage(@Param("page") page: string) {
    return TransactionsService.getPaginatedTransactions(parseInt(page));
  }

  @Get("/transaction/:id")
  getById(@Param("id") id: string) {
    return TransactionsService.getSingleTransaction(id);
  }

  @Post("/transaction")
  postTransaction(@Body() query: ITransactionBody) {
    return TransactionsService.addTransaction(query);
  }
}
