import fs from "fs/promises";
import { HttpError } from "routing-controllers";
import {
  mockAllServiceTransactions,
  mockAppendFile,
  mockPaginatedServiceTransactions,
  mockReadFile,
} from "../utils/testUtils";
import TransactionsService from "./TransactionsService";

jest.spyOn(fs, "readFile").mockImplementation(mockReadFile);
jest.spyOn(fs, "appendFile").mockImplementation(mockAppendFile);

describe("Service works as expected", () => {
  it("Retrieves all data", async () => {
    const res = await TransactionsService.getAllTransactions();
    const expectedLength = 9;

    expect(res.length).toBe(expectedLength);
    expect(res).toEqual(mockAllServiceTransactions);
  });

  it("Retrieves paginated data", async () => {
    const pageZero = await TransactionsService.getPaginatedTransactions(0);
    const expectedPageZeroLength = 5;
    const expectedLastPage = 1;

    expect(pageZero.data.length).toBe(expectedPageZeroLength);
    expect(pageZero.lastPage).toBe(expectedLastPage);
    expect(pageZero).toEqual(mockPaginatedServiceTransactions);

    const pageOne = await TransactionsService.getPaginatedTransactions(1);
    const expectedPageOneLength = 4;

    expect(pageOne.data.length).toBe(expectedPageOneLength);
  });

  it("Returns added transaction", async () => {
    const id = "123";
    const date = "2016-07-17T21:44:57.876Z";
    const dateInOneMonth = "2016-08-17T21:44:57.876Z";
    const status = true;

    const transaction = await TransactionsService.addTransaction({
      id,
      date,
      status,
    });

    expect(transaction.success).toBe(true);
    const transactionDate = transaction.data.date as Date;
    expect(transactionDate.toISOString()).toBe(dateInOneMonth);
  });

  it("Returns single transaction", async () => {
    const { id, date } = mockAllServiceTransactions[0];

    const transaction = await TransactionsService.getSingleTransaction(id);

    expect(transaction.success).toBe(true);
    expect(transaction.data).toEqual({ id, date });
  });
});

describe("Every method returns the correct errors", () => {
  test("addTransaction errors", async () => {
    const id = "1";
    const date = "2016-07-17T21:44:57.876Z";
    const status = true;

    await TransactionsService.addTransaction({ id, date, status }).catch(
      (error) => {
        expect(error).toBeInstanceOf(HttpError);
        expect(error).toHaveProperty("httpCode", 403);
        expect(error.message).toBe(`ID ${id} already exists`);
      }
    );
  });

  test("getSingleTransaction errors", async () => {
    const nonExistantId = "foo";

    await TransactionsService.getSingleTransaction(nonExistantId).catch(
      (error) => {
        expect(error).toBeInstanceOf(HttpError);
        expect(error).toHaveProperty("httpCode", 404);
        expect(error.message).toBe(
          `Transaction with the id of ${nonExistantId} not found`
        );
      }
    );
  });

  test("getPaginatedTransactions errors", async () => {
    const nonExistantPage = 123;
    const invalidPage = -1;
    const actualLastPage = 1;

    await TransactionsService.getPaginatedTransactions(nonExistantPage).catch(
      (error) => {
        expect(error).toBeInstanceOf(HttpError);
        expect(error).toHaveProperty("httpCode", 400);
        expect(error.message).toBe(`The last page is ${actualLastPage}`);
      }
    );

    await TransactionsService.getPaginatedTransactions(invalidPage).catch(
      (error) => {
        expect(error).toBeInstanceOf(HttpError);
        expect(error).toHaveProperty("httpCode", 400);
        expect(error.message).toBe(`Invalid page number`);
      }
    );
  });
});
