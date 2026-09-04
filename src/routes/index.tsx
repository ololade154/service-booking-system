import { Routes, Route } from "react-router-dom";

import { Home } from "../pages/home";
import { Booking } from "../pages/booking";
import { InstructorSchedule } from "../pages/schedule";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/bookings" element={<Booking />} />
      <Route path="/instructor-schedule" element={<InstructorSchedule />} />
    </Routes>
  );
};
