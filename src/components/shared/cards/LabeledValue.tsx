import classNames from 'classnames'
import { HTMLAttributes, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

type LabeledValueProps = {
  label: string
  value: string | ReactNode
  innerContainerClasses?: string
  informationClasses?: string
} & HTMLAttributes<HTMLDivElement>

export default function LabeledValue(props: LabeledValueProps) {
  return (
    <div className={twMerge('flex w-full', props.className)}>
      <div className={twMerge('flex flex-col items-start gap-y-1 grow', props.innerContainerClasses)}>
        <span className="whitespace-nowrap text-xs font-medium text-secondary text-opacity-56">{props.label}</span>
        <div
          className={classNames('flex items-center gap-x-2', {
            'w-full': props.innerContainerClasses !== 'items-center',
          })}
        >
          <span
            className={twMerge('line-clamp-2 break-all text-xs font-normal text-secondary', props.informationClasses)}
          >
            {props.value?? "--"}
          </span>
        </div>
      </div>
    </div>
  )
}
