// src/hooks/useBookingDetails.js
import { useState } from "react";

const STORAGE_KEY = "booking-details";

export const useBookingDetails = () => {
  const [booking] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (saved) {
      return JSON.parse(saved);
    }

    return { country: "", date: null };
  });

  return booking;
};
