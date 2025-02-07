'use client'

import { useEffect } from 'react'

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
})
{
    useEffect(() =>
    {
        console.error(error)
    }, [error])

    return (
        <div className='w-full h-full flex mt-32 flex-col justify-center items-center bg-white p-4 rounded-lg shadow-lg'>
            <h1 className='text-2xl font-bold text-red-800'>
                {error.message}
            </h1>
            <button
                onClick={
                    () => reset()
                }
            >
                Try again
            </button>
        </div>
    )
}