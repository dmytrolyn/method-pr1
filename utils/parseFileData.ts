import { Case, City, Countries } from "../src/types";
import { MAP_MAX_SIZE } from "../src/constants";

export const parseFileData = (text: string): Case[] => {
  const strings = text.split("\n").map((string) => string.replace("\r", ""));

  let stringCount = 0;
  let cases = new Array();

  while (strings[stringCount] !== "0") {
    let countries: Countries = {};

    for (let i = 1; i <= +strings[stringCount]; i++) {
      const chunks = strings[stringCount + i].split(" ");

      const [name, x1, y1, x2, y2] = chunks;

      chunks.slice(1, 5).map((coordinate) => {
        if (!Number(coordinate) || +coordinate < 0) {
          throw new Error("Invalid coordinates");
        }
      });

      if (+x1 > +x2 || +y1 > +y2) {
        throw new Error("Invalid coordinates");
      }

      if (+x2 > MAP_MAX_SIZE || +y2 > MAP_MAX_SIZE) {
        throw new Error("Coordinates are out of map size");
      }

      let cities: City[] = [];

      for (let x = +x1; x <= +x2; x++) {
        for (let y = +y1; y <= +y2; y++) {
          cities.push({
            country: name,
            x: x,
            y: y,
          });
        }
      }

      countries[name] = {
        name,
        cities,
      };
    }

    cases.push({
      countries,
    });

    stringCount += +strings[stringCount] + 1;
  }

  return cases;
};
