import React, { HTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'
import { displayTooltip } from './DynamicTable'
import classNames from 'classnames'

type TableBodyCellProps = {
  colSpan?: number
  align?: 'left' | 'right' | 'center' | 'justify' | 'char'
  isShortened?: boolean
  tooltipContent?: string
  showAlways?: boolean
  leadingContent?: boolean
  position?: number
  contentLength?: number
} & HTMLAttributes<HTMLTableCellElement>

export default function TableBodyCell(props: TableBodyCellProps)
{
  return (
    <td
      className={twMerge('p-2 text-secondary text-sm border-b-1 border-opacity-56 text-center', props.className, classNames({
        'z-20 left-0 sticky': props.leadingContent && props.position === 0,
        'z-20 left-[150px] sticky': props.leadingContent && props.position === 1,
        'truncate overflow-hidden text-ellipsis whitespace-nowrap': props.isShortened
      }))}
      colSpan={props.colSpan ?? 1}
      align={props.align}
      data-tooltip-id={'table-tooltip'}
      data-tooltip-content={displayTooltip(props.tooltipContent, props.showAlways, props.contentLength)}
    >
      {props.children}
    </td>
  )
}
