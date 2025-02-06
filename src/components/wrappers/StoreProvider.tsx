'use client'
import { Provider } from 'react-redux'
import { EnhancedStore } from '@reduxjs/toolkit';
import { useRef } from 'react';
import { appStore } from '@/store/store';

export default function StoreProvider({
    children
}: {
    children: React.ReactNode
})
{
    const storeRef = useRef<EnhancedStore | null>(null)
    if (!storeRef.current)
    {
        storeRef.current = appStore
    }

    return <Provider store={storeRef.current}>{children}</Provider>
}