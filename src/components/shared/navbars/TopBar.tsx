import React from 'react'
import { useNavMenuPaths } from '@/hooks/configs/NavMenuPaths'
import classNames from 'classnames'
import { useTopBarRender } from '@/stores/shared/useTopBarRender'
import { usePathname } from 'next/navigation'

function TopBar({ isNavbarCollapsed }: { isNavbarCollapsed: boolean }) {
  const allPaths = useNavMenuPaths()
  const { node } = useTopBarRender()
  const currentActivePath = allPaths.find(path => path.active)
  const activePath = usePathname()

  return (
    <div
      className={classNames([
        'absolute right-0 h-[60px] bg-white p-3 flex items-center justify-between lg:justify-start z-10 shadow-sm',
        isNavbarCollapsed ? 'w-[calc(100%-8rem)]' : 'w-[calc(100%-18rem)]',
      ])}
    >
      <h1 className="text-secondary font-semibold ml-3">
        {currentActivePath?.topBarLabel ?? (activePath.includes('analysis') ? 'Analysis' : 'Home')}
      </h1>
      <>{node}</>
    </div>
  )
}

export default TopBar
