import fs from 'fs/promises';
import { NextResponse } from 'next/server';
import path from 'path';

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), '.velite/docs.json');
    const raw = await fs.readFile(filePath, 'utf-8');
    const docs = JSON.parse(raw);

    return NextResponse.json({
      success: true,
      docs,
    });
  } catch (error) {
    console.error('[docs API] error:', error);

    return NextResponse.json(
      {
        success: false,
        message: 'Could not read docs',
      },
      { status: 500 },
    );
  }
}
