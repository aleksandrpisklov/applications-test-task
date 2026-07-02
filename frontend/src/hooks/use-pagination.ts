import { useState } from "react";

export function usePagination(initialPerPage = 7) {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(initialPerPage);

  const handlePageChange = (nextPage: number) => {
    setPage(Math.max(1, nextPage));
  };

  const handlePerPageChange = (nextPerPage: number) => {
    setPerPage(nextPerPage);
    setPage(1);
  };

  return {
    page,
    setPage: handlePageChange,
    perPage,
    setPerPage: handlePerPageChange,
  };
}
