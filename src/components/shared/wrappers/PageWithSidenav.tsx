'use client'
import { useWindowSize } from '@/hooks/utils/WindowSize'
import classNames from 'classnames'
import { ReactNode, useMemo, useState } from 'react'
import Sidenav from '@/components/shared/navbars/Sidenav'
import TopBar from '../navbars/TopBar'

const PageWithSidenav = ({ children }: { children: ReactNode }) => {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const { width } = useWindowSize()

  const forceCollapsed = useMemo(() => {
    return width < 1200
  }, [width])

  const _isCollapsed = useMemo(() => {
    return forceCollapsed || isCollapsed
  }, [forceCollapsed, isCollapsed])

  const handleToggleCollapsed = () => {
    if (forceCollapsed) {
      setIsCollapsed(true)
    } else {
      setIsCollapsed(prev => !prev)
    }
  }

  return (
    <div className="relative flex w-full flex-row bg-transparent h-screen">
      <TopBar isNavbarCollapsed={_isCollapsed} />
      <div
        className={classNames([
          'hidden md:block',
          _isCollapsed ? 'min-w-[8rem] max-w-[8rem]' : 'min-w-[18rem] max-w-[18rem]',
        ])}
      >
        <Sidenav expanded={!_isCollapsed} handleToggleExpanded={handleToggleCollapsed} />
      </div>
      <div className="w-full overflow-y-scroll pl-5 pr-3 md:pl-0">{children}</div>
    </div>
  )
}

export default PageWithSidenav
