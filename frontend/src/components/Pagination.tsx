type PaginationProps = {
  page: number
  pageSize: number
  totalCount: number
  totalPages: number
  disabled: boolean
  onPageChange: (page: number) => void
  onPageSizeChange: (pageSize: number) => void
}

const buttonBase =
  'inline-flex h-9 min-w-9 items-center justify-center rounded-lg border px-3 text-sm font-medium focus-visible:ring-2 focus-visible:ring-[#C9B79A] disabled:cursor-not-allowed disabled:opacity-40'

export function Pagination({
  page,
  pageSize,
  totalCount,
  totalPages,
  disabled,
  onPageChange,
  onPageSizeChange,
}: PaginationProps) {
  const firstRow = totalCount === 0 ? 0 : (page - 1) * pageSize + 1
  const lastRow = Math.min(page * pageSize, totalCount)

  return (
    <div className="flex flex-col gap-3 border-t border-[#EFE6D6] px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-wrap items-center gap-4">
        <p className="text-xs text-[#7A6E60]">
          Showing <span className="font-semibold text-[#4A3F33]">{firstRow}–{lastRow}</span> of{' '}
          <span className="font-semibold text-[#4A3F33]">{totalCount}</span>
        </p>
        <label className="flex items-center gap-2 text-xs text-[#7A6E60]">
          Rows per page
          <select
            value={pageSize}
            disabled={disabled}
            onChange={(event) => onPageSizeChange(Number(event.target.value))}
            className="rounded-lg border border-[#E0D4BE] bg-[#FBF8F1] px-2 py-1 text-xs text-[#4A3F33] outline-none focus-visible:ring-2 focus-visible:ring-[#C9B79A] disabled:opacity-50"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
        </label>
      </div>

      <nav aria-label="Pagination" className="flex items-center gap-1.5">
        <button
          type="button"
          disabled={disabled || page === 1}
          onClick={() => onPageChange(page - 1)}
          className={`${buttonBase} border-[#D8CAB2] bg-[#FBF8F1] text-[#4A3F33]`}
        >
          Prev
        </button>

        {Array.from({ length: totalPages }).map((_slot, index) => {
          const number = index + 1
          const isActive = number === page

          return (
            <button
              key={number}
              type="button"
              aria-current={isActive ? 'page' : undefined}
              disabled={disabled}
              onClick={() => onPageChange(number)}
              className={`${buttonBase} ${
                isActive
                  ? 'border-[#4A3F33] bg-[#4A3F33] text-[#FBF8F1]'
                  : 'border-[#D8CAB2] bg-[#FBF8F1] text-[#4A3F33]'
              }`}
            >
              {number}
            </button>
          )
        })}

        <button
          type="button"
          disabled={disabled || page >= totalPages}
          onClick={() => onPageChange(page + 1)}
          className={`${buttonBase} border-[#D8CAB2] bg-[#FBF8F1] text-[#4A3F33]`}
        >
          Next
        </button>
      </nav>
    </div>
  )
}
