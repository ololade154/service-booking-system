import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { TimeZone } from "../components/timezone";
const STORAGE_KEY = "booking-details";
export const Booking = () => {
  const [countryCode, setCountryCode] = useState("");
  const [timeZone, setTimeZone] = useState("");
  useEffect(() => {
    const booking = { countryCode, timeZone };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(booking));
  }, [countryCode, timeZone]);

  return (
    <section className="flex flex-col items-center px-6 pt-16 pb-16">
      <div className="max-w-xl space-y-2 text-center">
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
          Schedule your session
        </h1>
        <p className="text-base text-slate-600">
          Pick your country that works for you.
        </p>
      </div>

      <div className="mt-10 w-full max-w-3xl rounded-lg border border-slate-200 bg-white p-8 shadow-sm">
        <p className="mt-1 text-sm text-slate-500">
          We'll use this to show session time and day in your local timezone.
        </p>

        <div className="mt-4">
          <TimeZone
            countryCode={countryCode}
            timeZone={timeZone}
            onCountryChange={setCountryCode}
            onTimeZoneChange={setTimeZone}
          />
        </div>

        {timeZone && (
          <p className="mt-4 rounded-md bg-slate-50 px-3 py-2 text-sm text-slate-600">
            Time and day will be shown in
            <span className="font-medium text-slate-900">{timeZone}</span>.
          </p>
        )}
      </div>

      <div className="mt-7 flex w-full max-w-3xl items-center justify-end">
        <Link
          to="/instructor-schedule"
          aria-disabled={!countryCode}
          onClick={(e) => {
            if (!countryCode) e.preventDefault();
          }}
          className={`rounded-md px-6 py-2.5 text-center text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
            countryCode
              ? "bg-blue-700 text-white hover:bg-blue-800 focus-visible:ring-blue-700"
              : "cursor-not-allowed bg-slate-100 text-slate-400"
          }`}
        >
          Next
        </Link>
      </div>
    </section>
  );
};
