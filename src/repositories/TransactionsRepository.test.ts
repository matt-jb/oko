import fs from "fs/promises";
import { HttpError } from "routing-controllers";
import {
  mockReadFile,
  mockAllRepoTransactions,
  mockPaginatedRepoTransactions,
  mockAppendFile,
} from "../utils/testUtils";
import TransactionsRepository from "./TransactionsRepository";

jest.spyOn(fs, "readFile").mockImplementation(mockReadFile);
jest.spyOn(fs, "appendFile").mockImplementation(mockAppendFile);

describe("Repository works as expected", () => {
  it("Retrieves all data", async () => {
    const res = await TransactionsRepository.getAllTransactions();
    const expectedLength = 9;

    expect(res.length).toBe(expectedLength);
    expect(res).toEqual(mockAllRepoTransactions);
  });

  it("Retrieves paginated data", async () => {
    const pageZero = await TransactionsRepository.getPaginatedTransactions(0);

    const expectedLength = 9;
    const expectedPageZeroLength = 5;

    expect(pageZero.length).toBe(expectedLength);
    expect(pageZero.data.length).toBe(expectedPageZeroLength);
    expect(pageZero).toEqual(mockPaginatedRepoTransactions);

    const pageOne = await TransactionsRepository.getPaginatedTransactions(1);
    const expectedPageOneLength = 4;

    expect(pageOne.length).toBe(expectedLength);
    expect(pageOne.data.length).toBe(expectedPageOneLength);
  });

  it("Returns added transaction", async () => {
    const id = "123";
    const date = new Date();

    const transaction = await TransactionsRepository.addTransaction(id, date);

    expect(transaction.id).toBe(id);
    expect(transaction.date).toBe(date);
  });

  it("Returns single transaction", async () => {
    const { id, date } = mockAllRepoTransactions[0];

    const transaction = await TransactionsRepository.getSingleTransaction(id);

    expect(transaction.id).toBe(id);
    expect(transaction.date).toBe(date);
  });

  it("Throws the correct errors", async () => {
    const id = "1";
    const date = new Date();
    const nonExistantId = "foo";

    await TransactionsRepository.addTransaction(id, date).catch((error) => {
      expect(error).toBeInstanceOf(HttpError);
      expect(error).toHaveProperty("httpCode", 403);
      expect(error.message).toBe(`ID ${id} already exists`);
    });

    await TransactionsRepository.getSingleTransaction(nonExistantId).catch(
      (error) => {
        expect(error).toBeInstanceOf(HttpError);
        expect(error).toHaveProperty("httpCode", 404);
        expect(error.message).toBe(
          `Transaction with the id of ${nonExistantId} not found`
        );
      }
    );
  });
});
