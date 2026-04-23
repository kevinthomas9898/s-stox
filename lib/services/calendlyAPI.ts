import api from '@/lib/api/axiosInstance';
import type {
  CalendlyApiResponse,
  AvailableTimesData,
  GetAvailableTimesParams,
  CreateInviteeParams,
  CreateInviteeResponse,
} from '@/types/calendly';

/**
 * Get available time slots for a specific event type.
 * Note: 'start_time' and 'end_time' must be in ISO8601 format.
 */
export async function getAvailableTimes(
  params: GetAvailableTimesParams
): Promise<AvailableTimesData[]> {
  const { data } = await api.get<CalendlyApiResponse<AvailableTimesData[]>>(
    '/event_type_available_times', 
    { params }
  );
  return data.collection;
}

/**
 * Programmatically create a new invitee (Book the meeting).
 * This uses the Scheduling API to bypass the standard Calendly UI.
 */
export async function createInvitee(
  params: CreateInviteeParams
): Promise<CreateInviteeResponse> {
  const { data } = await api.post<CreateInviteeResponse>(
    '/scheduled_events/invitees',
    params
  );
  return data;
}
