import Link from "next/link";

interface PaginationBarProps {
  currentPage: number;
  totalPages: number;
}

const PaginationBar = ({ currentPage, totalPages }: PaginationBarProps) => {
  const maxPage = Math.min(totalPages, Math.max(currentPage + 4), 10);
  const minPage = Math.max(1, Math.min(currentPage - 5, maxPage - 9));

  const numberPageItems: JSX.Element[] = [];
  for (let page = minPage; page <= maxPage; page++) {
    numberPageItems.push(
      <Link
        className={`btn join-item ${currentPage === page ? "btn-active pointer-events-none" : ""}`}
        href={`?page=${page}`}
        key={page}
      >
        {page}
      </Link>,
    );
  }

  return (
    <>
      <div className="join hidden sm:block">{numberPageItems}</div>
      <div className="join sm:hidden">
        {currentPage > 1 && (
          <Link href={`?page=${currentPage - 1}`} className="btn join-item">
            -
          </Link>
        )}
        <button className="btn join-item pointer-events-none">
          Page {currentPage}
        </button>
        {currentPage < totalPages && (
          <Link href={`?page=${currentPage + 1}`} className="btn join-item">
            +
          </Link>
        )}
      </div>
    </>
  );
};

export default PaginationBar;
