export const dynamic = 'force-dynamic'
import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@/payload.config'

export async function POST(request: Request) {
  try {
    const payload = await getPayload({ config })
    const body = await request.json()

    const entry = await payload.create({
      collection: 'inquiries',
      data: body,
    })

    return NextResponse.json(entry, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error processing lead' }, { status: 500 })
  }
}
