import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params

    const college = await prisma.college.findUnique({
      where: { id }
    })

    if (!college) {
      return NextResponse.json({ success: false, error: 'College not found' }, { status: 404 })
    }

    return NextResponse.json({ success: true, data: college })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}