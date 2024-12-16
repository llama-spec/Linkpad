"use client"
import Loader from '@/components/Loader'
import { ClientSideSuspense, LiveblocksProvider } from '@liveblocks/react/suspense'
import React from 'react'
import { getClerkUsers, getDocumentUsers } from '@/lib/actions/user.action'
import { ReactNode } from 'react'
import { useUser } from '@clerk/nextjs'
export default function Provider({ children }: { children: React.ReactNode }) {
  const {user: clerkUser} = useUser()  
  
  return (

    <LiveblocksProvider
      authEndpoint="/api/liveblocks-auth"
      resolveUsers={async ({ userIds }) => {
        const users = await getClerkUsers({ userIds })
        return users
      }}
      resolveMentionSuggestions={async ({ text, roomId }) => {
        const roomUsers = await getDocumentUsers({
          roomId,
          currentUser: clerkUser?.emailAddresses[0].emailAddress!,
          text,
        })
        return roomUsers
      }}
    >
      <ClientSideSuspense fallback={<Loader />}>
        {children}
      </ClientSideSuspense>
    </LiveblocksProvider >
  )
}
