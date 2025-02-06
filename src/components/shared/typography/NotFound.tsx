import React from 'react'
import PageHeader from './PageHeader'

export default function NotFound() {
  return (
    <div className="h-screen w-full flex items-center justify-center">
      <PageHeader title="Page not found!" subtitle="Click on the back button to go back!" isBackButton />
    </div>
  )
}
