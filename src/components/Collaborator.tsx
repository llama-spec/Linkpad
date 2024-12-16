'use client'

import Image from 'next/image'
import React, { useState } from 'react'
import UserTypeSelector from './UserTypeSelector'
import { Button } from './ui/button'
import { updateDocumentAccess, removeCollaborator } from '@/lib/actions/room.actions'

const Collaborator = ({ roomId, creatorId, collaborator, email, user }: CollaboratorProps) => {

    const [userType, setUserType] = useState(collaborator.userType || 'viewer')
    const [loading, setLoading] = useState(false)

    const shareDocumentHandler = async (type: string) => {
        setLoading(true)

        await updateDocumentAccess({ roomId, email, userType: type as UserType, updatedBy: user })

        setLoading(false)
    }
    const removeCollaboratorHandler = async (email: string) => {
        setLoading(true)

        await removeCollaborator({ email, roomId })

        setLoading(false)

    }

    return (
        <li className='flex items-center justify-between gap-2 py-2'>
            <div className="flex gap-2">
                <Image
                    src={collaborator.avatar}
                    alt={collaborator.name}
                    width={36}
                    height={36}
                    className='size-9 rounded-full'
                />
                <div>
                    <p className='line-clamp-1 text-sm font-semibold leading-4 text-white'>
                        {collaborator.name}
                        <span className='text-sm pl-2 text-white'>
                            {loading && 'updating...'}
                        </span>
                    </p>
                    <p className='text-sm font-light text-white'>
                        {collaborator.email}
                    </p>
                </div>
            </div>
            {creatorId === collaborator.id ? (
                <p className="text-sm text-white">Owner</p>
            ) : ( creatorId === user.id ? ( <div className="flex items-center">
            <UserTypeSelector userType={userType as UserType} setUserType={setUserType || 'viewer'} onClickHandler={shareDocumentHandler} creatorId={creatorId}/>
            <Button className='bg-black' type="button" onClick={() => removeCollaboratorHandler(collaborator.email)}>Remove</Button>
        </div>): <></>)}
        </li>
    )
}

export default Collaborator