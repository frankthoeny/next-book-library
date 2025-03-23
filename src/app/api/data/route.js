import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const res = await fetch('https://freetestapi.com/api/v1/books');
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json();
    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch data:", error);
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}