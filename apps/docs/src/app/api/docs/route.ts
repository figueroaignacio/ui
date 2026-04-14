import { getDocs } from '@/features/docs/lib/get-docs';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const docs = getDocs();

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
