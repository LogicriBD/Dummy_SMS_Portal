import React, { HTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'
import { displayTooltip } from './DynamicTable'
import classNames from 'classnames'

type TableHeaderCellProps = {
  label: string
  align?: 'left' | 'right' | 'center' | 'justify' | 'char'
  colSpan?: number
  isShortened?: boolean
  tooltipContent?: string
  leadingContent?: boolean
  position?: number
  contentLength?: number
  showAlways?: boolean
} & HTMLAttributes<HTMLTableColElement>

export default function TableHeaderCell(props: TableHeaderCellProps)
{
  return (
    <th
      align={props.align}
      className={twMerge(' min-w-full bg-gray-100 z-20 px-4 py-2 text-secondary font-semibold text-sm border-b-1 text-center', props.className, classNames({
        'z-40 left-0 sticky': props.leadingContent && props.position === 0,
        'z-40 left-[150px] sticky': props.leadingContent && props.position === 1,
        'truncate overflow-hidden text-ellipsis whitespace-nowrap': props.isShortened
      }))}
      colSpan={props.colSpan ?? 1}
      data-tooltip-id={'table-tooltip'}
      data-tooltip-content={displayTooltip(props.tooltipContent, props.showAlways, props.contentLength)}
    >
      {props.children ?? props.label}
    </th>
  )
}
