// import { Link } from "react-router-dom";
// import { BookingCalendar } from "../components/day-picker";
// import { TimeZone } from "../components/timezone";

// export const Booking = () => {
//   return (
//     <section className="flex flex-col items-center px-6 pt-16 pb-16">
//       <div className="max-w-xl space-y-2 text-center">
//         <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
//           Schedule your session
//         </h1>
//         <p className="text-base text-slate-600">
//           Pick your country and a date that works for you.
//         </p>
//       </div>
//       <div className="mt-10 grid w-full max-w-3xl grid-cols-1 gap-8 rounded-lg border border-slate-200 bg-white p-8 md:grid-cols-2 md:items-start">
//         <div className="space-y-4">
//           <label className="text-sm font-medium text-slate-900">Country</label>
//           <TimeZone />
//         </div>

//         <div className="space-y-4">
//           <label className="text-sm font-medium text-slate-900">
//             Session date
//           </label>
//           <BookingCalendar />
//         </div>
//       </div>

//       <div className="mt-7 flex w-full max-w-3xl justify-end">
//         <Link
//           to="/instructor-schedule"
//           className="rounded-md bg-blue-700 px-6 py-2.5 text-center text-sm font-medium text-white transition-colors hover:bg-blue-800"
//         >
//           Next
//         </Link>
//       </div>
//     </section>
//   );
// };
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BookingCalendar } from "../components/day-picker";
import { TimeZone } from "../components/timezone";

const STORAGE_KEY = "booking-details";

export const Booking = () => {
  const [country, setCountry] = useState("");
  const [date, setDate] = useState<Date | undefined>(undefined);

  useEffect(() => {
    const booking = { country, date };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(booking));
  }, [country, date]);

  return (
    <section className="flex flex-col items-center px-6 pt-16 pb-16">
      <div className="max-w-xl space-y-2 text-center">
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
          Schedule your session
        </h1>
        <p className="text-base text-slate-600">
          Pick your country and a date that works for you.
        </p>
      </div>

      <div className="mt-10 grid w-full max-w-3xl grid-cols-1 gap-8 rounded-lg border border-slate-200 bg-white p-8 md:grid-cols-2 md:items-start">
        <div className="space-y-4">
          <label className="text-sm font-medium text-slate-900">Country</label>
          <TimeZone value={country} onChange={setCountry} />
        </div>

        <div className="space-y-4">
          <label className="text-sm font-medium text-slate-900">
            Session date
          </label>
          <BookingCalendar selected={date} onSelect={setDate} />
        </div>
      </div>

      <div className="mt-7 flex w-full max-w-3xl justify-end">
        <Link
          to="/instructor-schedule"
          className="rounded-md bg-blue-700 px-6 py-2.5 text-center text-sm font-medium text-white transition-colors hover:bg-blue-800"
        >
          Next
        </Link>
      </div>
    </section>
  );
};
