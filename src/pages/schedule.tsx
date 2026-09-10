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
  // Check if the currently selected slot has an error
  const isSelectionInvalid = selectedIndex !== null && errorMessage;

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
                className={`flex cursor-pointer items-center justify-between border-l-4 py-4 pl-4 pr-2 ${
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

                <span className="tabular-nums text-stone-600">
                  {startTime} - {endTime}
                </span>
              </li>
            );
          },
        )}
      </ul>

      <div className="mt-7 flex w-full items-center">
        <Link
          to="/bookings"
          onClick={(e) => {
            if (isSelectionInvalid) {
              e.preventDefault();
            }
          }}
          className="flex w-full items-center justify-center rounded-lg bg-blue-700 px-6 py-3 text-center text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-offset-2 active:scale-[0.98]"
        >
          Next
        </Link>
      </div>
    </section>
  );
};
