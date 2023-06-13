export interface City {
  country: string;
  x: number;
  y: number;
  balances?: {
    [key: string]: number;
  };
  cache?: {
    [key: string]: number;
  };
  neighbors?: City[];
}

export interface Country {
  name: string;
  cities: City[];
}

export interface Countries {
  [key: string]: Country;
}

export interface Case {
  countries: Countries;
  cities: City[];
}

export interface DiffusionResult {
  [key: string]: number;
}
