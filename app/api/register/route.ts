import bcrypt from "bcrypt"
import prisma from "@/lib/prismadb"
import {  NextResponse } from "next/server";

export async function POST(request: Request) {

  try {
    const body = await request.json()
    const { email, name, password} = body;

    const existingUser = await prisma.user.findUnique({
      where: {
        email
      }
    })


    if(existingUser) {
      return NextResponse.json({error: "Email taken"}, {status: 422})
    }

    const hashedPassword = await bcrypt.hash(password, 12)
    const user = await prisma.user.create({
      data: {
        email, 
        name,
        hashedPassword,
        image: "",
        emailVerified: new Date(),

      }
    })

    return NextResponse.json(user, {status: 200})

  } catch (error) {
    console.log(error);
    return NextResponse.json({error: "Internal error"}, {status: 400})
  }
}