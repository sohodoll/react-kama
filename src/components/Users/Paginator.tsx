import { FC, useState } from 'react'
import styles from './styles.module.css'
import { useEffect } from 'react'
import React from 'react'

type PaginatorProps = {
  totalUsersCount: number
  pageSize: number
  onPageChange: (page: number) => void
  currentPage: number
}

export const Paginator: FC<PaginatorProps> = ({ totalUsersCount, pageSize, onPageChange, currentPage }) => {
  const pagesCount = Math.floor(totalUsersCount / pageSize)
  const pages = []
  const portionSize = 10

  for (let i = 1; i <= pagesCount + 1; i++) {
    pages.push(i)
  }

  const portionCount = Math.ceil(pagesCount / portionSize)
  const [portionNumber, setPortionNumber] = useState<number>(1)
  const leftPortionNumber = (portionNumber - 1) * portionSize + 1
  const rightPortionNumber = portionNumber * portionSize

  useEffect(() => setPortionNumber(Math.ceil(currentPage / portionSize)), [currentPage])

  return (
    <div className={styles.paginationWrapper}>
      {portionNumber > 1 && (
        <button
          onClick={() => {
            setPortionNumber(portionNumber - 1)
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
                onPageChange(page)
              }}
              className={currentPage === page && styles.selected}
            >
              {page}
            </span>
          ))}
      </div>
      {portionCount > portionNumber && (
        <button
          onClick={() => {
            setPortionNumber(portionNumber + 1)
          }}
        >
          NEXT
        </button>
      )}
    </div>
  )
}
