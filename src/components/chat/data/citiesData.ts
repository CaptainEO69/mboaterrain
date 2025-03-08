
import { CameroonCitiesDatabase } from "../types/locationTypes";
import { LITTORAL_CITIES } from "./littoral";
import { CENTRE_CITIES } from "./centre";
import { OUEST_CITIES } from "./ouest";
import { NORDOUEST_CITIES } from "./nordOuest";
import { SUDOUEST_CITIES } from "./sudOuest";
import { SUD_CITIES } from "./sud";
import { EST_CITIES } from "./est";
import { ADAMAOUA_CITIES } from "./adamaoua";
import { NORD_CITIES } from "./nord";
import { EXTREMENORD_CITIES } from "./extremeNord";

// Base de données des villes et quartiers du Cameroun par région
export const CAMEROON_CITIES: CameroonCitiesDatabase = {
  "Littoral": LITTORAL_CITIES,
  "Centre": CENTRE_CITIES,
  "Ouest": OUEST_CITIES,
  "Nord-Ouest": NORDOUEST_CITIES,
  "Sud-Ouest": SUDOUEST_CITIES,
  "Sud": SUD_CITIES,
  "Est": EST_CITIES,
  "Adamaoua": ADAMAOUA_CITIES,
  "Nord": NORD_CITIES,
  "Extrême-Nord": EXTREMENORD_CITIES
};
