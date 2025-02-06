import classNames from 'classnames'
import { HTMLAttributes, ReactElement } from 'react'
import { Tooltip } from 'react-tooltip'
import { twMerge } from 'tailwind-merge'

export type TableColumn = {
  label: string
  styles?: string
  align?: 'left' | 'right' | 'center' | 'justify' | 'char'
}

type DynamicTableProps<DataType> = {
  columns: TableColumn[]
  data: DataType[]
  renderParentColumnRow?: () => ReactElement
  renderColumnCell: (column: TableColumn, index: number) => ReactElement
  renderDataRow: (row: DataType, index: number) => ReactElement
  isLoading?: boolean
  renderLoader?: () => ReactElement
  renderEmpty?: () => ReactElement
  hasTooltip?: boolean
  containerDivStyle?: string
  tooltipTable?: boolean
  stickyHeader?: boolean
} & HTMLAttributes<HTMLTableElement>

export default function DynamicTable<DataType>(props: DynamicTableProps<DataType>)
{
  const isTableEmpty = !props.isLoading && !props.data.length
  const hasParentColumns = !!props.renderParentColumnRow
  return (
    <div className={twMerge('w-full relative', props.containerDivStyle)}>
      <Tooltip
        id={'table-tooltip'}
        place={'top-end'}
        className="z-50 max-w-[40ch] break-words whitespace-normal text-left leading-6 p-2"
      />

      <table className={twMerge('w-full bg-white rounded-xl border-separate px-10 pb-10 pt-5', props.className)}>
        {!isTableEmpty && props.renderParentColumnRow != null && (
          <thead
            className={
              classNames(
                {
                  'sticky top-0 z-30 w-full': props.stickyHeader
                }
              )
            }
          >
            <tr className={twMerge('w-full bg-gray-100 rounded-t-xl z-30')}
            >{props.renderParentColumnRow()}</tr>
          </thead>
        )}
        {!isTableEmpty && (
          <thead
            className={classNames(
              {
                'sticky top-0 rounded-t-xl z-30': props.stickyHeader && !hasParentColumns,
                'sticky top-9 z-30': props.stickyHeader && hasParentColumns
              }
            )}
          >
            <tr className={twMerge('w-full bg-gray-100')}>{props.columns.map((col, ind) => props.renderColumnCell(col, ind))}</tr>
          </thead>
        )}
        <tbody>
          {props.data.map((row, index) => props.renderDataRow(row, index))}
          {!!props.isLoading && props.renderLoader?.()}
          {isTableEmpty && props.renderEmpty?.()}
        </tbody>
      </table>
    </div>
  )
}

export const displayTooltip = (tooltipContent?: string, showAlways: boolean = false, contentLength: number = 14) =>
{
  if (tooltipContent && (tooltipContent.length > contentLength || showAlways))
  {
    return tooltipContent
  }
  return
}
