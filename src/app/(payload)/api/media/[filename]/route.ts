// app/api/media/[filename]/route.ts
import { NextRequest, NextResponse } from 'next/server'
import fs from 'node:fs'
import path from 'node:path'

export async function GET(request: NextRequest, { params }: { params: { filename: string } }) {
  const filename = params.filename

  // Define the exact path matching your Payload config
  const storageDir = '/opt/render/project/src/media'
  const filePath = path.join(storageDir, filename)

  try {
    // 1. Check if the file actually exists on Render's disk
    if (!fs.existsSync(filePath)) {
      return new NextResponse('Image Not Found', { status: 404 })
    }

    // 2. Read the file stream
    const fileBuffer = fs.readFileSync(filePath)

    // 3. Determine basic content-type based on extension
    const ext = path.extname(filename).toLowerCase()
    let contentType = 'image/jpeg'
    if (ext === '.png') contentType = 'image/png'
    if (ext === '.webp') contentType = 'image/webp'
    if (ext === '.svg') contentType = 'image/svg+xml'

    // 4. Stream the file back to the browser
    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000, immutable', // Optimize delivery
      },
    })
  } catch (error) {
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
