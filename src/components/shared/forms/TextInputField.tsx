'use client'

import classNames from 'classnames'
import { HTMLAttributes, ReactNode, forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { z } from 'zod'
import InputFieldLabel from './InputFieldLabel'
import { FaSpinner } from 'react-icons/fa'

export type TextInputFieldProps = {
  type?: 'text' | 'email'
  inputClasses?: string
  icon?: ReactNode
  endIcon?: ReactNode
  isLoading?: boolean
  label?: string
  placeholder: string
  value?: string
  size?: 'sm' | 'md'
  isDisabled?: boolean
  hasBorder?: boolean
  validationSchema?: z.ZodString | z.ZodNumber
  onTextChange?: (input: string) => void
  autoComplete?: string
  optional?: boolean
} & HTMLAttributes<HTMLDivElement>

const TextInputField = forwardRef<unknown, TextInputFieldProps>((props, ref) =>
{
  const [hasBeenEdittedOnce, setHasBeenEdittedOnce] = useState(false)
  const [textInput, setTextInput] = useState(props.value ?? (props.defaultValue as string) ?? '')
  const [errorMessage, setErrorMessage] = useState('')
  const inputTag = `input-${props.label}-${props.placeholder}`
  const size = props.size ?? 'md'
  const hasIcon = !!props.icon

  useEffect(() =>
  {
    if (textInput === props.value)
    {
      return
    }

    props.onTextChange?.(textInput)

    if (props.isDisabled)
    {
      setErrorMessage('')
      return
    }

    if (!hasBeenEdittedOnce)
    {
      setHasBeenEdittedOnce(true)
      return
    }

    if (props.optional && textInput === '')
    {
      setErrorMessage('')
      return
    }

    if (props.validationSchema)
    {
      const result = props.validationSchema.safeParse(textInput)

      if (!result.success)
      {
        setErrorMessage(result.error.errors[0]?.message)
      } else
      {
        setErrorMessage('')
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [textInput, props.isDisabled])

  useEffect(() =>
  {
    if (textInput === props.value)
    {
      return
    }

    if (props.value == null)
    {
      return
    }

    setTextInput(props.value)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.value])

  useImperativeHandle(
    ref,
    () => ({
      isValidated()
      {
        return props.validationSchema?.safeParse(textInput).success ?? true
      },
      setInputText(val: string)
      {
        setTextInput(val)
      },
    }),
    [textInput, props.validationSchema]
  )

  const isFieldDisabled = props.isDisabled ?? false
  const hasValidationSchema = !!props.validationSchema
  const hasBorderOutline = props.hasBorder ?? false

  return (
    <div
      className={twMerge(
        classNames('flex flex-col items-stretch', { 'gap-y-1': hasValidationSchema }, props.className)
      )}
    >
      {!!props.label && <InputFieldLabel htmlFor={'#' + inputTag} className="mb-1 ml-5" label={props.label} optional={!!props.optional} />}
      <div className="relative">
        <input
          type={props.type ?? 'text'}
          id={inputTag}
          value={textInput}
          onChange={event => setTextInput(event.target.value)}
          disabled={isFieldDisabled}
          placeholder={props.placeholder}
          autoFocus={props.autoFocus}
          className={twMerge(
            classNames(
              'w-full rounded-full ring-transparent bg-white font-medium text-slate-800 ring-1 placeholder:text-xs placeholder:font-light placeholder:text-slate-400 focus:ring-2 focus:outline-none focus:ring-primary',
              {
                'py-3 pl-12 pr-6 text-sm': size === 'md' && hasIcon,
                'py-3 pl-6 pr-6 text-sm': size === 'md' && !hasIcon,
                'py-2.5 pl-11 pr-5 text-xs': size === 'sm' && hasIcon,
                'py-2.5 pl-6 pr-5 text-xs': size === 'sm' && !hasIcon,
                'border border-slate-100 bg-slate-100': isFieldDisabled,
                'border border-white bg-white': !isFieldDisabled,
                'border border-slate-200': hasBorderOutline,
              }
            ),
            props.inputClasses
          )}
          autoComplete={props.autoComplete ?? ''}
          required={!props.optional}
          onKeyDown={props.onKeyDown}
        />
        <div className="text-secondary absolute left-5 top-1/2 -translate-y-1/2">{!!props.icon && props.icon}</div>
        {(!!props.endIcon || props.isLoading) && (
          <div className="text-secondary absolute right-5 top-1/2 -translate-y-1/2">
            {props.isLoading ? <FaSpinner className="animate-spin" /> : !!props.endIcon && props.endIcon}
          </div>
        )}
      </div>
      {hasValidationSchema && <span className="h-3 pl-4 text-xs font-normal italic text-danger">{errorMessage}</span>}
    </div>
  )
})

TextInputField.displayName = 'TextInputField'
export default TextInputField
