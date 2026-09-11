import { useState } from "react";
import { DateTime } from "luxon";
import type { IScheduleProps } from "../data/data.types";
import { scheduleData } from "../data/schedule.data";
import { useBookingDetails } from "../hooks/use-storage-details";
import { Link } from "react-router-dom";

export const InstructorSchedule = () => {
  const { booking } = useBookingDetails();
  const targetTimeZone = booking.timeZone || "Africa/Lagos";

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  //to convert each of the schedule day, including the day, the time and the timezone
  const convertEachScheduleDay = ({
    day,
    startTime,
    endTime,
    timeZone,
  }: IScheduleProps) => {
    // Instructor's own local time (not converted)
    const instructorStart = DateTime.fromFormat(
      `${day} ${startTime}`,
      "cccc h:mma",
      { zone: timeZone },
    );
    const instructorEnd = DateTime.fromFormat(
      `${day} ${endTime}`,
      "cccc h:mma",
      { zone: timeZone },
    );
    // Converting the instructor's scheduled start time to the user's timezone
    const start = instructorStart.setZone(targetTimeZone);
    // Converting the instructor's scheduled end time to the user's timezone
    const end = instructorEnd.setZone(targetTimeZone);
    return {
      day: start.toFormat("cccc").toLowerCase(),
      startDateTime: start,
      endDateTime: end,
      instructorTimeZone: timeZone,
      startTime: start.toFormat("h:mma").toLowerCase(),
      endTime: end.toFormat("h:mma").toLowerCase(),
    };
  };

  const convertAllScheduleDay = () => {
    return scheduleData.map((data) => convertEachScheduleDay(data));
  };

  const handleSelectSlot = (
    endDateTime: DateTime,
    day: string,
    startTime: string,
    endTime: string,
    instructorTimeZone: string,
    index: number,
  ) => {
    // Always highlight the clicked row, whether it's valid or not.
    setSelectedIndex(index);
    //converting the instructor current time zone
    const instructorNow = DateTime.now().setZone(instructorTimeZone);
    //converting the instructor schedule day end time
    const instructorEndTime = endDateTime.setZone(instructorTimeZone);
    //comparing the instructor current time with the set scheduled time
    if (instructorNow > instructorEndTime) {
      setErrorMessage(
        `The ${day} slot (${startTime} - ${endTime}) has already ended `,
      );
      return;
    }

    setErrorMessage(null);
    // continue with booking logic here
  };
  // Check if no day is selected or the selected slot has an error
  const isSelectionInvalid = selectedIndex === null || !!errorMessage;

  return (
    <section className="mx-auto mt-10 w-full max-w-md px-4 sm:mt-16 sm:px-6">
      <header className="mb-6 space-y-1 text-center sm:mb-8">
        <h1 className="font-serif text-2xl font-semibold text-stone-900 sm:text-3xl">
          Instructor Schedule
        </h1>

        <p className="text-sm text-stone-500 sm:text-base">
          Weekly availability ({targetTimeZone})
        </p>
      </header>

      {errorMessage && (
        <p className="mb-4 rounded-md bg-red-50 px-4 py-2 text-center text-sm text-red-700">
          {errorMessage}
        </p>
      )}

      <ul className="divide-y divide-stone-200 border-y border-stone-200">
        {convertAllScheduleDay().map(
          (
            { day, startTime, endTime, endDateTime, instructorTimeZone },
            index,
          ) => {
            const isSelected = index === selectedIndex;
            const isSelectedWithError = isSelected && errorMessage;

            return (
              <li
                key={index}
                onClick={() =>
                  handleSelectSlot(
                    endDateTime,
                    day,
                    startTime,
                    endTime,
                    instructorTimeZone,
                    index,
                  )
                }
                className={`flex cursor-pointer flex-wrap items-center justify-between gap-y-1 border-l-4 py-4 pl-3 pr-2 sm:flex-nowrap sm:pl-4 ${
                  isSelectedWithError
                    ? "border-red-700 bg-red-50"
                    : isSelected
                      ? "border-emerald-800 bg-emerald-50"
                      : "border-transparent"
                }`}
              >
                <span className="font-medium capitalize text-stone-800">
                  {day}
                </span>

                <span className="tabular-nums text-sm text-stone-600 sm:text-base">
                  {startTime} - {endTime}
                </span>
              </li>
            );
          },
        )}
      </ul>

      <div className="mt-6 flex w-full items-center sm:mt-7">
        <Link
          to="/confirmation-page"
          onClick={(e) => {
            if (isSelectionInvalid) {
              e.preventDefault();
            }
          }}
          className="flex w-full items-center justify-center rounded-lg bg-blue-700 px-6 py-3.5 text-center text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-offset-2 active:scale-[0.98] sm:py-3"
        >
          Next
        </Link>
      </div>
    </section>
  );
};
