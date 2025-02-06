'use client'

import TextInputField, { TextInputFieldProps } from './TextInputField'
import { HTMLAttributes, useState, useEffect, Fragment, useRef, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

type OptionType = { label: string; value: string }

type AutoCompleteOptionsType = {
  options?: OptionType[]
  onOptionSelect: (value: string) => void
  isOptionsLoading?: boolean
  renderHeader?: (onCloseFn: (isActive: boolean) => void) => ReactNode
} & HTMLAttributes<HTMLDivElement>

type TextFieldAutoCompletePropsType = TextInputFieldProps & AutoCompleteOptionsType

export default function TextFieldAutoComplete(props: TextFieldAutoCompletePropsType) {
  const [options, setOptions] = useState<OptionType[]>()
  const [isSuggestionActive, setIsSuggestionActive] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleOutsideClick = (e: MouseEvent) => {
    if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
      setIsSuggestionActive(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick)
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  })

  useEffect(() => {
    if (props.options != null) {
      setOptions(props.options)
    }
  }, [props.options])

  return (
    <div
      className={twMerge('relative flex flex-col items-start gap-y-1', props.className)}
      ref={containerRef}
      onClick={() => setIsSuggestionActive(true)}
    >
      <TextInputField {...props} isLoading={props.isOptionsLoading} />
      {isSuggestionActive && ((!!options && !!options.length) || props.renderHeader) && (
        <div className="z-20 absolute left-0 top-full max-h-72 w-full translate-y-2 divide-y divide-slate-100 overflow-y-scroll rounded-lg border border-slate-100 bg-white py-2 shadow-lg focus:outline-0 focus:ring-0">
          {props.renderHeader?.(setIsSuggestionActive)}
          {!!options && !!options.length && (
            <Fragment>
              {options.map(item => (
                <div
                  onClick={e => {
                    setIsSuggestionActive(false)
                    props.onOptionSelect(item.value)
                    e.stopPropagation()
                  }}
                  key={item.value}
                  className="cursor-pointer transition-all duration-300 hover:bg-slate-100"
                >
                  <div className="px-4 py-2.5 text-xs font-normal text-slate-800">{item.label}</div>
                </div>
              ))}
            </Fragment>
          )}
        </div>
      )}
    </div>
  )
}
