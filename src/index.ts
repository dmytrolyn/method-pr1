import { checkComplete, checkCountryBalances } from "./checks";
import { EXCHANGE_SUM } from "./constants";
import { initCitiesNeighbors, initCities, initCitiesBalances } from "./init";
import { Case, DiffusionResult } from "./types";

const performIteration = ({ cities }: Case) => {
  for (const city of cities) {
    for (const [country, balance] of Object.entries(city.balances!)) {
      let exchangeSum = Math.floor(balance / EXCHANGE_SUM);
      let allAmount = exchangeSum * city.neighbors!.length;

      if (exchangeSum === 0 || allAmount > balance) {
        continue;
      }

      city.balances![country] -= allAmount;

      for (const neighbor of city.neighbors!) {
        if (neighbor.cache![country] === undefined) {
          neighbor.cache![country] = 0;
        }

        neighbor.cache![country] += exchangeSum;
      }
    }
  }

  for (const city of cities) {
    for (const [country, balance] of Object.entries(city.cache!)) {
      city.balances![country] += balance;
    }

    city.cache = {};
  }
};

export const solveEuroDiffusion = (currentCase: Case) => {
  let result: DiffusionResult = {};

  for (const country of Object.keys(currentCase.countries)) {
    result[country] = NaN;
  }

  if (Object.values(currentCase.countries).length === 1) {
    result[Object.values(currentCase.countries)[0].name] = 0;

    return result;
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
