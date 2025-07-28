
import { NextRequest, NextResponse } from "next/server";

import serverAuth from "@/lib/serverAuth";

export async function GET(req: NextRequest) {
  try {
    const {currentUser} = await serverAuth()

    return NextResponse.json(currentUser, {status: 200} )
  } catch (error) {
    console.log(error);
    return NextResponse.json({error: "Not signed in"}, {status: 400} )
  }
}