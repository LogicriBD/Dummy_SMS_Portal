'use client'

import { Listbox } from '@headlessui/react'
import classNames from 'classnames'
import { HTMLAttributes, ReactNode, useEffect, useState } from 'react'
import { FiChevronDown, FiXCircle } from 'react-icons/fi'
import { twMerge } from 'tailwind-merge'
import Image from 'next/image'

import emptySearch from '../../../../public/images/empty-search.svg'

export type Selectable<T> = T & { isSelected?: boolean }

export type SelectOption = {
  _id: string
  name: string
  icon?: ReactNode
}

export function toSelectOptionList<T extends SelectOption>(
  items: T[],
  isSelectedPredicate?: (item: T) => boolean
): Selectable<T>[] {
  const ret = []
  for (const item of items) {
    ret.push({
      ...item,
      isSelected: isSelectedPredicate?.(item) ?? false,
    })
  }
  return ret
}

type SelectInputFieldProps<T> = {
  inputClasses?: string
  size?: 'sm' | 'md'
  icon?: ReactNode
  items: Selectable<T>[]
  placeholder: string
  label?: string
  selectedItem?: T | null
  onItemSelect?: (input: T) => void
  onClear?: () => void
  isClearable?: boolean
} & HTMLAttributes<HTMLDivElement>

export default function SelectInputField<T extends SelectOption = SelectOption>(props: SelectInputFieldProps<T>) {
  const [selectedItem, setSelectedItem] = useState<T | null>(null)
  const canBeCleared = props.isClearable ?? false
  const size = props?.size ?? 'sm'

  useEffect(() => {
    if (props.selectedItem) {
      setSelectedItem(props.selectedItem)
      return
    }

    for (const option of props.items) {
      if (option.isSelected === true) {
        setSelectedItem(option)
        break
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.selectedItem])

  return (
    <Listbox
      as="div"
      className={twMerge('relative flex flex-col items-start gap-y-1', props.className)}
      value={selectedItem}
      onChange={val => {
        if (val) {
          props.onItemSelect?.(val)
          setSelectedItem(val)
        }
      }}
    >
      {!!props.label && (
        <Listbox.Label className="ml-5 text-xs font-normal text-slate-500">{props.label}</Listbox.Label>
      )}
      <Listbox.Button
        as="div"
        className={twMerge(
          classNames(
            'flex w-full cursor-pointer items-center justify-between rounded-full bg-white px-3 md:px-4 text-slate-800',
            [size === 'sm' ? 'py-2.5' : 'py-3.5']
          ),
          props.inputClasses
        )}
      >
        <div className="flex items-center gap-x-2 overflow-hidden">
          <span className="text-secondary">{props.icon}</span>
          <span
            className={classNames('select-none whitespace-nowrap text-sm', {
              'line-clamp-1': Boolean(selectedItem?.name),
            })}
          >
            {selectedItem?.name || props.placeholder}
          </span>
        </div>
        <div className="ml-2 md:ml-4 flex items-center gap-x-2">
          {!!selectedItem && canBeCleared && (
            <FiXCircle
              className="text-slate-600"
              strokeWidth={1.5}
              onClick={e => {
                e.preventDefault()
                setSelectedItem(null)
                props.onClear?.()
              }}
            />
          )}
          <FiChevronDown className="text-slate-600" strokeWidth={1.5} />
        </div>
      </Listbox.Button>

      <Listbox.Options className="z-20 absolute left-0 top-full max-h-72 w-full translate-y-2 divide-y divide-slate-100 overflow-y-scroll rounded-lg border border-slate-100 bg-white py-2 shadow-lg focus:outline-0 focus:ring-0">
        {props.items.map(item => (
          <Listbox.Option
            key={item._id}
            value={item}
            className="cursor-pointer transition-all duration-300 hover:bg-slate-100 flex items-center"
          >
            {item.icon && <div className="pl-4 py-2">{item.icon}</div>}
            <div className="px-4 py-2.5 text-xs font-normal text-slate-800">{item.name}</div>
          </Listbox.Option>
        ))}

        {!props.items.length && (
          <div className="flex w-full flex-col items-center justify-center px-4 py-4">
            <Image src={emptySearch} alt="Empty Search" className="h-16" />
            <span className="text-xs font-light italic text-slate-400">No Item</span>
          </div>
        )}
      </Listbox.Options>
    </Listbox>
  )
}
