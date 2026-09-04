import { Link } from "react-router-dom";

export const Hero = () => {
  return (
    <section className="flex flex-col items-center pt-20 pb-16 px-6">
      <div className="max-w-xl text-center space-y-3">
        <h1 className="text-4xl font-semibold tracking-tight text-slate-900">
          Book a service
        </h1>
        <p className="text-lg text-slate-600">
          Choose a time that works for you — sessions confirmed in minutes.
        </p>
      </div>

      <div className="mt-12 w-full max-w-md rounded-lg border border-slate-200 bg-white">
        <div className="flex items-center justify-between px-6 py-5">
          <div className="space-y-1">
            <div className="font-medium text-slate-900">
              Service consultation
            </div>
            <div className="text-sm text-slate-500">60 minutes · 1-on-1</div>
          </div>
          <div className="text-right">
            <div className="text-xl font-semibold text-blue-700">$50</div>
            <div className="text-sm text-slate-500">per hour</div>
          </div>
        </div>
        <div className="border-t border-slate-200 px-6 py-4">
          <Link
            to="/bookings"
            className="block w-full rounded-md bg-blue-700 py-2.5 text-center text-sm font-medium text-white transition-colors hover:bg-blue-800"
          >
            Book this session
          </Link>
        </div>
      </div>
    </section>
  );
};
