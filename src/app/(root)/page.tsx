import Image from "next/image";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import { SignIn, SignedIn, UserButton } from "@clerk/nextjs";
import AddDocumentBtn from "@/components/AddDocumentBtn";
import { EmailAddress, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getDocuments } from "@/lib/actions/room.actions";
import Link from "next/link";
import { dateConverter } from "@/lib/utils";
import {DeleteModal} from "@/components/DeleteModal";
import {Notifications} from "@/components/Notifications";

export default async function Home() {
  const clerkUser = await currentUser()
  if (!clerkUser) {
    redirect('/sign-in')
  }
  const roomDocuments = await getDocuments(clerkUser.emailAddresses[0].emailAddress)
  return (
    <>
      <main className="home-container">
        <Header className="sticky left-0 top-0">
          <div className="flex items-center gap-2 lg:gap-4">
            <Notifications></Notifications>
            <SignedIn>
              <UserButton></UserButton>
            </SignedIn>
          </div>
        </Header>
        {roomDocuments.data.length > 0 ? (
          <div className="document-list-container">
            <div className="document-list-title">
              <h3 className="text-28-semibold">Current Documents</h3>
              <AddDocumentBtn
                userId={clerkUser.id}
                email={clerkUser.emailAddresses[0].emailAddress} />
            </div>
            <ul className="document-ul">
              {roomDocuments.data.map((document: any) => (
                <li key={document.id} className="document-list-item">
                  <Link href={`/document/${document.id}`} className="flex flex-1 items-center gap-4 hover:bg-[#0000008a] p-2 rounded-md">
                    <div className="hidden rounded-md p-2 sm:block">
                      <Image
                        src='/assets/icons/doc.svg'
                        alt="file"
                        height={30}
                        width={30}>
                      </Image>
                    </div>
                    <div className="space-y-1">
                      <p className="line-clamp-1 text-lg">{document.metadata.title}</p>
                      <p className="text-sm font-light text-stone-300">Created {dateConverter(document.createdAt)}</p>
                    </div>
                  </Link>
                  <DeleteModal roomId={document.id}></DeleteModal>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="document-list-empty ">
            <Image src="/assets/icons/doc.svg"
              alt="Document"
              height={32}
              width={32}
              className="mx-auto">
            </Image>
            <AddDocumentBtn userId={clerkUser.id} email={clerkUser.emailAddresses[0].emailAddress}>

            </AddDocumentBtn>
          </div>
        )}
      </main>
    </>
  );
}
