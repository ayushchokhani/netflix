
export const dynamic = 'force-dynamic'

import { auth } from "@/auth";
import ProfileHome from "@/components/ProfileHome";
import { redirect } from "next/navigation";

export default async function Profiles() {

  const session = await auth()

  if(!session) {
    redirect('/auth')
  }

  return ( 
    <ProfileHome />
  );
}
