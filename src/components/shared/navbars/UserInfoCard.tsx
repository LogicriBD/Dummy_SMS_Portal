'use client'

import { useJWTAuthContext } from '@/config/auth/auth'
import { reduceString } from '@/helpers/formatting'
import classNames from 'classnames'
import { HTMLAttributes } from 'react'
import { FiMenu } from 'react-icons/fi'
import { twMerge } from 'tailwind-merge'
import { FaRegUser } from 'react-icons/fa'
import IconButton from '../buttons/IconButton'

type UserInfoCardProps = {
  expanded: boolean
  forMobileMenu?: boolean
  handleViewMobileMenu?: () => void
} & HTMLAttributes<HTMLDivElement>

export default function UserInfoCard(props: UserInfoCardProps) {
  const { user } = useJWTAuthContext()
  if (!user) {
    return null
  }

  const forMobileMenu = Boolean(props.forMobileMenu)

  return (
    <div
      className={twMerge(
        'relative flex w-full flex-row items-center space-x-4 rounded-full bg-white p-3',
        props.className
      )}
    >
      <IconButton icon={<FaRegUser />} />
      {props.expanded && (
        <div
          className={classNames('flex flex-col text-xs font-semibold', {
            'text-custom-darkBlue': !forMobileMenu,
            'text-secondary': forMobileMenu,
          })}
        >
          <span>{reduceString(`${user.firstName} ${user.lastName}`, 20)}</span>
          <span className="opacity-64 font-normal">{user.userType.name}</span>
        </div>
      )}
      {forMobileMenu && (
        <button
          type="button"
          className="absolute top-3 right-3 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-extraLight transition-all duration-300 hover:bg-light focus:outline-none focus:ring-0"
          onClick={props.handleViewMobileMenu}
        >
          <FiMenu size={16} className="text-primary" />
        </button>
      )}
    </div>
  )
}
