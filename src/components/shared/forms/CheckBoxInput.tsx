import { Checkbox } from '@headlessui/react'
import { twMerge } from 'tailwind-merge'

type CheckBoxInputPropsType = {
  checked: boolean
  onChange: (checked: boolean) => void
  className?: string
}

export default function CheckBoxInput(props: CheckBoxInputPropsType) {
  return (
    <Checkbox
      className={twMerge(
        'group block min-w-[16px] min-h-[16px] size-4 rounded border border-primary/84 bg-white data-[checked]:bg-primary/70',
        props.className
      )}
      checked={props.checked}
      onChange={checked => {
        props.onChange(checked)
      }}
    >
      <svg className="stroke-white opacity-0 group-data-[checked]:opacity-100" viewBox="0 0 14 14" fill="none">
        <path d="M3 8L6 11L11 3.5" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </Checkbox>
  )
}
