'use client'

import { Menu, MenuButton, Transition, MenuItems } from '@headlessui/react'
import classNames from 'classnames'
import { Fragment, HTMLAttributes, ReactElement, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

type DropdownMenuProps = {
  items: ReactElement[]
  isFullWidth?: boolean
  renderHeader?: () => ReactNode
} & HTMLAttributes<HTMLDivElement>

export default function DropdownMenu(props: DropdownMenuProps)
{
  return (
    <Menu as="div" className={twMerge('relative inline-block text-left', props.className)}>
      <MenuButton className="w-full cursor-pointer">{props.children}</MenuButton>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <MenuItems
          className={classNames(
            'z-50 max-h-96 overflow-y-auto absolute z-10 right-0 mt-2 origin-top-right border border-lightAsh divide-y divide-lightAsh overflow-hidden rounded-xl bg-white shadow-lg focus:outline-none',
            { 'w-48': !props.isFullWidth, 'w-full': props.isFullWidth }
          )}
        >
          {props.renderHeader?.()}
          {props.items}
        </MenuItems>
      </Transition>
    </Menu>
  )
}
