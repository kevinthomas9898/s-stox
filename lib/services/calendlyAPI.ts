import api from '@/lib/api/axiosInstance';
import type {
  AvailableSlotsResponse,
  GetAvailableSlotsParams,
  AvailableDayWithSpots,
} from '@/types/calendly';

/**
 * Get available meeting slots from Ambassador API.
 * Returns days with available time slots for the given date range.
 */
export async function getAmbassadorAvailableSlots(
  params: GetAvailableSlotsParams
): Promise<AvailableDayWithSpots[]> {
  const { data } = await api.get<AvailableSlotsResponse>(
    '/Ambassador/available-slots',
    { params }
  );
  return data.data.days;
}
