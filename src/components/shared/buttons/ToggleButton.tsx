import classNames from 'classnames'
import React, { ReactNode } from 'react'

type ToggleButtonItem = {
  label: string
  icon?: ReactNode
  onClick: () => void
  isDisabled?: boolean
}
type ToggleButtonProps = { items: ToggleButtonItem[] }

export default function ToggleButton(props: ToggleButtonProps) {
  return (
    <div className="flex justify-between border-1 border-slate-200 rounded-full text-sm font-medium">
      {props.items.map((item, index) => (
        <div
          key={index}
          onClick={item.onClick}
          className={classNames('flex justify-center items-center px-3 py-2', {
            'cursor-not-allowed bg-slate-100 text-gray-500': item.isDisabled,
            'cursor-pointer hover:bg-slate-50': !item.isDisabled,
            'border-r-1': !index,
            'rounded-l-inherit': !index,
            'rounded-r-inherit': index + 1 === props.items.length,
          })}
        >
          {item.icon} <span className="ml-2">{item.label}</span>
        </div>
      ))}
    </div>
  )
}
