import { primary } from '@/styles/colors'
import { useRouter } from 'next/navigation'
import { FiArrowLeft } from 'react-icons/fi'
import { HTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

type PageTitleProps = {
  title: string
  isBackButton?: boolean
  subtitle?: string
} & HTMLAttributes<HTMLDivElement>

export default function PageHeader(props: PageTitleProps) {
  const router = useRouter()

  return (
    <div className={twMerge('flex items-center gap-x-5', props.className)}>
      {props.isBackButton && (
        <button
          type="button"
          onClick={() => router.back()}
          className="rounded-full border-2 border-white bg-white bg-opacity-70 p-1"
        >
          <FiArrowLeft size="18px" color={primary} />
        </button>
      )}
      <div className="grow">
        <h1 className="text-2xl font-extrabold text-secondary">{props.title}</h1>
        {props.subtitle && <h2 className="text-sm text-secondary opacity-56">{props.subtitle}</h2>}
      </div>
    </div>
  )
}
