import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    version: '2.0.0-PREMIUM-UI',
    timestamp: new Date().toISOString(),
    ui_redesign: true,
    palette: {
      dark: '#242834',
      purple: '#7D53FF',
      neon: '#B6FF00',
      light: '#F5F6FA'
    },
    components: [
      'Button.tsx',
      'MetricCard.tsx',
      'Toast.tsx'
    ],
    pages: [
      'Landing Premium',
      'Dashboard Interactive'
    ]
  });
}

