import { google } from "googleapis";
import { calendar_v3 } from "googleapis";

export interface CalendarEvent {
  title: string;
  description?: string;
  startDateTime: string;
  endDateTime: string;
  sdgCategory?: string;
  recurrence?: string[];
}

export interface CalendarTokens {
  access_token: string;
  refresh_token?: string;
  expiry_date?: number;
}

export class GoogleCalendarService {
  private oauth2Client: InstanceType<typeof google.auth.OAuth2>;

  constructor() {
    this.oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI
    );
  }

  setCredentials(tokens: CalendarTokens) {
    this.oauth2Client.setCredentials(tokens);
  }

  async createSustainabilityEvent(event: CalendarEvent): Promise<calendar_v3.Schema$Event> {
    const calendar = google.calendar({ version: 'v3', auth: this.oauth2Client });

    const calendarEvent = {
      summary: `🌍 ${event.title}`,
      description: `${event.description || ''}\n\n📊 Sustainability Impact Tracking${event.sdgCategory ? `\n🎯 SDG Category: ${event.sdgCategory}` : ''}\n\nScheduled via F³ (Front Forum Focus) Platform`,
      start: {
        dateTime: event.startDateTime,
        timeZone: 'UTC',
      },
      end: {
        dateTime: event.endDateTime,
        timeZone: 'UTC',
      },
      recurrence: event.recurrence,
      colorId: '10', // Green color for sustainability
      extendedProperties: {
        private: {
          'f3-platform': 'true',
          'event-type': 'sustainability-tracking',
          'sdg-category': event.sdgCategory || '',
        }
      }
    };

    return await calendar.events.insert({
      calendarId: 'primary',
      requestBody: calendarEvent,
    });
  }

  async createWeeklyImpactReminder(): Promise<calendar_v3.Schema$Event> {
    const startDate = new Date();
    startDate.setHours(10, 0, 0, 0); // 10 AM
    
    const endDate = new Date(startDate);
    endDate.setHours(10, 30, 0, 0); // 30 minutes

    const event: CalendarEvent = {
      title: "Weekly Sustainability Impact Review",
      description: "Time to review and log your weekly sustainability activities and impact metrics.",
      startDateTime: startDate.toISOString(),
      endDateTime: endDate.toISOString(),
      sdgCategory: "Impact Tracking",
      recurrence: ["RRULE:FREQ=WEEKLY;BYDAY=MO"] // Every Monday
    };

    return await this.createSustainabilityEvent(event);
  }

  async createDailyImpactReminder(): Promise<calendar_v3.Schema$Event> {
    const startDate = new Date();
    startDate.setHours(18, 0, 0, 0); // 6 PM
    
    const endDate = new Date(startDate);
    endDate.setHours(18, 15, 0, 0); // 15 minutes

    const event: CalendarEvent = {
      title: "Daily Impact Check-in",
      description: "Quick daily reflection on sustainability actions and progress toward your impact goals.",
      startDateTime: startDate.toISOString(),
      endDateTime: endDate.toISOString(),
      sdgCategory: "Daily Tracking",
      recurrence: ["RRULE:FREQ=DAILY"] // Every day
    };

    return await this.createSustainabilityEvent(event);
  }

  async listUserEvents(timeRange?: { start: Date; end: Date }): Promise<calendar_v3.Schema$Event[]> {
    const calendar = google.calendar({ version: 'v3', auth: this.oauth2Client });

    const timeMin = timeRange?.start || new Date();
    const timeMax = timeRange?.end || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days from now

    const response = await calendar.events.list({
      calendarId: 'primary',
      timeMin: timeMin.toISOString(),
      timeMax: timeMax.toISOString(),
      maxResults: 100,
      singleEvents: true,
      orderBy: 'startTime',
      privateExtendedProperty: 'f3-platform=true',
    });

    return response.data.items || [];
  }
}

// Utility functions for sustainability event types
export const SustainabilityEventTemplates = {
  carbonFootprintReview: {
    title: "Carbon Footprint Review",
    description: "Review and calculate your weekly carbon footprint from transportation, energy use, and consumption.",
    duration: 30, // minutes
    sdgCategory: "Climate Action (SDG 13)"
  },

  sustainableShoppingPlanning: {
    title: "Sustainable Shopping Planning",
    description: "Plan sustainable and ethical purchases, research eco-friendly alternatives.",
    duration: 45,
    sdgCategory: "Responsible Consumption (SDG 12)"
  },

  communityImpactProject: {
    title: "Community Impact Project",
    description: "Work on local community sustainability initiatives and volunteer activities.",
    duration: 120,
    sdgCategory: "Sustainable Communities (SDG 11)"
  },

  energyEfficiencyAudit: {
    title: "Home Energy Efficiency Audit",
    description: "Assess and improve home energy efficiency, track utility usage.",
    duration: 60,
    sdgCategory: "Clean Energy (SDG 7)"
  },

  sustainabilityEducation: {
    title: "Sustainability Learning Session",
    description: "Research and learn about sustainability topics, read articles, watch documentaries.",
    duration: 30,
    sdgCategory: "Quality Education (SDG 4)"
  }
};

// Helper function to create event from template
export function createEventFromTemplate(
  template: typeof SustainabilityEventTemplates[keyof typeof SustainabilityEventTemplates],
  startDateTime: Date
): CalendarEvent {
  const endDateTime = new Date(startDateTime.getTime() + template.duration * 60 * 1000);
  
  return {
    title: template.title,
    description: template.description,
    startDateTime: startDateTime.toISOString(),
    endDateTime: endDateTime.toISOString(),
    sdgCategory: template.sdgCategory
  };
}