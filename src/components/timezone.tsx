import ct from "countries-and-timezones";

interface TimeZoneProps {
  value: string;
  onChange: (value: string) => void;
}

export const TimeZone = ({ value, onChange }: TimeZoneProps) => {
  const allCountries = ct.getAllCountries();

  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full max-w-xs truncate rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-blue-700 focus:outline-none focus:ring-1 focus:ring-blue-700"
    >
      <option value="" disabled>
        Select a country
      </option>
      {Object.values(allCountries).map((country) => (
        <option key={country.id} value={country.id}>
          {country.name}
        </option>
      ))}
    </select>
  );
};
