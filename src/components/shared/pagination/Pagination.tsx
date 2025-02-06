import { DOTS, usePagination } from '@/hooks/utils/usePagination'
import { HTMLAttributes } from 'react'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { twMerge } from 'tailwind-merge'
import { PaginatedList } from '@/types/api'

export type PaginationProps = {
  list: PaginatedList<unknown>
  onPageChange: (page: number) => void
} & HTMLAttributes<HTMLDivElement>

export default function Pagination(props: PaginationProps) {
  const paginationRange = usePagination({
    page: props.list.page,
    limit: props.list.limit,
    total: props.list.total,
  })
  const lastPage = paginationRange[paginationRange.length - 1]

  // If there are less than 2 times in pagination range we shall not render the component
  if (props.list.page === 0 || paginationRange.length < 2) {
    return null
  }

  const onNext = () => {
    props.onPageChange(Math.min(props.list.page + 1, lastPage))
  }

  const onPrevious = () => {
    props.onPageChange(Math.max(props.list.page - 1, 1))
  }

  const itemClass =
    'text-sm text-slate-700 font-medium rounded px-3 py-1.5 bg-transparent cursor-pointer hover:bg-primary/10 transition duration-300'
  const arrowClass = 'flex justify-center items-center'
  const dotsClass = 'cursor-default'
  const selectedClass = 'text-primary bg-primary/10'
  const disabledClass = 'text-slate-400 cursor-default hover:bg-transparent'
  const iconSize = 18

  return (
    <ul
      className={twMerge(
        'flex w-full items-stretch justify-end gap-x-1 rounded-lg bg-white/50 px-6 py-3',
        props.className
      )}
    >
      {/* Left navigation arrow */}
      <li className={twMerge(itemClass, arrowClass, props.list.page === 1 ? disabledClass : '')} onClick={onPrevious}>
        <FiChevronLeft size={iconSize} />
      </li>
      {paginationRange.map((pageNumber, i) => {
        // If the pageItem is a DOT, render the DOTS unicode character
        if (pageNumber === DOTS) {
          return (
            <li key={`page-${i}`} className={twMerge(itemClass, dotsClass)}>
              &#8230;
            </li>
          )
        }

        // Render our Page Pills
        return (
          <li
            key={`page-${i}`}
            className={twMerge(itemClass, pageNumber === props.list.page ? selectedClass : '')}
            onClick={() => props.onPageChange(pageNumber)}
          >
            {pageNumber}
          </li>
        )
      })}
      {/*  Right Navigation arrow */}
      <li
        className={twMerge(itemClass, arrowClass, props.list.page === lastPage ? disabledClass : '')}
        onClick={onNext}
      >
        <FiChevronRight size={iconSize} />
      </li>
    </ul>
  )
}
