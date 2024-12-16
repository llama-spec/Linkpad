"use server";

import { nanoid } from "nanoid";
import { liveblocks } from "../liveblocks";
import { revalidatePath } from "next/cache";
import { getAccessType, parseStringify } from "../utils";
import { redirect } from "next/navigation";
import { User } from "lucide-react";

export const createDocument = async ({
  userId,
  email,
}: CreateDocumentParams) => {
  const roomId = nanoid();

  try {
    const metadata = {
      creatorId: userId,
      email,
      title: "Untitled",
    };

    const usersAccesses: RoomAccesses = {
      [email]: ["room:write"],
    };

    const room = await liveblocks.createRoom(roomId, {
      metadata,
      usersAccesses,
      defaultAccesses: [],
    });

    revalidatePath("/");

    return parseStringify(room);
  } catch (error) {
    console.log("Error: " + { error });
  }
};

export const getDocument = async ({
  roomId,
  userId,
}: {
  roomId: string;
  userId: string;
}) => {
  try {
    const room = await liveblocks.getRoom(roomId);

    const hasAccess = Object.keys(room.usersAccesses).includes(userId);

    if (!hasAccess) {
      throw new Error("Unauthorized access");
    }

    return parseStringify(room);
  } catch (error) {
    console.log(`Error while getting room: ${error}`);
  }
};

export const updateDocument = async (roomId: string, title: string) => {
  try {
    const updatedRoom = await liveblocks.updateRoom(roomId, {
      metadata: {
        title,
      },
    });

    revalidatePath(`/document/${roomId}`);

    return parseStringify(updatedRoom);

  } catch (err) {
    console.log(`Error while updating Title: ${err}`);
  }
};


export const getDocuments = async (email: string) => {
  try {
    const rooms = await liveblocks.getRooms({userId: email});

    return parseStringify(rooms);
  } catch (error) {
    console.log(`Error while getting rooms: ${error}`);
  }
};


export const updateDocumentAccess = async ( {roomId, email, userType, updatedBy }: ShareDocumentParams) => {
  try{
    const usersAccesses: RoomAccesses = {
      [email] : getAccessType(userType) as AccessType
    }

    const room = await liveblocks.updateRoom(roomId, {
      usersAccesses,
    })

    if(room){
      const notificationId = nanoid()

      await liveblocks.triggerInboxNotification({
        userId: email,
        kind: `$documentAccess`,
        subjectId:notificationId,
        activityData: {
          userType,
          title: `You have been granted ${userType} access to the document`,
          updatedBy: updatedBy.name,
          email: updatedBy.email,
          avatar: updatedBy.avatar
        },
        roomId
      })
    }

    revalidatePath(`/document/${roomId}`)
    return parseStringify(room);

  }catch(err){
    console.log(`Error while updating document access: ${err}`);
  }
}

export const removeCollaborator = async ({roomId, email}: {roomId: string, email: string }) => {

  try{
    const room = await liveblocks.getRoom(roomId);

    if(room.metadata.email === email){
      throw new Error("Cannot remove the creator of the document");
    }
    const updatedRoom = await liveblocks.updateRoom(roomId, {
      usersAccesses: {
        [email]: null
      }
    })

    revalidatePath(`/document/${roomId}`);
    return parseStringify(updatedRoom);

  }catch(err){
    console.log(`Error while removing ${err}`)
  }

}

export const deleteDocument = async (roomId: string) => {

  try{

    await liveblocks.deleteRoom(roomId);
    revalidatePath("/");
    redirect("/");

  }catch(err){
    console.log(`Error while deleting room   Error: ${err}`)
  }

}