import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

interface BookingCalendarProps {
  selected: Date | undefined;
  onSelect: (date: Date | undefined) => void;
}

export const BookingCalendar = ({
  selected,
  onSelect,
}: BookingCalendarProps) => {
  return (
    <div>
      <DayPicker
        mode="single"
        selected={selected}
        onSelect={onSelect}
        disabled={{ before: new Date() }}
        className="rounded-md border border-slate-200 p-4 w-full max-w-100"
      />
    </div>
  );
};
