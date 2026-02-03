import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { hashPassword } from '@/lib/auth'

export async function GET() {
  try {
    const teachers = await prisma.teacher.findMany({
      include: {
        user: true,
        courses: true,
      },
    })
    return NextResponse.json(teachers)
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { email, password, name } = await request.json()

    const hashedPassword = await hashPassword(password)

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role: 'teacher',
      },
    })

    const teacher = await prisma.teacher.create({
      data: { userId: user.id },
      include: {
        user: true,
      },
    })

    return NextResponse.json(teacher, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}