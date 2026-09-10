import { Link } from "react-router-dom";
import { useBookingDetails } from "../hooks/use-storage-details";

export const ConfirmationPage = () => {
  const { booking } = useBookingDetails();
  const { countryCode, timeZone } = booking;

  return (
    <section className="mx-auto mt-16 w-full max-w-md px-6">
      <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
        {/* Top half — confirmation */}
        <div className="flex flex-col items-center px-8 pb-8 pt-10 text-center">
          <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-full bg-blue-50">
            <svg
              className="h-5 w-5 text-blue-700"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M4 10.5L8 14.5L16 6.5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
            Booking received
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            A confirmation has been sent to your email. We'll follow up with
            your session date and time by email shortly.
          </p>
        </div>

        {/* Bottom half — booking details */}
        <div className="px-8 pb-8 pt-6">
          <dl className="space-y-3 border-t border-slate-100 pt-5 text-sm">
            {countryCode && (
              <div className="flex items-center justify-between">
                <dt className="text-slate-500">Country</dt>
                <dd className="text-slate-800">{countryCode}</dd>
              </div>
            )}
            {timeZone && (
              <div className="flex items-center justify-between">
                <dt className="text-slate-500">Timezone</dt>
                <dd className="text-slate-800">{timeZone}</dd>
              </div>
            )}
          </dl>

          <Link
            to="/instructor-schedule"
            className="mt-8 flex w-full items-center justify-center rounded-md  py-3.5  bg-blue-700  text-sm font-medium text-white transition-colors hover:bg-blue-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-700 "
          >
            Book another session
          </Link>
        </div>
      </div>
    </section>
  );
};
