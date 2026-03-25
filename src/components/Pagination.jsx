export default function Pagination({ page, total, perPage, onPageChange }) {
  const totalPages = Math.ceil(total / perPage);

  if (totalPages <= 1) return null;

  const getPages = () => {
    const delta = 2;
    const pages = [];
    const left  = page - delta;
    const right = page + delta;

    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= left && i <= right)) {
        pages.push(i);
      } else if (i === left - 1 || i === right + 1) {
        pages.push("...");
      }
    }
    return pages;
  };

  return (
    <div className="flex items-center justify-between flex-wrap gap-3 mt-2">

      <span className="text-sm text-base-content/50">
        Page {page} of {totalPages} &mdash; {total} total
      </span>

      <div className="join">
        <button className="join-item btn btn-sm" onClick={() => onPageChange(page - 1)} disabled={page === 1}> ← </button>

        {getPages().map((p, idx) => p === "..." ? ( 
          <button key={`ellipsis-${idx}`} className="join-item btn btn-sm btn-disabled"> … </button> ) : (
          <button key={p} className={`join-item btn btn-sm ${p === page ? "btn-primary" : ""}`} onClick={() => onPageChange(p)}> {p} </button>
          )
        )}

        <button className="join-item btn btn-sm" onClick={() => onPageChange(page + 1)} disabled={page === totalPages}>
          →
        </button>
      </div>
    </div>
  );
}