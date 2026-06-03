import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

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

    const colleges = saved.map((s: { college: any }) => s.college)
    return NextResponse.json({ success: true, data: colleges })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}