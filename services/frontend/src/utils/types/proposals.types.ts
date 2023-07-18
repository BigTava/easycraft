export type Proposal = {
  id: number;
  title: string;
  description: string;
  status: "Active" | "Executed";
  result: "Pending" | "Failed" | "Passed";
};

export type Filters = {
  result: "All" | "Pending" | "Failed" | "Passed";
  searchTitle: string;
};
