import { Field, Label, Radio, RadioGroup } from '@headlessui/react'
import { HTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

type RadioGroupOption = {
  label: string
  value: string
  isDisabled?: boolean
}

type RadioGroupFieldProps = {
  options: RadioGroupOption[]
  selected: string
  onChange: (value: string) => void
} & HTMLAttributes<HTMLInputElement>

export default function RadioGroupField(props: RadioGroupFieldProps) {
  return (
    <RadioGroup
      className={twMerge('flex flex-col gap-2', props.className)}
      value={props.selected}
      onChange={props.onChange}
    >
      {props.options.map((option, _idx) => (
        <Field key={_idx} disabled={!!option.isDisabled} className="flex items-center gap-2">
          <Radio
            value={option.value}
            className="group flex size-4 items-center justify-center rounded-full border border-black bg-white data-[checked]:bg-primary data-[disabled]:bg-gray-100"
          >
            <span className="invisible size-2 rounded-full bg-white group-data-[checked]:visible" />
          </Radio>
          <Label className="data-[disabled]:opacity-50 text-black text-sm font-base">{option.label}</Label>
        </Field>
      ))}
    </RadioGroup>
  )
}
