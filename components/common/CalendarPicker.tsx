'use client';

import { useState, useMemo } from 'react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, isSameMonth, isToday, parseISO } from 'date-fns';
import { FiChevronLeft, FiChevronRight, FiGlobe } from 'react-icons/fi';

interface Spot {
  start_time: string;
}

interface Day {
  date: string;
  spots: Spot[];
}

interface CalendarPickerProps {
  days?: Day[];
  onSelectSpot?: (date: string, spot: Spot) => void;
  className?: string;
}

const WEEKDAYS = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

// Helper to format time - handles both ISO dates and plain time strings
function formatTime(timeValue: string): string {
  // If it's just a time like "19:30", prepend a dummy date
  if (timeValue.includes('T') || timeValue.includes('-')) {
    // Full ISO date
    return format(parseISO(timeValue), 'h:mma').toLowerCase();
  }
  // Just time string like "19:30"
  const [hours, minutes] = timeValue.split(':');
  const date = new Date(2000, 0, 1, parseInt(hours), parseInt(minutes));
  return format(date, 'h:mma').toLowerCase();
}

export function CalendarPicker({ days = [], onSelectSpot, className = '' }: CalendarPickerProps) {
  const [month, setMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  // Get calendar days for current month view
  const calendarDays = useMemo(() => {
    const start = startOfWeek(startOfMonth(month), { weekStartsOn: 1 });
    const end = endOfWeek(endOfMonth(month), { weekStartsOn: 1 });
    return eachDayOfInterval({ start, end });
  }, [month]);

  // Map of date -> spots for quick lookup
  const daysMap = useMemo(() => {
    const map = new Map<string, Spot[]>();
    days.forEach(d => map.set(d.date, d.spots));
    return map;
  }, [days]);

  const hasSpots = (date: Date) => daysMap.has(format(date, 'yyyy-MM-dd'));

  const handleDateClick = (date: Date) => {
    if (!isSameMonth(date, month)) return;
    const dateStr = format(date, 'yyyy-MM-dd');
    if (!hasSpots(date)) return;
    setSelectedDate(dateStr);
  };

  const selectedSpots = selectedDate ? daysMap.get(selectedDate) || [] : [];

  return (
    <div className={`flex flex-col lg:flex-row gap-6 lg:gap-8 relative text-white p-6 rounded-xl max-w-full ${className}`}>
      {/* Calendar */}
      <div className="flex-1 min-w-0">
        <h2 className="text-xl sm:text-2xl font-semibold mb-6 !text-white">Select a Date & Time</h2>

        <div className="flex items-center justify-between mb-4">
          <button
            type="button"
            onClick={() => setMonth(subMonths(month, 1))}
            className="p-2 hover:bg-white/20 rounded-full transition-colors"
            aria-label="Previous month"
          >
            <FiChevronLeft className="w-5 h-5 !text-white" aria-hidden="true" />
          </button>
          <span className="text-lg font-semibold !text-white">{format(month, 'MMMM yyyy')}</span>
          <button
            type="button"
            onClick={() => setMonth(addMonths(month, 1))}
            className="p-2 hover:bg-white/20 rounded-full transition-colors"
            aria-label="Next month"
          >
            <FiChevronRight className="w-5 h-5 !text-white" />
          </button>
        </div>

        <div className="grid grid-cols-7 gap-3 mb-4">
          {WEEKDAYS.map(d => (
            <div key={d} className="text-center text-base font-medium !text-white py-2">{d}</div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-3">
          {calendarDays.map((day, i) => {
            const inMonth = isSameMonth(day, month);
            const dateStr = format(day, 'yyyy-MM-dd');
            const selected = selectedDate === dateStr;
            const available = hasSpots(day);
            const today = isToday(day);

            return (
              <button
                type="button"
                key={i}
                onClick={() => handleDateClick(day)}
                disabled={!inMonth || !available}
                className={`
                  w-11 h-11 sm:w-14 sm:h-14 rounded-full text-base sm:text-lg font-medium transition-colors relative
                  ${!inMonth ? 'invisible' : ''}
                  ${inMonth && !available ? '!text-white/40 cursor-not-allowed' : ''}
                  ${inMonth && available && !selected ? '!text-white hover:bg-white/20' : ''}
                  ${selected ? '!bg-[#2A73EA] !text-white' : ''}
                `}
              >
                {format(day, 'd')}
                {today && (
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#2A73EA]"></span>
                )}
              </button>
            );
          })}
        </div>

        <div className="mt-6 flex items-center gap-2 text-sm">
          <FiGlobe className="w-4 h-4 !text-white" />
          <span className="!text-white">
            {Intl.DateTimeFormat().resolvedOptions().timeZone.replace(/_/g, ' ')}
          </span>
        </div>
      </div>

      {/* Spots */}
      <div className="w-full lg:w-64 lg:border-l lg:border-white/20 lg:pl-8 pt-6 lg:pt-0 border-t lg:border-t-0 border-white/20">
        {selectedDate ? (
          <>
            <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 !text-white">
              {format(parseISO(selectedDate), 'EEEE, MMMM d')}
            </h3>

            {selectedSpots.length > 0 ? (
              <div className="grid grid-cols-2 gap-2">
                {selectedSpots.map((spot, i) => (
                  <button
                    type="button"
                    key={i}
                    onClick={() => onSelectSpot?.(selectedDate, spot)}
                    className="w-full h-9 sm:h-10 text-xs sm:text-sm font-medium border-2 border-[#2A73EA] text-white bg-transparent rounded-lg hover:bg-[#2A73EA] transition-colors"
                  >
                    {formatTime(spot.start_time)}
                  </button>
                ))}
              </div>
            ) : (
              <p className="!text-white/60 text-sm">No times available</p>
            )}
          </>
        ) : (
          <div className="flex items-center justify-center h-24 lg:h-32 !text-white text-sm text-center">
            Select a date to view times
          </div>
        )}
      </div>
    </div>
  );
}

export default CalendarPicker;
