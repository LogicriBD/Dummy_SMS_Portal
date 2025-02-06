import React, { ReactNode } from 'react'

type FreezeScreenProps = {
  isOpen: boolean
  floatingModal: ReactNode
}

export default function FreezeScreen(props: FreezeScreenProps)
{
  return (
    <>
      {props.isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-10 flex justify-center items-end backdrop-blur-sm z-50">
          <div className="bg-slate-100 p-4 rounded-lg m-4 max-w-lg">{props.floatingModal}</div>
        </div>
      )}
    </>
  )
}
