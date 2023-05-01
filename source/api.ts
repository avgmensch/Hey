import { CountryNotFoundError, NoNameError } from "./err.ts";
import { byInternet } from "npm:country-code-lookup@0.0.23";

async function apiCall(url: string): Promise<Response> {
  const rsp = await fetch(url);

  if (!rsp.ok) {
    console.error(`Failed to get data from ${url}.`);
    Deno.exit(1);
  }

  return rsp;
}

export enum Gender {
  male = "Male",
  female = "Female",
  unknown = "unknown",
}

export async function getGender(name: string): Promise<Gender> {
  if (name == "" || name == undefined) {
    throw new NoNameError("No name given to function getGender.");
  }

  const resp = await apiCall(`https://api.genderize.io?name=${name}`);
  const genderRaw = (await resp.json()).gender;

  if (genderRaw == "male") {
    return Gender.male;
  } else if (genderRaw == "female") {
    return Gender.female;
  }

  return Gender.unknown;
}

export async function getAge(name: string): Promise<number> {
  if (name == "" || name == undefined) {
    throw new NoNameError("No name given to function getAge.");
  }

  const resp = await fetch(`https://api.agify.io?name=${name}`);
  const age = (await resp.json()).age;

  return age;
}

export async function getNation(name: string): Promise<string> {
  if (name == "" || name == undefined) {
    throw new NoNameError("No name given to function getNation.");
  }

  const resp = await fetch(`https://api.nationalize.io?name=${name}`);
  const nation = (await resp.json()).country[0].country_id;

  return nation;
}

export function getCountyName(code: string): string {
  const search = byInternet(code);
  if (search?.country == undefined) {
    throw new CountryNotFoundError(`Country with code ${code} not found.`);
  }
  return search.country;
}

export class Person {
  name: string;
  gender: Gender;
  age: number;
  nation: string;

  constructor(name: string, gender: Gender, age: number, nation: string) {
    this.name = name;
    this.gender = gender;
    this.age = age;
    this.nation = nation;
  }

  toString() {
    return `\
Name: ${this.name}
Age: ${this.age} years
Gender: ${this.gender}
Nation: ${this.nation}\
`;
  }

  static async fromName(name: string): Promise<Person> {
    const nationCodePrm = getNation(name);
    const genderPrm = getGender(name);
    const agePrm = getAge(name);

    const nationCode = await nationCodePrm;
    const nationName = getCountyName(nationCode);
    const gender = await genderPrm;
    const age = await agePrm;

    return new Person(name, gender, age, nationName);
  }
}
