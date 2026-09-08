import { DateTime } from "luxon";
import type { IScheduleProps } from "../data/data.types";
import { scheduleData } from "../data/schedule.data";
import { useBookingDetails } from "../hooks/use-storage-details";

const convertScheduleEntry = (
  { day, startTime, endTime, timeZone }: IScheduleProps,
  targetTimeZone: string,
) => {
  // Create the start time in the instructor's timezone
  const start = DateTime.fromFormat(`${day} ${startTime}`, "cccc h:mma", {
    zone: timeZone,
  }).setZone(targetTimeZone);

  // Create the end time in the instructor's timezone
  const end = DateTime.fromFormat(`${day} ${endTime}`, "cccc h:mma", {
    zone: timeZone,
  }).setZone(targetTimeZone);

  return {
    day: start.toFormat("cccc").toLowerCase(),
    date: start.toJSDate(),
    startTime: start.toFormat("h:mma").toLowerCase(),
    endTime: end.toFormat("h:mma").toLowerCase(),
  };
};

const convertScheduleToTimeZone = (
  schedule: IScheduleProps[],
  targetTimeZone: string,
) => {
  return schedule.map((entry) => convertScheduleEntry(entry, targetTimeZone));
};

export const InstructorSchedule = () => {
  const { booking } = useBookingDetails();

  // User's selected timezone
  // If no timezone has been selected, use Lagos
  const targetTimeZone = booking.timeZone || "Africa/Lagos";

  // Convert the instructor's schedule to the user's timezone
  const convertedSchedule = convertScheduleToTimeZone(
    scheduleData,
    targetTimeZone,
  );

  // Get today's day in the user's selected timezone
  const today = DateTime.now()
    .setZone(targetTimeZone)
    .toFormat("cccc")
    .toLowerCase();

  return (
    <section className="mx-auto mt-16 w-full max-w-md">
      <header className="mb-8 space-y-1 text-center">
        <h1 className="font-serif text-3xl font-semibold text-stone-900">
          Instructor Schedule
        </h1>

        <p className="text-base text-stone-500">
          Weekly availability ({targetTimeZone})
        </p>
      </header>

      <ul className="divide-y divide-stone-200 border-y border-stone-200">
        {convertedSchedule.map(({ day, startTime, endTime }, index) => {
          const isToday = day === today;

          return (
            <li
              key={index}
              className={`flex items-center justify-between border-l-4 py-4 pl-4 pr-2 ${
                isToday
                  ? "border-emerald-800 bg-emerald-50"
                  : "border-transparent"
              }`}
            >
              <span className="font-medium capitalize text-stone-800">
                {day}

                {isToday && (
                  <span className="ml-2 text-xs font-normal text-emerald-700">
                    Today
                  </span>
                )}
              </span>

              <span className="tabular-nums text-stone-600">
                {startTime} - {endTime}
              </span>
            </li>
          );
        })}
      </ul>
    </section>
  );
};
