import { ITransactionsRepository } from "../types";
import { formatTransactions, paginateArray } from "../helpers/helpers";

export class TransactionsRepository implements ITransactionsRepository {
  private _transactionsContents = `1,2020-06-21T01:08:45.307Z
      2,1993-11-08T08:15:12.691Z
      3,2016-07-17T21:44:57.876Z
      4,2010-05-01T17:58:48.471Z
      5,1991-08-15T06:16:18.163Z
      6,2003-05-30T21:17:03.486Z
      7,2003-09-05T23:22:13.765Z
      8,2010-05-15T11:34:21.941Z
      9,2001-09-09T09:53:16.913Z
      10,1999-11-20T10:19:15.298Z
      11,1996-09-13T11:38:30.434Z
      12,1999-10-10T22:11:24.977Z
      13,2007-10-23T10:08:10.292Z
      14,2018-04-11T01:16:48.950Z
      15,1999-03-02T03:23:12.608Z
    `;

  public async getAllTransactions() {
    return formatTransactions(this._transactionsContents);
  }

  public async getPaginatedTransactions(page: number) {
    const allTransactions = formatTransactions(this._transactionsContents);
    const pageTransactions = paginateArray(allTransactions, page);
    return { length: allTransactions.length, data: pageTransactions };
  }
}
