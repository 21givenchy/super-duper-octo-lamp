"use client";

import { useState, useEffect, memo } from "react";
import { Button } from "@/components/ui/button";
import { CalendarIcon, CheckIcon, AlertCircleIcon } from "lucide-react";
import { CalendarTokens } from "@/lib/google-calendar";

interface GoogleCalendarIntegrationProps {
  onIntegrationSuccess?: (tokens: CalendarTokens) => void;
  className?: string;
}

const GoogleCalendarIntegration = memo(({
  onIntegrationSuccess,
  className = ""
}: GoogleCalendarIntegrationProps) => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check URL parameters for auth success/error
    const urlParams = new URLSearchParams(window.location.search);
    const authSuccess = urlParams.get('auth_success');
    const authError = urlParams.get('auth_error');
    const tokens = urlParams.get('tokens');

    if (authSuccess === 'true' && tokens) {
      try {
        const decodedTokens = JSON.parse(atob(tokens));
        setIsConnected(true);
        setError(null);
        
        // Store tokens in localStorage (in production, you'd want more secure storage)
        localStorage.setItem('google_calendar_tokens', JSON.stringify(decodedTokens));
        
        // Call success callback
        onIntegrationSuccess?.(decodedTokens);

        // Clean up URL parameters
        window.history.replaceState({}, document.title, window.location.pathname);
      } catch {
        setError("Failed to process authentication tokens");
      }
    } else if (authError) {
      setError(`Authentication failed: ${authError}`);
      setIsConnecting(false);
    }

    // Check if already connected (from localStorage)
    const storedTokens = localStorage.getItem('google_calendar_tokens');
    if (storedTokens && !isConnected) {
      try {
        const parsedTokens = JSON.parse(storedTokens);
        // Check if tokens are not expired
        if (!parsedTokens.expiry_date || parsedTokens.expiry_date > Date.now()) {
          setIsConnected(true);
        }
      } catch {
        localStorage.removeItem('google_calendar_tokens');
      }
    }
  }, [onIntegrationSuccess, isConnected]);

  const handleConnectCalendar = async () => {
    setIsConnecting(true);
    setError(null);

    try {
      const response = await fetch('/api/auth/google');
      const data = await response.json();

      if (response.ok && data.authUrl) {
        // Redirect to Google OAuth
        window.location.href = data.authUrl;
      } else {
        setError("Failed to initiate Google authentication");
        setIsConnecting(false);
      }
    } catch {
      setError("Failed to connect to Google Calendar");
      setIsConnecting(false);
    }
  };

  const handleCreateWeeklyReminder = async () => {
    try {
      const tokens = JSON.parse(localStorage.getItem('google_calendar_tokens') || '{}');
      
      const response = await fetch('/api/calendar/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: "Weekly Sustainability Impact Review",
          description: "Time to review and log your weekly sustainability activities and impact metrics.",
          startDateTime: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // Tomorrow
          endDateTime: new Date(Date.now() + 24 * 60 * 60 * 1000 + 30 * 60 * 1000).toISOString(), // 30 minutes later
          sdgCategory: "Impact Tracking",
          recurrence: ["RRULE:FREQ=WEEKLY;BYDAY=MO"],
          accessToken: tokens.access_token,
          refreshToken: tokens.refresh_token,
        }),
      });

      if (response.ok) {
        setError(null);
        // You might want to show a success message here
      } else {
        setError("Failed to create calendar reminder");
      }
    } catch {
      setError("Failed to create calendar reminder");
    }
  };

  if (isConnected) {
    return (
      <div className={`bg-green-900/20 border border-green-600/30 rounded-lg p-4 ${className}`}>
        <div className="flex items-center mb-3">
          <CheckIcon className="w-5 h-5 text-green-400 mr-2" />
          <h3 className="text-sm font-medium text-green-400">Calendar Connected</h3>
        </div>
        <p className="text-xs text-gray-300 mb-3">
          Your Google Calendar is connected! Set up automated sustainability tracking reminders.
        </p>
        <Button
          onClick={handleCreateWeeklyReminder}
          size="sm"
          className="bg-green-600 hover:bg-green-700 text-white text-xs"
        >
          Create Weekly Impact Reminder
        </Button>
      </div>
    );
  }

  return (
    <div className={`bg-zinc-900/50 border border-zinc-700 rounded-lg p-4 ${className}`}>
      <div className="flex items-center mb-3">
        <CalendarIcon className="w-5 h-5 text-teal-400 mr-2" />
        <h3 className="text-sm font-medium text-white">Connect Google Calendar</h3>
      </div>
      <p className="text-xs text-gray-300 mb-3">
        Sync your sustainability tracking activities with Google Calendar for better planning and consistency.
      </p>
      
      {error && (
        <div className="flex items-center mb-3 text-red-400">
          <AlertCircleIcon className="w-4 h-4 mr-1" />
          <span className="text-xs">{error}</span>
        </div>
      )}

      <Button
        onClick={handleConnectCalendar}
        disabled={isConnecting}
        size="sm"
        className="bg-teal-600 hover:bg-teal-700 text-white text-xs"
      >
        {isConnecting ? "Connecting..." : "Connect Calendar"}
      </Button>
      
      <div className="mt-3 text-xs text-gray-400">
        <p>✓ Schedule sustainability activities</p>
        <p>✓ Set up impact tracking reminders</p>
        <p>✓ Sync with your existing calendar</p>
      </div>
    </div>
  );
});

GoogleCalendarIntegration.displayName = "GoogleCalendarIntegration";

export { GoogleCalendarIntegration };