import _ReactPaginate, { type ReactPaginateProps } from "react-paginate";
import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * ХАК ДЛЯ СОВМЕСТИМОСТИ МОДУЛЕЙ (Vite + CommonJS)
 *
 * ПОЧЕМУ ТАК: Библиотека react-paginate экспортируется по старому стандарту (CommonJS),
 * а Vite ожидает современный ES-модуль. Из-за этого при обычном импорте вместо компонента-функции
 * в рантайме прилетает объект `{ default: Component }`. React падает с ошибкой: "expected a string... but got: object".
 *
 * ЧТО ТУТ ПРОИСХОДИТ:
 * 1. Мы временно приводим импорт к `unknown`, чтобы TypeScript разрешил нам проверить свойство `.default`.
 * 2. Если `.default` существует (баг Vite/сборщика) — берем его. Если библиотека импортировалась нормально — берем её целиком.
 * 3. Возвращаем компоненту его оригинальный строгий тип `typeof _ReactPaginate`, чтобы сохранить автокомплит и пропсы.
 */
const ReactPaginate =
  (_ReactPaginate as unknown as { default?: typeof _ReactPaginate }).default ??
  _ReactPaginate;

interface AppPaginationProps extends Partial<ReactPaginateProps> {
  pageCount: number;
}

export const Pagination = ({
  forcePage,
  pageCount,
  onPageChange,
  ...restProps
}: AppPaginationProps) => {
  return (
    <ReactPaginate
      forcePage={forcePage}
      pageCount={Math.max(pageCount, 1)}
      onPageChange={onPageChange}
      pageRangeDisplayed={1}
      marginPagesDisplayed={1}
      previousLabel={<ChevronLeft className="h-3.5 w-3.5" />}
      nextLabel={<ChevronRight className="h-3.5 w-3.5" />}
      breakLabel="…"
      renderOnZeroPageCount={null}
      containerClassName="flex items-center gap-1"
      pageClassName="flex"
      pageLinkClassName="text-muted-foreground hover:text-foreground hover:bg-secondary flex h-7 w-7 items-center justify-center rounded-md font-mono text-xs transition"
      activeLinkClassName="bg-primary text-primary-foreground"
      previousClassName="flex"
      previousLinkClassName="text-muted-foreground hover:text-foreground hover:bg-secondary flex h-7 w-7 items-center justify-center rounded-md transition"
      nextClassName="flex"
      nextLinkClassName="text-muted-foreground hover:text-foreground hover:bg-secondary flex h-7 w-7 items-center justify-center rounded-md transition"
      breakClassName="flex"
      breakLinkClassName="text-muted-foreground flex h-7 w-7 items-center justify-center text-xs"
      disabledClassName="opacity-30 pointer-events-none"
      {...restProps}
    />
  );
};
