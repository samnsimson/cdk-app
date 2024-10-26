import { camelCase, startCase } from "lodash";

export class Utils {
    public formatedName = (name: string, env: string) => {
        return `fusion-${env ?? "dev"}-${name.toLowerCase()}`;
    };

    public pascalCase = (str: string) => {
        return startCase(camelCase(str)).replace(/ /g, "");
    };
}

export const utils = new Utils();
