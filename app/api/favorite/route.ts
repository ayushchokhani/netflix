
import { NextRequest, NextResponse } from "next/server";
import { without } from "lodash";

import prisma from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth";

export async function POST(req: NextRequest) {
  try {
    const {currentUser} = await serverAuth()

    const body = await req.json()
    const {movieId} = body

    const existingMovie = await prisma.movie.findUnique({
      where: {
        id: movieId
      }
    })
    
    if(!existingMovie) {
      throw new Error("Invalid id")
    }

    const user = await prisma.user.update({
      where: {
        email: currentUser.email || ""
      },
      data: {
        favoriteIds: {
          push: movieId
        }
      }
    })

    return NextResponse.json(user, {status: 200})

  } catch (error) {
    console.log(error);
    return NextResponse.json({status: 400})
  }
}

export async function DELETE(req: NextRequest) {
  try {
    
    const {currentUser} = await serverAuth()

    const body = await req.json()
    const {movieId} = body

    const existingMovie = await prisma.movie.findUnique({
      where: {
        id: movieId
      }
    })

    if(!existingMovie) {
      throw new Error("Invalid id")
    }

    const updatedFavoriteIds = without(currentUser.favoriteIds, movieId)

    const updatedUser = await prisma.user.update({
      where: {
        email: currentUser.email || ""
      },
      data: {
        favoriteIds: updatedFavoriteIds
      }
    })

    return NextResponse.json(updatedUser, {status: 200})

  } catch (error) {
    console.log(error);
    return NextResponse.json({status: 400})
  }
}