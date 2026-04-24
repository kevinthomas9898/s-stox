/**
 * Ambassador Available Slots API Types
 */

export interface AvailableSlot {
  start_time: string; // ISO format
}

export interface AvailableDayWithSpots {
  date: string; // YYYY-MM-DD
  spots: AvailableSlot[];
}

export interface GetAvailableSlotsParams {
  startDate: string; // YYYY-MM-DD
  endDate: string;   // YYYY-MM-DD
}

export interface AvailableSlotsResponse {
  status: boolean;
  data: {
    days: AvailableDayWithSpots[];
  };
  message: string;
}
