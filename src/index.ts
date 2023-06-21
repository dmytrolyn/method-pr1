import { checkComplete, checkCountryBalances } from "./checks";
import { EXCHANGE_SUM } from "./constants";
import { initCitiesNeighbors, initCities, initCitiesBalances } from "./init";
import { Case, City, DiffusionResult } from "./types";

const initCache = (city: City, country: string, exchangeSum: number) => {
  for (const neighbor of city.neighbors!) {
    if (neighbor.cache![country] === undefined) {
      neighbor.cache![country] = 0;
    }

    neighbor.cache![country] += exchangeSum;
  }
};

const clearCache = (cities: City[]) => {
  for (const city of cities) {
    for (const [country, balance] of Object.entries(city.cache!)) {
      city.balances![country] += balance;
    }

    city.cache = {};
  }
};

const performIteration = ({ cities }: Case) => {
  for (const city of cities) {
    for (const [country, balance] of Object.entries(city.balances!)) {
      let exchangeSum = Math.floor(balance / EXCHANGE_SUM);
      let allAmount = exchangeSum * city.neighbors!.length;

      if (exchangeSum === 0 || allAmount > balance) {
        continue;
      }

      city.balances![country] -= allAmount;

      initCache(city, country, exchangeSum);
    }
  }

  clearCache(cities);
};

export const solveEuroDiffusion = (currentCase: Case) => {
  let result: DiffusionResult = {};

  if (Object.values(currentCase.countries).length === 1) {
    result[Object.values(currentCase.countries)[0].name] = 0;

    return result;
  }

  for (const country of Object.keys(currentCase.countries)) {
    result[country] = NaN;
  }

  initCities(currentCase);
  initCitiesBalances(currentCase);
  initCitiesNeighbors(currentCase.cities);

  let currentDay = 1;

  while (!checkComplete(currentCase.countries)) {
    performIteration(currentCase);

    for (const [country, day] of Object.entries(result)) {
      if (
        Number.isNaN(day) &&
        checkCountryBalances(currentCase.countries[country])
      ) {
        result[country] = currentDay;
      }
    }

    currentDay += 1;
  }

  return result;
};
