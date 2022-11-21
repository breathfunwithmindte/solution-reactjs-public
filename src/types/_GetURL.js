import config from "../bssl/config.json";
import replace_string from "../bssl/replace_string";
import { ApiType } from "./_ApiType";

export default (sector, type, data) => {
  if(!sector) return -1;
  if(sector.apis instanceof Array === false) return -1;

  const usable_type = type ? type : ApiType.READ_MANY;

  const current_api = sector.apis.find(f => f.type === usable_type);

  if(!current_api) return -1;
  
  const usable_data = {
    domain: config["mode"] === "dev" ? config["dev-domain"] : config["prod-domain"],
    apidomain: config["mode"] === "dev" ? config["dev-domain-api"] : config["prod-domain-api"],
    sector: sector,
    sectorname: sector.name
  }
  for (const key in data) {
    if (Object.hasOwnProperty.call(data, key)) {
      usable_data[key] = data[key];
    }
  }

  return replace_string(current_api.path, usable_data);
  
}
