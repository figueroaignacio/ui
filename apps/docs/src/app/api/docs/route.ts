import { getDocs } from '@/features/docs/lib/get-docs';
import { getLocale } from 'next-intl/server';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const locale = await getLocale();
    const docs = getDocs(locale);

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
