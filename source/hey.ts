import { Person } from "./api.ts";
import { help } from "./help.ts";
import { parse } from "https://deno.land/std@0.182.0/flags/mod.ts";

const args = parse(Deno.args);

if (args.h || args.help || args["_"].length < 1) {
  console.log(help);
  Deno.exit(0);
}

if (args["g"] || args["no-gender"] || args["a"] || args["no-age"] || args["n"] || args["no-nation"]) {
  console.log("I will maybe implement the flags in the\nfuture. For now only -h / --help works.");
  Deno.exit(0);
}

const name = String(args["_"][0]);
const person = await Person.fromName(name);
console.log(person.toString());
