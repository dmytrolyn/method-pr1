import { INITIAL_BALANCE, MAP_MAX_SIZE } from "./constants";
import { Case, City } from "./types";

export const initCities = (currentCase: Case) => {
  let allCities: City[] = [];

  Object.values(currentCase.countries).forEach((country) => {
    allCities = [...allCities, ...country.cities];
  });

  currentCase.cities = allCities;
};

export const initCitiesBalances = ({ cities = [], countries }: Case) => {
  for (const city of cities) {
    city.balances = Object.values(countries).reduce((prev, { name }) => {
      return { ...prev, [name]: city.country === name ? INITIAL_BALANCE : 0 };
    }, {});

    city.cache = {};
  }
};

export const initCitiesNeighbors = (cities: City[]) => {
  let map = new Array(MAP_MAX_SIZE);
  for (let i = 0; i < MAP_MAX_SIZE; i++) {
    map[i] = new Array(MAP_MAX_SIZE);
  }

  for (const city of cities) {
    map[city.y - 1][city.x - 1] = city;
  }

  for (const city of cities) {
    let x = city.x - 1;
    let y = city.y - 1;

    let neighbors = new Array();

    if (y - 1 >= 0) {
      neighbors.push(map[y - 1][x]);
    }

    if (x - 1 >= 0) {
      neighbors.push(map[y][x - 1]);
    }

    if (y + 1 < MAP_MAX_SIZE - 1) {
      neighbors.push(map[y + 1][x]);
    }

    if (x + 1 < MAP_MAX_SIZE - 1) {
      neighbors.push(map[y][x + 1]);
    }

    city.neighbors = neighbors.filter(Boolean);
  }
};
