import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    // Path to the ramadan.json file
    const filePath = path.join(process.cwd(), 'src', 'data', 'ramadan.json');
    
    // Read the file
    const fileContents = fs.readFileSync(filePath, 'utf8');
    
    // Parse the JSON
    const data = JSON.parse(fileContents);
    
    // Return the data
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error reading Ramadan data:', error);
    return NextResponse.json(
      { error: 'Failed to load Ramadan data' },
      { status: 500 }
    );
  }
} 