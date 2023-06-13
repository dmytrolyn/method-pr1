import { Countries, Country } from "./types";

export const checkCountryBalances = (country: Country) => {
  const allBalances = [...country.cities].flatMap((city) =>
    Object.values(city.balances || {})
  );

  return allBalances.every((balance) => balance > 0);
};

export const checkComplete = (countries: Countries) =>
  Object.values(countries).every(checkCountryBalances);
