// import { useState } from "react";
// import { DateTime } from "luxon";

// import type { IScheduleProps } from "../data/data.types";
// import { scheduleData } from "../data/schedule.data";
// import { useBookingDetails } from "../hooks/use-storage-details";

// const formatTimeRange = (time: string) => {
//   const [start, end] = time
//     .toLowerCase()
//     .replace(/\s+/g, "")
//     .split("-")
//     .map((part) =>
//       part
//         .replace(/(am|pm)/, " $1")
//         .trim()
//         .toUpperCase(),
//     );
//   return `${start} – ${end}`;
// };

// export const InstructorSchedule = () => {
//   const booking = useBookingDetails();
//   const [currentDateTime] = useState<DateTime>(DateTime.now());
//   const today = currentDateTime.weekdayLong?.toLowerCase();
//   if (booking.country && booking.date === currentDateTime) {
//     return <p>Booking slot is available</p>;
//   } else {
//     <p>No booking slot</p>;
//   }
//   return (
//     <section className="mx-auto mt-16 w-full max-w-md">
//       <header className="mb-8 space-y-1 text-center">
//         <h1 className="font-serif text-3xl font-semibold text-stone-900">
//           Instructor Schedule
//         </h1>
//         <p className="text-base text-stone-500">Weekly availability (WAT)</p>
//       </header>

//       <ul className="divide-y divide-stone-200 border-y border-stone-200">
//         {scheduleData.map(({ day, time }: IScheduleProps) => {
//           const isToday = day === today;
//           return (
//             <li
//               key={day}
//               className={`flex items-center justify-between border-l-4 py-4 pl-4 pr-2 ${
//                 isToday
//                   ? "border-emerald-800 bg-emerald-50"
//                   : "border-transparent"
//               }`}
//             >
//               <span className="font-medium capitalize text-stone-800">
//                 {day}
//                 {isToday && (
//                   <span className="ml-2 text-xs font-normal text-emerald-700">
//                     Today
//                   </span>
//                 )}
//               </span>
//               <span className="tabular-nums text-stone-600">
//                 {formatTimeRange(time)}
//               </span>
//             </li>
//           );
//         })}
//       </ul>
//     </section>
//   );
// };
import { DateTime } from "luxon";

import type { IScheduleProps } from "../data/data.types";
import { scheduleData } from "../data/schedule.data";
import { useBookingDetails } from "../hooks/use-storage-details";
import { Link } from "react-router-dom";

const NIGERIA_TZ = "Africa/Lagos";

const formatTimeRange = (time: string) => {
  const [start, end] = time
    .toLowerCase()
    .replace(/\s+/g, "")
    .split("-")
    .map((part) =>
      part
        .replace(/(am|pm)/, " $1")
        .trim()
        .toUpperCase(),
    );
  return `${start} – ${end}`;
};

export const InstructorSchedule = () => {
  const booking = useBookingDetails();
  const today = DateTime.now().setZone(NIGERIA_TZ).weekdayLong?.toLowerCase();

  // Turn the saved booking date string back into a weekday name, e.g. "tuesday"
  const bookedDay = booking.date
    ? DateTime.fromISO(booking.date).weekdayLong?.toLowerCase()
    : null;

  const hasBooking = Boolean(booking.country && bookedDay);

  return (
    <section className="mx-auto mt-16 w-full max-w-md">
      <header className="mb-8 space-y-1 text-center">
        <h1 className="font-serif text-3xl font-semibold text-stone-900">
          Instructor Schedule
        </h1>
        <p className="text-base text-stone-500">Weekly availability (WAT)</p>
        {hasBooking ? (
          <p className="pt-2 text-sm text-emerald-700">
            Booking slot is available
          </p>
        ) : (
          <p className="pt-2 text-sm text-stone-400">No booking slot</p>
        )}
      </header>

      <ul className="divide-y divide-stone-200 border-y border-stone-200">
        {scheduleData.map(({ day, time }: IScheduleProps) => {
          const isToday = day === today;
          const isBooked = day === bookedDay;
          return (
            <li
              key={day}
              className={`flex items-center justify-between border-l-4 py-4 pl-4 pr-2 ${
                isBooked
                  ? "border-blue-700 bg-blue-50"
                  : isToday
                    ? "border-emerald-800 bg-emerald-50"
                    : "border-transparent"
              }`}
            >
              <span className="font-medium capitalize text-stone-800">
                {day}
                {isBooked && (
                  <span className="ml-2 text-xs font-normal text-blue-700">
                    Booked
                  </span>
                )}
                {isToday && !isBooked && (
                  <span className="ml-2 text-xs font-normal text-emerald-700">
                    Today
                  </span>
                )}
              </span>
              <span className="tabular-nums text-stone-600">
                {formatTimeRange(time)}
              </span>
            </li>
          );
        })}
      </ul>

      <div className="mt-7 flex w-full max-w-3xl justify-end">
        <Link
          to="/bookings"
          className="rounded-md bg-blue-700 px-6 py-2.5 text-center text-sm font-medium text-white transition-colors hover:bg-blue-800"
        >
          Back
        </Link>
      </div>
    </section>
  );
};
