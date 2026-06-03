import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const search = searchParams.get('search') || ''
  const location = searchParams.get('location') || ''
  const minFees = parseInt(searchParams.get('minFees') || '0')
  const maxFees = parseInt(searchParams.get('maxFees') || '9999999')

  try {
    const colleges = await prisma.college.findMany({
      where: {
        AND: [
          { name: { contains: search, mode: 'insensitive' } },
          location ? { location: { contains: location, mode: 'insensitive' } } : {},
          { fees: { gte: minFees, lte: maxFees } },
        ]
      },
      orderBy: { rating: 'desc' }
    })

    return NextResponse.json({ success: true, data: colleges })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch colleges' }, { status: 500 })
  }
}