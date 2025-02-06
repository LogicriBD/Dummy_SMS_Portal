'use client'

import { HTMLAttributes, useState } from 'react'
import { FiEye, FiEyeOff, FiUnlock } from 'react-icons/fi'
import { twMerge } from 'tailwind-merge'
import InputFieldLabel from './InputFieldLabel'
import IconButton from '@/components/shared/buttons/IconButton'

type PasswordInputFieldProps = {
  inputClasses?: string
  label: string
  onTextChange: (input: string) => void
  error?: string
} & HTMLAttributes<HTMLDivElement>

export default function PasswordInputField(props: PasswordInputFieldProps)
{
  const [isFocused, setIsFocused] = useState(false)
  const [isPasswordVisible, setPasswordVisible] = useState(false)
  const [text, setText] = useState('')
  const inputTag = `input-password-${props.label}`

  return (
    <div className={twMerge('flex w-full flex-col items-stretch gap-y-1', props.className)}>
      <InputFieldLabel htmlFor={'#' + inputTag} className="ml-5 mb-1" label={props.label}
        optional={false}
      />
      <div className="relative">
        <input
          type={isPasswordVisible ? 'text' : 'password'}
          id={inputTag}
          value={text}
          onChange={event =>
          {
            const val = event.target.value
            setText(val)
            props.onTextChange(val)
          }}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Enter password here..."
          className={twMerge(
            'w-full rounded-full bg-white ring-1 ring-transparent py-2.5 pl-12 pr-5 text-sm font-medium text-slate-800 placeholder:text-xs placeholder:font-light placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary md:py-3',
            props.inputClasses
          )}
        />
        <div className="absolute left-5 top-1/2 -translate-y-1/2 text-secondary">
          <FiUnlock />
        </div>
        <IconButton
          className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-500"
          onClick={e =>
          {
            e.preventDefault()
            setPasswordVisible(!isPasswordVisible)
          }}
          icon={isPasswordVisible ? <FiEyeOff /> : <FiEye />}
        />
      </div>
      {props.error && !!text && !isFocused && (
        <span className="pl-4 text-xs font-normal italic text-red-500">{props.error}</span>
      )}
    </div>
  )
}
