import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const ids = searchParams.get('ids')

  if (!ids) {
    return NextResponse.json({ success: false, error: 'Please provide ids parameter' }, { status: 400 })
  }

  const idList = ids.split(',').slice(0, 4) // max 4 colleges

  try {
    const colleges = await prisma.college.findMany({
      where: { id: { in: idList } }
    })

    return NextResponse.json({ success: true, data: colleges })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}