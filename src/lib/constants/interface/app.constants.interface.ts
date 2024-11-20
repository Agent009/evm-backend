import { ConstantsInterface } from "./constants.interface";

export interface AppConstantsInterface extends ConstantsInterface {
  devEnv: boolean;
  localEnv: boolean;
  devOrLocalEnv: boolean;
  prodEnv: boolean;
  bcsServerHost: string;
  bcsServerPort: number;
  bcsServerUrl: string;
  bApiServerHost: string;
  bApiServerPort: number;
  bApiServerUrl: string;
  jwtKey: string;
  jwtExpires: string;
  jwtRefreshKey: string;
  jwtRefreshExpires: string;
  ymdDateFormat: string;
}
