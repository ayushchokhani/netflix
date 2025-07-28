
import { NextRequest, NextResponse } from "next/server";

import prisma from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth";

export async function GET(req: NextRequest) {
  try {
    await serverAuth()

    const movies = await prisma.movie.findMany()
    return NextResponse.json(movies, {status: 200})
  } catch (error) {
    console.log(error);
    return NextResponse.json({status: 400})
  }
}