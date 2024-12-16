'use client'

import { useSelf } from '@liveblocks/react/suspense';
import React, { useState } from 'react'
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { updateDocumentAccess } from '@/lib/actions/room.actions';


import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from './ui/button';
import Image from 'next/image';
import UserTypeSelector from './UserTypeSelector';
import Collaborator from './Collaborator';


function ShareModal({ roomId, collaborators, creatorId, currentUserType }: ShareDocumentDialogProps) {

  const user = useSelf()

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState('')
  const [userType, setUserType] = useState<UserType>('viewer')

  const shareDocumentHandler = async () => {
    setLoading(true)
    await updateDocumentAccess({ roomId, email, userType: userType as UserType, updatedBy: user.info })

    setLoading(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button className='flex h-9 gap-1 px-4'>
          <Image
            src="/assets/icons/share.svg"
            alt='Share'
            width={20}
            height={20}
            className='min-w-4 md:size-5'
          />
          <p className='mr-1 hidden sm:block'>
            Share
          </p>
        </Button>
      </DialogTrigger>
      <DialogContent className='shad-dialog'>
        <DialogHeader>
          <DialogTitle>Mange who can access this Document</DialogTitle>
          <DialogDescription>
            Select which users can view and edit this document
          </DialogDescription>
        </DialogHeader>
        <Label htmlFor='email' className='mt-6 text-white'>
          Email address
        </Label>
        <div className='flex items-center gap-3'>
          <div className='flex flex-1 rounded-md bg-[#191919]'>
            <Input
              id='email'
              placeholder='Enter their email address'
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
              }}
              className='share-input'
            />
            <UserTypeSelector
              userType={userType}
              setUserType={setUserType}
              creatorId={creatorId}
            
            />
          </div>
          <Button type='submit' onClick={shareDocumentHandler}
            className='flex h-full] gap-1 px-5 bg-black'>
            {loading ? 'Sending.....' : 'Invite'}
          </Button>
        </div>
        <div className='my-2 space-y-2'>
          <ul className='flex flex-col'>
            {collaborators.map((collaborator) => (
              <Collaborator
                key={collaborator.id}
                roomId={roomId}
                creatorId={creatorId}
                email={collaborator.email}
                collaborator={collaborator}
                user={user.info}
              />
            ))}
          </ul>
        </div>

      </DialogContent>
    </Dialog>

  )
}

export default ShareModal