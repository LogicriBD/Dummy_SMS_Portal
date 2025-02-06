'use client'

import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react'
import { format } from 'date-fns'
import { Fragment, HTMLAttributes, ReactNode, useEffect, useState } from 'react'
import { FiCalendar, FiChevronDown, FiXCircle } from 'react-icons/fi'
import { twMerge } from 'tailwind-merge'
import DatePicker from './DatePicker'
import { DayCellProps } from './DayCell'

type DateSelectFieldProps = Pick<DayCellProps, 'onSelectDate'> &
  Pick<DayCellProps, 'checkIfDateDisabled'> &
  HTMLAttributes<HTMLDivElement> & {
    label: string | ReactNode
    buttonClasses?: string
    selectedDate: Date | null
    onClear?: () => void
  }

export default function DateSelectField(props: DateSelectFieldProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(props.selectedDate)
  const [displayLabel, setDisplayLabel] = useState('')

  useEffect(() => {
    setSelectedDate(props.selectedDate)
    setDisplayLabel(props.selectedDate ? format(props.selectedDate, 'd MMM yyyy') : '')
  }, [props.selectedDate])

  const canBeCleared = Boolean(props.onClear)

  return (
    <Menu as="div" className={twMerge('relative inline-block text-left', props.className)}>
      <MenuButton
        className={twMerge(
          'flex w-full items-center gap-x-3 rounded-full border-2 border-white bg-white px-6 py-1 transition duration-300 h-full',
          props.buttonClasses
        )}
      >
        <div className="shrink-0 text-secondary">
          <FiCalendar />
        </div>
        <div className="flex grow flex-col items-start justify-center">
          {!displayLabel && <span className="whitespace-nowrap text-xs font-light text-slate-800">{props.label}</span>}
          {!!displayLabel && <span className="text-xs text-slate-800">{displayLabel}</span>}
        </div>
        <div className="ml-2 flex items-center gap-x-2 md:ml-4">
          {!!selectedDate && canBeCleared && (
            <FiXCircle
              className="text-slate-600"
              strokeWidth={1.5}
              onClick={e => {
                e.preventDefault()
                setSelectedDate(null)
                props.onClear?.()
              }}
            />
          )}
          <FiChevronDown className="text-slate-600" strokeWidth={1.5} />
        </div>
      </MenuButton>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <MenuItems className="absolute inset-x-0 right-0 z-10 mt-2 origin-top-right divide-y divide-gray-100 overflow-hidden rounded-md bg-white p-4 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <MenuItem>
            {({ close }) => (
              <DatePicker
                checkIfDateDisabled={props.checkIfDateDisabled}
                selectedDate={selectedDate ?? new Date()}
                onSelectDate={(date: Date) => {
                  setSelectedDate(date)
                  props.onSelectDate(date)
                  close()
                }}
              />
            )}
          </MenuItem>
        </MenuItems>
      </Transition>
    </Menu>
  )
}
