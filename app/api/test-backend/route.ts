export async function GET() {
  try {
    const response = await fetch('https://crypto-cashier-production.up.railway.app/__version__')
    const data = await response.json()
    
    return Response.json({
      success: true,
      backend_reachable: true,
      backend_data: data
    })
  } catch (error) {
    return Response.json({
      success: false,
      backend_reachable: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    })
  }
}

