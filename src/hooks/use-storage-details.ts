import { useState, useEffect } from "react";

const STORAGE_KEY = "booking-details";

interface BookingDetails {
  countryCode: string;
  timeZone: string;
  date: Date | undefined;
}

const getInitialBooking = (): BookingDetails => {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    const parsed = JSON.parse(saved);
    return {
      countryCode: parsed.countryCode ?? "",
      timeZone: parsed.timeZone ?? "",
      date: parsed.date ? new Date(parsed.date) : undefined,
    };
  }
  return { countryCode: "", timeZone: "", date: undefined };
};

export const useBookingDetails = () => {
  const [booking, setBooking] = useState<BookingDetails>(getInitialBooking);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(booking));
  }, [booking]);

  const setCountryCode = (countryCode: string) =>
    setBooking((prev) => ({ ...prev, countryCode }));

  const setTimeZone = (timeZone: string) =>
    setBooking((prev) => ({ ...prev, timeZone }));

  const setDate = (date: Date | undefined) =>
    setBooking((prev) => ({ ...prev, date }));

  return { booking, setCountryCode, setTimeZone, setDate };
};
