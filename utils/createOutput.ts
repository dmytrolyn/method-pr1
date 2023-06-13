import { DiffusionResult } from "../src/types";

export const createOutput = (results: DiffusionResult[]) => {
  let strings: string[] = [];

  for (const [i, result] of results.entries()) {
    strings.push(`Case number ${i + 1}`);

    const sortedResults = Object.entries(result)
      .sort((a, b) => {
        const diff = a[1] - b[1];
        return diff === 0 ? a[0].localeCompare(b[0]) : diff;
      })
      .map(([key, value]) => `${key} ${value}`);

    strings.push(...sortedResults);
  }

  return strings.join("\n");
};
