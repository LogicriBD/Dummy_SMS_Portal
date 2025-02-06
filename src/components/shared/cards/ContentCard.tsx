import React, { HTMLAttributes, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

interface ContentCardProps extends HTMLAttributes<HTMLDivElement> {
  title?: string
  iconRight?: ReactNode
}

export default function ContentCard(props: ContentCardProps) {
  return (
    <div
      className={twMerge(
        'rounded-lg border-2 border-white bg-white shadow-custom-gray/20 transition-all duration-300 pb-4 shadow-sm',
        props.className
      )}
      onClick={props.onClick}
    >
      <div className="w-full flex justify-between items-center sticky top-0 p-4 z-10 rounded-inherit">
        <h1 className="text-black text-xs font-semibold">{props.title}</h1>
        {props.iconRight}
      </div>
      <div className="px-4 flex flex-col items-center gap-y-2 pt-0">{props.children}</div>
    </div>
  )
}
