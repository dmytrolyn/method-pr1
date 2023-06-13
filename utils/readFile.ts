import fs from "fs";
import { DEFAULT_INPUT_FILE_NAME } from "../src/constants";

export const readFile = (filename = DEFAULT_INPUT_FILE_NAME) => {
  try {
    return fs.readFileSync(filename, "utf8");
  } catch (error) {
    throw new Error("Error while reading file");
  }
};
