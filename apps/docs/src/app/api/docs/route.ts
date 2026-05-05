import { ContentRepository } from '@/lib/content-repository';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const docs = ContentRepository.getDocs();

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
