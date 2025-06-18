export type Pagination = {
  totalPages: number;
  currentPage: number | null;
  prevPage: number | null;
  nextPage: number | null;
  firstPage: number;
  lastPage: number;
};
