import { MenuItem } from '@headlessui/react'
import { HTMLAttributes, ReactElement } from 'react'
import { twMerge } from 'tailwind-merge'
import { FaSpinner } from 'react-icons/fa'

export type MenuItem = {
  label: string
  tooltip?: string
  iconLeft?: ReactElement
  isLoading?: boolean
}

export type DropdownMenuItemProps = MenuItem & {
  onClick: () => void
} & HTMLAttributes<HTMLDivElement>

export default function DropdownMenuItem(props: DropdownMenuItemProps)
{
  return (
    <MenuItem>
      <div
        className={twMerge(
          'flex cursor-pointer items-center gap-x-2 px-4 py-3 text-baseBlack bg-white transition-all duration-300 hover:bg-extraLightAsh',
          props.className
        )}
        data-tooltip-id={'dropdown-tooltip'}
        data-tooltip-content={props.tooltip}
        onClick={props.onClick}
      >
        {props.isLoading && <FaSpinner />}
        {!props.isLoading && !!props.iconLeft && props.iconLeft}
        <span className="text-start text-xs font-medium">{props.label}</span>
      </div>
    </MenuItem>
  )
}
