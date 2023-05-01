import { getCountyName } from "../source/api.ts";

Deno.bench("getCountyName('fr')", () => {
  getCountyName("fr");
});
