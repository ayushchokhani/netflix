
import { NextRequest, NextResponse } from "next/server";

import prisma from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth";

export async function GET(req: NextRequest, {params}: {params: {movieId: string}}) {
  try {
    
    await serverAuth()

    const {movieId} = params

    if(typeof movieId !== "string") {
      throw new Error("Invalid id")
    }

    if(!movieId) {
      throw new Error("Invalid Id")
    }

    const movie = await prisma.movie.findUnique({
      where: {
        id: movieId
      }
    })

    if(!movie) {
      throw new Error("Invalid id")
    }

    return NextResponse.json(movie, {status: 200})

  } catch (error) {
    console.log(error);
    return NextResponse.json({status: 200})
  }
}