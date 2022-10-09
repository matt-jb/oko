import { createExpressServer } from "routing-controllers";
import { TransactionsController } from "./controllers/TransactionsController";
import "reflect-metadata";

const app = createExpressServer({
  controllers: [TransactionsController],
});

app.listen(3000);
