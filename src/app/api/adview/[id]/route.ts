import { client } from '@/lib/sanity';
import { NextResponse } from 'next/server';

export async function POST(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  console.log(id);
  
  if (!id) {
    return NextResponse.json({ error: 'Ad ID is required' }, { status: 400 });
  }

  try {
    // Increment the view count
    await client
      .patch(id)
      .setIfMissing({ viewCount: 0 }) // Ensure the field exists
      .inc({ viewCount: 1 }) // Increment the count
      .commit();

    return NextResponse.json({ message: 'View count updated successfully' });
  } catch (error) {
    console.error('Error updating view count:', error);
    return NextResponse.json({ error: 'Failed to update view count' }, { status: 500 });
  }
}
