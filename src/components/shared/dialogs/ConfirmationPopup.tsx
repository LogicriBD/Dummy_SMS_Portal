import { FaTrash } from 'react-icons/fa'
import PrimaryActionButton from '@/components/shared/buttons/PrimaryActionButton'
import SecondaryActionButton from '@/components/shared/buttons/SecondaryActionButton'
import PopupDialog from '@/components/shared/dialogs/PopupDialog'
import React, { Dispatch, ReactNode, SetStateAction } from 'react'

type ConfirmationPopupProps = {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  label: string
  content: string | ReactNode
  onProceedCallback: () => void
  isLoading?: boolean
  cancelButtonText?: string
  cancelButtonIcon?: ReactNode | null
  proceedButtonText?: string
  proceedButtonIcon?: ReactNode | null
}

export default function ConfirmationPopup(props: ConfirmationPopupProps)
{
  return (
    <PopupDialog title={props.label} isOpen={props.isOpen} setIsOpen={props.setIsOpen} className="w-1/3">
      <div className="mb-3 text-sm font-medium z-50">{props.content}</div>
      <div className="flex gap-2 justify-end">
        <SecondaryActionButton
          label={props.cancelButtonText ?? 'Cancel'}
          onClick={() =>
          {
            props.setIsOpen(false)
          }}
          iconLeft={props.cancelButtonIcon}
        />
        <PrimaryActionButton
          label={props.proceedButtonText ?? 'Proceed'}
          iconLeft={props.proceedButtonIcon}
          onClick={() =>
          {
            props.onProceedCallback()
          }}
          isLoading={props.isLoading}
        />
      </div>
    </PopupDialog>
  )
}
