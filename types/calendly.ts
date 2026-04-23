
/**
 * Calendly API Types
 */

export interface CreateInviteeParams {
  event_type: string;        // The URI of the event type being booked
  invitee_start_time: string; // The selected slot's start time in ISO8601 UTC
  name: string;
  email: string;
  timezone: string;           // Timezone of the invitee (e.g., 'America/New_York')
  answer_options?: Array<{
    question: string;
    answer: string;
  }>;
}

export interface CreateInviteeResponse {
  resource: {
    uri: string;
    name: string;
    email: string;
    status: 'active' | 'canceled';
    event: string; // URI of the created scheduled event
    created_at: string;
  };
}

// Ensure you also have the generic response structure if not already there
export interface CalendlyApiResponse<T> {
  collection: T;
  pagination?: {
    count: number;
    next_page?: string;
  };
}


export interface CalendlyApiResponse<T> {
  collection: T;
  pagination?: {
    count: number;
    next_page?: string;
  };
}

export interface GetAvailableTimesParams {
  event_type_uri: string; // The full Calendly URI for your event
  start_time: string;     // ISO8601 string
  end_time: string;       // ISO8601 string
}

export interface AvailableTimesData {
  status: 'available';
  start_time: string;     // ISO format from API
  invitees_remaining: number;
}
