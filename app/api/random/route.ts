
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

import serverAuth from "@/lib/serverAuth";

export async function GET(req: NextRequest) {
  try {
    await serverAuth()

    const movieCount = await prisma.movie.count()
    const randomIndex = Math.floor(Math.random() * movieCount)

    const randomMovies = await prisma.movie.findMany({
      take: 1,
      skip: randomIndex
    })

    return NextResponse.json(randomMovies[0], {status: 200})

  } catch (error) {
    console.log(error);
    return NextResponse.json( {status: 400})
  }
}