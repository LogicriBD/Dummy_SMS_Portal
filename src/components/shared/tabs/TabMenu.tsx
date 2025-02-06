import classNames from 'classnames'
import { HTMLAttributes, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

export type TabItem = {
  id: string
  label: string
  icon?: ReactNode
}

type TabMenuProps<T extends readonly TabItem[]> = {
  items: T
  counts?: number[]
  activeTabId: T[number]['id']
  onTabClick: (tabId: T[number]['id']) => void
  style: 'chip' | 'box'
} & HTMLAttributes<HTMLDivElement>

export default function TabMenu<T extends readonly TabItem[]>(props: TabMenuProps<T>) {
  const getTabBadge = (index: number) => {
    if (props.counts) {
      return props.counts[index]
    }
    return 0
  }

  if (props.style === 'chip') {
    return (
      <div className={twMerge('flex flex-row flex-wrap gap-2 lg:gap-4', props.className)}>
        {props.items?.map(tab => (
          <div
            key={tab.id}
            className={classNames('flex cursor-pointer items-center justify-center rounded-3xl px-4 py-2 lg:px-6', {
              'bg-sky-100': tab.id === props.activeTabId,
              'bg-slate-100': tab.id !== props.activeTabId,
            })}
            onClick={() => props.onTabClick(tab.id)}
            data-test={'tab-menu'}
          >
            <span
              className={classNames('whitespace-nowrap text-center text-xs font-medium transition-all duration-300', {
                'text-secondary': tab.id === props.activeTabId,
                'text-primary': tab.id !== props.activeTabId,
              })}
              data-test={'tab-menu-text'}
            >
              {tab.label}
            </span>
          </div>
        ))}
      </div>
    )
  } else if (props.style === 'box') {
    return (
      <div
        className={twMerge(
          'flex shrink-0 flex-row divide-x-1 divide-custom-gray rounded-full self-start overflow-hidden',
          props.className
        )}
      >
        {props.items?.map((tab, index) => (
          <div
            key={tab.id}
            className={classNames(
              'flex py-3 grow cursor-pointer flex-col items-center justify-center space-y-1 px-3 md:px-6 lg:grow-0',
              {
                'bg-sky-100': tab.id === props.activeTabId,
                'bg-white': tab.id !== props.activeTabId,
              }
            )}
            onClick={() => props.onTabClick(tab.id)}
          >
            <div
              className={classNames('flex flex-col items-stretch transition-all duration-300', {
                'gap-y-1': tab.id === props.activeTabId,
                'gap-y-0': tab.id !== props.activeTabId,
              })}
            >
              <div
                className={classNames(
                  'flex items-center gap-x-1 whitespace-nowrap text-center text-xs font-medium transition-all duration-300',
                  {
                    'text-primary': tab.id === props.activeTabId,
                    'text-secondary': tab.id !== props.activeTabId,
                  }
                )}
              >
                {!!tab.icon && tab.icon}
                <span>
                  {tab.label} {getTabBadge(index) > 0 && `(${getTabBadge(index)})`}
                </span>
              </div>

              {/* <div
                className={classNames('flex w-1/2 ml-6 rounded-full bg-secondary transition-all duration-300', {
                  'h-0.5': props.activeTabId === tab.id,
                  'h-0': props.activeTabId !== tab.id,
                })}
              ></div> */}
            </div>
          </div>
        ))}
      </div>
    )
  } else {
    throw new Error('Invalid style')
  }
}
