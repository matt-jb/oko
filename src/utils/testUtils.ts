export function mockReadFile(_: any, __: any) {
  return Promise.resolve(mockDb);
}

export function mockAppendFile(_: any, __: any) {
  return Promise.resolve();
}

export const mockDb = `1,2020-06-21T01:08:45.307Z
2,1993-11-08T08:15:12.691Z
3,2016-07-17T21:44:57.876Z
4,2010-05-01T17:58:48.471Z
5,1991-08-15T06:16:18.163Z
6,2003-05-30T21:17:03.486Z
7,2003-09-05T23:22:13.765Z
8,2010-05-15T11:34:21.941Z
9,2001-09-09T09:53:16.913Z`;

export const mockAllRepoTransactions = [
  { date: "2020-06-21T01:08:45.307Z", id: "1" },
  { date: "1993-11-08T08:15:12.691Z", id: "2" },
  { date: "2016-07-17T21:44:57.876Z", id: "3" },
  { date: "2010-05-01T17:58:48.471Z", id: "4" },
  { date: "1991-08-15T06:16:18.163Z", id: "5" },
  { date: "2003-05-30T21:17:03.486Z", id: "6" },
  { date: "2003-09-05T23:22:13.765Z", id: "7" },
  { date: "2010-05-15T11:34:21.941Z", id: "8" },
  { date: "2001-09-09T09:53:16.913Z", id: "9" },
];

export const mockPaginatedRepoTransactions = {
  length: 9,
  data: [
    { id: "1", date: "2020-06-21T01:08:45.307Z" },
    { id: "2", date: "1993-11-08T08:15:12.691Z" },
    { id: "3", date: "2016-07-17T21:44:57.876Z" },
    { id: "4", date: "2010-05-01T17:58:48.471Z" },
    { id: "5", date: "1991-08-15T06:16:18.163Z" },
  ],
};

export const mockAllServiceTransactions = [
  {
    id: "1",
    date: "2020-06-21T01:08:45.307Z",
  },
  {
    id: "2",
    date: "1993-11-08T08:15:12.691Z",
  },
  {
    id: "3",
    date: "2016-07-17T21:44:57.876Z",
  },
  {
    id: "4",
    date: "2010-05-01T17:58:48.471Z",
  },
  {
    id: "5",
    date: "1991-08-15T06:16:18.163Z",
  },
  {
    id: "6",
    date: "2003-05-30T21:17:03.486Z",
  },
  {
    id: "7",
    date: "2003-09-05T23:22:13.765Z",
  },
  {
    id: "8",
    date: "2010-05-15T11:34:21.941Z",
  },
  {
    id: "9",
    date: "2001-09-09T09:53:16.913Z",
  },
];

export const mockPaginatedServiceTransactions = {
  page: 0,
  lastPage: 1,
  data: [
    {
      id: "1",
      date: "2020-06-21T01:08:45.307Z",
    },
    {
      id: "2",
      date: "1993-11-08T08:15:12.691Z",
    },
    {
      id: "3",
      date: "2016-07-17T21:44:57.876Z",
    },
    {
      id: "4",
      date: "2010-05-01T17:58:48.471Z",
    },
    {
      id: "5",
      date: "1991-08-15T06:16:18.163Z",
    },
  ],
};
