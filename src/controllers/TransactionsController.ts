import { JsonController, Get, Param, Post, Req } from "routing-controllers";
import { TransactionsRepository } from "../repositories/TransactionsRepository";
import { TransactionsService } from "../services/TransactionsService";

const transactionsRepository = new TransactionsRepository();
const transactionsService = new TransactionsService({ transactionsRepository });

@JsonController()
export class TransactionsController {
  @Get("/transactions")
  getAll() {
    return transactionsService.getAllTransactions();
  }

  @Get("/transactions/page/:page")
  getPage(@Param("page") page: number) {
    return transactionsService.getPaginatedTransactions(page);
  }

  // @Post("/users")
  // post(@Req() request: Request) {
  //   logic goes here
  // }
}
