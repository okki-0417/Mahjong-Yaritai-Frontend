export type Pagination = {
  total_pages: number;
  current_page: number | null;
  prev_page: number | null;
  next_page: number | null;
  first_page: number;
  last_page: number;
};
