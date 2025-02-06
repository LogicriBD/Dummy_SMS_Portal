import React, { HTMLAttributes } from 'react'
import { HiExclamationCircle } from 'react-icons/hi'

type ErrorMessageAlertProps = {
  message: string
} & HTMLAttributes<HTMLDivElement>

export default function ErrorMessageAlert(props: ErrorMessageAlertProps) {
  return (
    <div className="flex items-center gap-x-4 rounded-lg border border-danger bg-danger/10 p-4 text-danger">
      <HiExclamationCircle size={24} className="shrink-0" />
      <p className="text-xs font-medium">{props.message}</p>
    </div>
  )
}
