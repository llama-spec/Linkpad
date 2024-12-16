"use client"

import React, { useState } from 'react'
import { Button } from './ui/button'
import Image from "next/image"
import { createDocument } from '@/lib/actions/room.actions'
import { useRouter } from 'next/navigation'
function AddDocumentBtn({ userId, email }: AddDocumentBtnProps) {

    const router = useRouter()
    async function addDocumentHandler() {
        try {
            const room = await createDocument({ email, userId })

            if(room){
                router.push(`/document/${room.id}`)
            }

        } catch (err) {
            console.log(err)
        }
    }

    return (
        <Button type='submit' className=' bg-[#1d1d1d] flex gap-1 shadow-md' onClick={addDocumentHandler}>
            <Image src='/assets/icons/add.svg'
                alt='add'
                width={24}
                height={24}></Image>
            <p className='hidden sm:block'>Create a new document</p>
        </Button>
    )
}

export default AddDocumentBtn