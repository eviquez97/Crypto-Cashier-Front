export async function GET() {
  return Response.json({
    message: "Frontend API Debug",
    api_base: process.env.NEXT_PUBLIC_API_BASE || 'NOT_SET',
    build_time: process.env.NEXT_PUBLIC_BUILD_TIME || 'NOT_SET',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  })
}
