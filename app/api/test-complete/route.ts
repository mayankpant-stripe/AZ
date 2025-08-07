import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  console.log('=== TEST COMPLETE ROUTE CALLED ===');
  console.log('Request URL:', request.url);
  
  const { searchParams } = new URL(request.url);
  const sessionId = searchParams.get('session_id');
  const customerId = searchParams.get('customer_id');
  const testClockId = searchParams.get('test_clock_id');
  
  console.log('Parameters:', { sessionId, customerId, testClockId });
  
  return NextResponse.json({
    success: true,
    message: 'Test complete route working',
    params: { sessionId, customerId, testClockId }
  });
} 