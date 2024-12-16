import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

function Header({ children, className }: HeaderProps) {
    return (
        <div className={cn('header', className)}>
            <Link href="/" className='md:flex-1'>
                <div className='flex items-center gap-2'>
                    <Image
                        src="/assets/images/logo.png"
                        alt='Editor'
                        width={45}
                        height={45}
                        className='hidden md:block' />
                    <p className='text-3xl'>Docs</p>
                </div>
            </Link>
            {children}
        </div>
    )
}

export default Header