import { readFile, parseFileData, createOutput } from "./utils";
import { DEFAULT_INPUT_FILE_NAME } from "./src/constants";
import { solveEuroDiffusion } from "./src";

const main = () => {
  try {
    const content = readFile(DEFAULT_INPUT_FILE_NAME);

    const cases = parseFileData(content);
    const results = cases.map((result) => solveEuroDiffusion(result));
    const resultsOutput = createOutput(results);

    console.log(resultsOutput);
  } catch (error) {
    console.error(error);
  }
};

main();
