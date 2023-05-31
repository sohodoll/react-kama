import { useState } from 'react';
import styles from './styles.module.css';
import { useEffect } from 'react';

export const Paginator = (props) => {
  const pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
  const pages = [];
  const portionSize = 10;

  console.log(props);

  for (let i = 1; i <= pagesCount + 1; i++) {
    pages.push(i);
  }

  const portionCount = Math.ceil(pagesCount / portionSize);
  const [portionNumber, setPortionNumber] = useState(1);
  const leftPortionNumber = (portionNumber - 1) * portionSize + 1;
  const rightPortionNumber = portionNumber * portionSize;

  useEffect(() => setPortionNumber(Math.ceil(props.currentPage / portionSize)), [props.currentPage]);

  return (
    <div className={styles.paginationWrapper}>
      {portionNumber > 1 && (
        <button
          onClick={() => {
            setPortionNumber(portionNumber - 1);
          }}
        >
          PREV
        </button>
      )}
      <div className={styles.pagination}>
        {pages
          .filter((page) => page >= leftPortionNumber && page <= rightPortionNumber)
          .map((page) => (
            <span
              onClick={(e) => {
                props.onPageChange(page);
              }}
              className={props.currentPage === page && styles.selected}
            >
              {page}
            </span>
          ))}
      </div>
      {portionCount > portionNumber && (
        <button
          onClick={() => {
            setPortionNumber(portionNumber + 1);
          }}
        >
          NEXT
        </button>
      )}
    </div>
  );
};
