'use client'

import { useNavMenuPaths } from '@/hooks/configs/NavMenuPaths'
import classNames from 'classnames'
import Link from 'next/link'
import { FiMenu, FiMinimize } from 'react-icons/fi'
import { useJWTAuthContext } from '@/config/auth/auth'
import SidenavItem from './SidenavItem'
import UserInfoCard from './UserInfoCard'
import DharapatLogoBlack from '@/components/shared/icons/DharapatLogoBlack'
import { BiLogOut } from 'react-icons/bi'

type SidenavProps = {
  expanded: boolean
  handleToggleExpanded: () => void
}

export default function Sidenav(props: SidenavProps) {
  const menuItems = useNavMenuPaths()
  const { logout } = useJWTAuthContext()

  return (
    <div className="sticky top-0 w-full">
      <div className="h-screen w-full">
        <div
          className={classNames(`flex z-10 h-full w-full flex-col bg-custom-lightGray bg-opacity-70 p-5`, [
            props.expanded ? 'items-start' : 'items-center',
          ])}
        >
          <div
            className={classNames(`flex w-full items-center`, {
              'justify-center': !props.expanded,
              'justify-between pl-3': props.expanded,
            })}
          >
            {props.expanded && (
              <Link href="/">
                <DharapatLogoBlack size={120} />
              </Link>
            )}
            <button
              type="button"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-extraLight transition-all duration-300 hover:bg-light focus:outline-none focus:ring-0"
              onClick={props.handleToggleExpanded}
            >
              {props.expanded ? (
                <FiMinimize size={18} className="text-primary" />
              ) : (
                <FiMenu size={18} className="text-primary" />
              )}
            </button>
          </div>

          <UserInfoCard
            expanded={props.expanded}
            className={classNames('mt-10', props.expanded ? 'w-full' : 'w-auto')}
          />

          <nav className="mt-6 flex h-full w-full flex-col items-start justify-between">
            <div className={classNames('flex w-full flex-col', props.expanded ? 'gap-y-1' : 'gap-y-2')}>
              {menuItems.map((item, i) => (
                <Link href={item.pathname} key={i}>
                  <SidenavItem name={item.label} active={item.active} expanded={props.expanded} icon={item.icon} />
                </Link>
              ))}
            </div>
            <div className="w-full" onClick={e => logout()}>
              <SidenavItem
                name="Sign Out"
                expanded={props.expanded}
                icon={<BiLogOut size={24} className="text-primary" />}
                className="text-primary"
              />
            </div>
          </nav>
        </div>
      </div>
    </div>
  )
}
