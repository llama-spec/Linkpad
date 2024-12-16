import { SignIn } from '@clerk/nextjs'
import { dark } from '@clerk/themes'

export default function Page() {
  return (
    <main className='auth-page'>
        <SignIn/>
    </main>
  )
}