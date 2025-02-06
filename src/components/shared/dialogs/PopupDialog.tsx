import { useWindowSize } from '@/hooks/utils/WindowSize'
import { secondary } from '@/styles/colors'
import { Dialog, DialogPanel, DialogTitle, Transition } from '@headlessui/react'
import classNames from 'classnames'
import { omit } from 'lodash'
import { Dispatch, Fragment, HTMLAttributes, SetStateAction, useMemo } from 'react'
import { FiX } from 'react-icons/fi'
import { twMerge } from 'tailwind-merge'

export type PopupDialogProps = {
  title?: string
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  position?: 'top' | 'bottom' | 'left' | 'right' | 'center'
  showBackdrop?: boolean
  contentClasses?: string
} & HTMLAttributes<HTMLDivElement>

export default function PopupDialog(props: PopupDialogProps)
{
  const { width } = useWindowSize()

  const position = useMemo(() =>
  {
    if (width < 768)
    {
      return 'bottom'
    }
    return props.position ?? 'center'
  }, [props.position, width])

  const showBackdrop = Boolean(props.showBackdrop)

  return (
    <Transition show={props.isOpen} as={Fragment}>
      <Dialog as="div" className="fixed inset-0 overflow-y-scroll z-50" onClose={() => props.setIsOpen(false)}>
        {!showBackdrop && (
          <Transition
            as={Fragment}
            enter="ease-in-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            show
          >
            <div className="fixed inset-0 bg-secondary bg-opacity-30 backdrop-blur-sm" />
          </Transition>
        )}
        <Transition as={Fragment} {...omit(getTransitionProperties(position), ['leaveFrom', 'leaveTo'])} show>
          <div
            className={classNames('w-full flex', {
              'justify-center items-start pb-4': position === 'top',
              'justify-center items-end pt-4': position === 'bottom',
              'justify-start items-center pr-4': position === 'left',
              'justify-end items-center pl-4': position === 'right',
              'justify-center items-center p-4 min-h-screen': position === 'center',
              'fixed inset-0': position !== 'center',
            })}
          >
            <Transition as={Fragment} {...omit(getTransitionProperties(position), ['enterFrom', 'enterTo'])} show>
              <DialogPanel
                as="div"
                className={twMerge(
                  classNames(
                    'w-full transform bg-white p-4 md:p-6 text-left align-middle shadow-xl transition-all duration-300',
                    {
                      'rounded-b-xl': position === 'top',
                      'rounded-t-xl': position === 'bottom',
                      'rounded-r-xl': position === 'left',
                      'rounded-l-xl': position === 'right',
                      'rounded-xl': position === 'center',
                    }
                  ),
                  props.className
                )}
              >
                {!!props.title && (
                  <DialogTitle className="mb-2">
                    <div className="flex items-center justify-between">
                      <span className="text-base font-semibold text-secondary">{props.title}</span>
                      <button
                        type="button"
                        className="flex h-8 w-8 items-center justify-center rounded-full transition-all duration-300 hover:bg-custom-gray focus:outline-0 "
                        onClick={() => props.setIsOpen(false)}
                      >
                        <FiX size="16px" color={secondary} />
                      </button>
                    </div>
                  </DialogTitle>
                )}

                <div
                  className={twMerge(
                    classNames('flex w-full flex-col items-stretch', {
                      'max-h-[75vh] overflow-y-auto': position !== 'center',
                    }),
                    props.contentClasses
                  )}
                >
                  {props.children}
                </div>
              </DialogPanel>
            </Transition>
          </div>
        </Transition>
      </Dialog>
    </Transition>
  )
}

type TransitionPropType = {
  enter: string
  enterFrom: string
  enterTo: string
  leave: string
  leaveFrom: string
  leaveTo: string
}

function getTransitionProperties(position: string): TransitionPropType
{
  const defaultProps = {
    enter: 'transform transition ease-in-out duration-300',
    leave: 'transform transition ease-in-out duration-300',
  }

  if (position === 'top')
  {
    return {
      ...defaultProps,
      enterFrom: '-translate-y-full',
      enterTo: 'translate-y-0',
      leaveFrom: 'translate-y-0',
      leaveTo: '-translate-y-full',
    }
  } else if (position === 'bottom')
  {
    return {
      ...defaultProps,
      enterFrom: 'translate-y-full',
      enterTo: 'translate-y-0',
      leaveFrom: 'translate-y-0',
      leaveTo: 'translate-y-full',
    }
  } else if (position === 'left')
  {
    return {
      ...defaultProps,
      enterFrom: '-translate-x-full',
      enterTo: 'translate-x-0',
      leaveFrom: 'translate-x-0',
      leaveTo: '-translate-x-full',
    }
  } else if (position === 'right')
  {
    return {
      ...defaultProps,
      enterFrom: 'translate-x-full',
      enterTo: 'translate-x-0',
      leaveFrom: 'translate-x-0',
      leaveTo: 'translate-x-full',
    }
  }

  return {
    ...defaultProps,
    enterFrom: 'opacity-0 scale-95',
    enterTo: 'opacity-100 scale-100',
    leaveFrom: 'opacity-100 scale-100',
    leaveTo: 'opacity-0 scale-95',
  }
}
