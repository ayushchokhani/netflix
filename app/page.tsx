// app/page.tsx
export const dynamic = 'force-dynamic'

import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import ClientHome from '@/components/ClientHome'

export default async function Home() {
  const session = await auth()
  

  if (!session) {
    redirect('/auth')
  }

  return <ClientHome />
}
