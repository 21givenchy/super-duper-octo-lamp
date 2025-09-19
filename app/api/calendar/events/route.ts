import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";
import { z } from "zod";

// Schema for creating calendar events
const createEventSchema = z.object({
  title: z.string().min(1, "Event title is required"),
  description: z.string().optional(),
  startDateTime: z.string().datetime(),
  endDateTime: z.string().datetime(),
  sdgCategory: z.string().optional(),
  recurrence: z.array(z.string()).optional(),
  accessToken: z.string().min(1, "Access token is required"),
  refreshToken: z.string().optional(),
});

// Create a new calendar event
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = createEventSchema.safeParse(body);
    
    if (!validatedData.success) {
      return NextResponse.json(
        { error: "Invalid event data", details: validatedData.error.errors },
        { status: 400 }
      );
    }

    const { 
      title, 
      description, 
      startDateTime, 
      endDateTime, 
      sdgCategory, 
      recurrence,
      accessToken,
      refreshToken 
    } = validatedData.data;

    // Set up Google Calendar API client
    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI
    );

    oauth2Client.setCredentials({
      access_token: accessToken,
      refresh_token: refreshToken,
    });

    const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

    // Create the event
    const event = {
      summary: title,
      description: `${description || ''}\n\n🌍 Sustainability Impact Tracking${sdgCategory ? `\n📊 SDG Category: ${sdgCategory}` : ''}\n\nCreated via F³ (Front Forum Focus)`,
      start: {
        dateTime: startDateTime,
        timeZone: 'America/Los_Angeles', // You might want to make this configurable
      },
      end: {
        dateTime: endDateTime,
        timeZone: 'America/Los_Angeles',
      },
      recurrence,
      colorId: '10', // Green color for sustainability events
    };

    const response = await calendar.events.insert({
      calendarId: 'primary',
      requestBody: event,
    });

    return NextResponse.json({
      success: true,
      eventId: response.data.id,
      eventLink: response.data.htmlLink,
    });
  } catch (error) {
    console.error("Calendar event creation error:", error);
    return NextResponse.json(
      { error: "Failed to create calendar event" },
      { status: 500 }
    );
  }
}

// Get calendar events
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const accessToken = searchParams.get('accessToken');
    const refreshToken = searchParams.get('refreshToken');

    if (!accessToken) {
      return NextResponse.json(
        { error: "Access token is required" },
        { status: 400 }
      );
    }

    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI
    );

    oauth2Client.setCredentials({
      access_token: accessToken,
      refresh_token: refreshToken,
    });

    const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

    // Get events from the last 30 days and next 30 days
    const timeMin = new Date();
    timeMin.setDate(timeMin.getDate() - 30);
    const timeMax = new Date();
    timeMax.setDate(timeMax.getDate() + 30);

    const response = await calendar.events.list({
      calendarId: 'primary',
      timeMin: timeMin.toISOString(),
      timeMax: timeMax.toISOString(),
      maxResults: 50,
      singleEvents: true,
      orderBy: 'startTime',
      q: 'F³ OR "Front Forum Focus" OR "Sustainability Impact"',
    });

    const events = response.data.items?.map(event => ({
      id: event.id,
      title: event.summary,
      description: event.description,
      start: event.start?.dateTime || event.start?.date,
      end: event.end?.dateTime || event.end?.date,
      htmlLink: event.htmlLink,
    })) || [];

    return NextResponse.json({ events });
  } catch (error) {
    console.error("Calendar events fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch calendar events" },
      { status: 500 }
    );
  }
}