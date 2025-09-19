import { NextResponse } from "next/server";
import { google } from "googleapis";

export async function GET() {
  try {
    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI
    );

    // Generate the OAuth2 URL for Google Calendar access
    const authUrl = oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: [
        'https://www.googleapis.com/auth/calendar',
        'https://www.googleapis.com/auth/calendar.events'
      ],
      prompt: 'consent'
    });

    return NextResponse.json({ authUrl });
  } catch (error) {
    console.error("Google OAuth URL generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate Google OAuth URL" },
      { status: 500 }
    );
  }
}