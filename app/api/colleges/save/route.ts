import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// Save a college
export async function POST(req: NextRequest) {
  try {
    const { userId, collegeId } = await req.json()

    if (!userId || !collegeId) {
      return NextResponse.json({ success: false, error: 'userId and collegeId are required' }, { status: 400 })
    }

    const saved = await prisma.savedCollege.create({
      data: { userId, collegeId }
    })

    return NextResponse.json({ success: true, data: saved })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}

// Get saved colleges for a user
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const userId = searchParams.get('userId')

    if (!userId) {
      return NextResponse.json({ success: false, error: 'userId is required' }, { status: 400 })
    }

    const saved = await prisma.savedCollege.findMany({
      where: { userId },
      include: { college: true }
    })

    return NextResponse.json({ success: true, data: saved.map(s => s.college) })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}