// src/types/country-timezone.d.ts
declare module "country-timezone" {
  interface CountryTimezone {
    getTimezones(nameOrCity: string): string[];
    getTimezonesWithCountryCode(countryCode: string): string[];
  }
  const countryTimezone: CountryTimezone;
  export default countryTimezone;
}
