
import { NextRequest, NextResponse } from "next/server";

import prisma from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth";

export async function GET(req: NextRequest) {
  try {
    
    const {currentUser} = await serverAuth()
    const favoriteMovies = await prisma.movie.findMany({
      where: {
        id: {
          in: currentUser?.favoriteIds
        }
      }
    })

    return NextResponse.json(favoriteMovies, {status: 200})

  } catch (error) {
    console.log(error);
    return NextResponse.json({status: 400})
  }
}