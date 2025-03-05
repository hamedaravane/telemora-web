export interface Country {
  id: number;
  code: string;
  name: string;
  nameLocal: Record<string, string>;
  phoneCode: string;
  currency: string;
  region: string;
  capital: string;
  states: State[];
}

export interface State {
  id: number;
  name: string;
  code: string;
  nameLocal: Record<string, string>;
  country: Country;
  cities: City[];
}

export interface City {
  id: number;
  name: string;
  nameLocal: Record<string, string>;
  postalCode: string;
  latitude: number;
  longitude: number;
  state: State;
}
