import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const grades = await prisma.grade.findMany({
      include: {
        student: {
          include: {
            user: true,
          },
        },
        course: true,
      },
    })
    return NextResponse.json(grades)
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { studentId, courseId, grade } = await request.json()

    const existingGrade = await prisma.grade.findFirst({
      where: {
        studentId,
        courseId,
      },
    })

    if (existingGrade) {
      const updatedGrade = await prisma.grade.update({
        where: { id: existingGrade.id },
        data: { grade },
        include: {
          student: {
            include: {
              user: true,
            },
          },
          course: true,
        },
      })
      return NextResponse.json(updatedGrade)
    } else {
      const newGrade = await prisma.grade.create({
        data: {
          studentId,
          courseId,
          grade,
        },
        include: {
          student: {
            include: {
              user: true,
            },
          },
          course: true,
        },
      })
      return NextResponse.json(newGrade, { status: 201 })
    }
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}