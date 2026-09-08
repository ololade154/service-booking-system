// import ct from "countries-and-timezones";

// interface TimeZoneProps {
//   value: string;
//   onChange: (value: string) => void;
// }

// export const TimeZone = ({ value, onChange }: TimeZoneProps) => {
//   const allCountries = ct.getAllCountries();

//   return (
//     <select
//       value={value}
//       onChange={(e) => onChange(e.target.value)}
//       className="w-full max-w-xs truncate rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-blue-700 focus:outline-none focus:ring-1 focus:ring-blue-700"
//     >
//       <option value="" disabled>
//         Select a country
//       </option>
//       {Object.values(allCountries).map((country) => (
//         <option key={country.id} value={country.id}>
//           {country.name}
//         </option>
//       ))}
//     </select>
//   );
// };
import { useMemo } from "react";
import ct from "countries-and-timezones";

interface TimeZoneProps {
  countryCode: string;
  timeZone: string;
  onCountryChange: (code: string) => void;
  onTimeZoneChange: (tz: string) => void;
}

export const TimeZone = ({
  countryCode,
  timeZone,
  onCountryChange,
  onTimeZoneChange,
}: TimeZoneProps) => {
  const allCountries = useMemo(
    () =>
      Object.values(ct.getAllCountries()).sort((a, b) =>
        a.name.localeCompare(b.name),
      ),
    [],
  );

  const selectedCountry = countryCode ? ct.getCountry(countryCode) : null;
  const availableZones = selectedCountry?.timezones ?? [];

  return (
    <div className="flex gap-2">
      <select
        value={countryCode}
        onChange={(e) => {
          onCountryChange(e.target.value);
          const zones = ct.getCountry(e.target.value)?.timezones ?? [];
          onTimeZoneChange(zones[0] ?? ""); // default to first zone
        }}
        className="w-full max-w-xs truncate rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-blue-700 focus:outline-none focus:ring-1 focus:ring-blue-700"
      >
        <option value="" disabled>
          Select a country
        </option>
        {allCountries.map((country) => (
          <option key={country.id} value={country.id}>
            {country.name}
          </option>
        ))}
      </select>

      {availableZones.length > 1 && (
        <select
          value={timeZone}
          onChange={(e) => onTimeZoneChange(e.target.value)}
          className="w-full max-w-xs truncate rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-blue-700 focus:outline-none focus:ring-1 focus:ring-blue-700"
        >
          {availableZones.map((tz) => (
            <option key={tz} value={tz}>
              {tz.replace(/_/g, " ")}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};
