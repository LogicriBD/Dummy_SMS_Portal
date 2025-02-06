import IconButton from '@/components/shared/buttons/IconButton'
import Link from 'next/link'
import { ReactNode } from 'react'

type HomePageNavbarProps = {
  href?: string
  label: string
  description: string
  icon: ReactNode
  onClick?: () => void
}

const withHrefLink = (component: ReactNode, href: string) =>
{
  return <Link href={href}>{component}</Link>
}

export default function HomePageNavbar(props: HomePageNavbarProps)
{
  const component = (
    <div
      onClick={props.onClick}
      className="text-center h-48 w-48 hover:cursor-pointer hover:shadow-md rounded-xl shadow-sm flex flex-col items-center justify-center bg-white hover:italic p-5"
    >
      <span className="text-secondary font-extrabold text-lg">{props.label}</span>
      <span className="text-primary/56 font-medium text-xs mb-2">{props.description}</span>
      <IconButton className="h-16 w-16 border-gray-200 border-2 text-primary rounded-full ps-2" icon={props.icon} />
    </div>
  )

  if (props.href)
  {
    return withHrefLink(component, props.href)
  }

  return component
}
