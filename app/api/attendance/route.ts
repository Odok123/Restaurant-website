import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

// Define validation schema for POST request body
const attendanceSchema = z.object({
  studentId: z.string().uuid('Invalid student ID'),
  courseId: z.string().uuid('Invalid course ID'),
  date: z.string().refine((val) => !isNaN(Date.parse(val)), 'Invalid date format'),
  status: z.enum(['present', 'absent', 'late'], 'Invalid status'), // Adjust enum values based on your Prisma schema
})

export async function GET() {
  try {
    const attendance = await prisma.attendance.findMany({
      include: {
        student: {
          include: {
            user: true,
          },
        },
        course: true,
      },
      orderBy: {
        date: 'desc',
      },
    })
    return NextResponse.json(attendance)
  } catch (error) {
    console.error('Error fetching attendance:', error)
    return NextResponse.json({ error: 'Failed to fetch attendance' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate input
    const validation = attendanceSchema.safeParse(body)
    if (!validation.success) {
      return NextResponse.json({ error: 'Validation failed', details: validation.error.errors }, { status: 400 })
    }
    
    const { studentId, courseId, date, status } = validation.data
    
    // Check if student exists
    const student = await prisma.student.findUnique({ where: { id: studentId } })
    if (!student) {
      return NextResponse.json({ error: 'Student not found' }, { status: 404 })
    }
    
    // Check if course exists
    const course = await prisma.course.findUnique({ where: { id: courseId } })
    if (!course) {
      return NextResponse.json({ error: 'Course not found' }, { status: 404 })
    }
    
    // Create attendance
    const attendance = await prisma.attendance.create({
      data: {
        studentId,
        courseId,
        date: new Date(date),
        status,
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
    
    return NextResponse.json(attendance, { status: 201 })
  } catch (error) {
    console.error('Error creating attendance:', error)
    return NextResponse.json({ error: 'Failed to create attendance' }, { status: 500 })
  }
}