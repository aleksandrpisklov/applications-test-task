import { PAGE_SIZE_OPTIONS } from "../constants/page-size-options";
import { Pagination } from "../ui/pagination";
import { Select } from "../ui/select";

export function PaginationFooter({
  page,
  perPage,
  totalPages,
  totalItems,
  onPageChange,
  onPerPageChange,
}: {
  page: number;
  perPage: number;
  totalPages: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  onPerPageChange: (perPage: number) => void;
}) {
  const start = totalItems === 0 ? 0 : (page - 1) * perPage + 1;
  const end = totalItems === 0 ? 0 : Math.min(page * perPage, totalItems);

  function handlePageClick({ selected }: { selected: number }) {
    onPageChange(selected + 1);
  }

  return (
    <div className="border-border flex items-center justify-between gap-3 border-t px-5 py-3">
      <div className="flex items-center gap-2">
        <span className="text-muted-foreground text-xs">
          Строк на странице:
        </span>
        <Select
          value={String(perPage)}
          options={Object.fromEntries(
            PAGE_SIZE_OPTIONS.map((n) => [String(n), String(n)]),
          )}
          onChange={(value) => onPerPageChange(Number(value))}
          className="py-0.75 pr-9 pl-2"
        />
      </div>

      <div className="flex items-center gap-3">
        <span className="text-muted-foreground font-mono text-xs">
          {start}–{end} / {totalItems}
        </span>
        <Pagination
          forcePage={page - 1}
          pageCount={Math.max(totalPages, 1)}
          onPageChange={handlePageClick}
        />
      </div>
    </div>
  );
}
