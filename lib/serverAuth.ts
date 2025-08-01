import { NextRequest } from "next/server";
import {auth} from "@/auth"

import prisma from "@/lib//prismadb";


const serverAuth = async () => {
  const session = await auth()

  if(!session?.user?.email) {
    throw new Error("Not signed in")
  }

  const currentUser = await prisma.user.findUnique({
    where: {
      email: session.user.email
    }
  })

  if(!currentUser) {
    throw new Error("Not signed in")
  }

  return {currentUser}
}

export default serverAuth