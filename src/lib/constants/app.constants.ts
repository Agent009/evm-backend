import { registerAs } from "@nestjs/config";

// Environment
const environment = process.env.NODE_ENV || "development";
const localEnv = environment === "local";
const prodEnv = ["production", "prod"].includes(environment);
const devEnv = !localEnv && !prodEnv;
const devOrLocalEnv = devEnv || localEnv;
// BCS
const bcsServerHost = process.env.BCS_SERVER_HOST || "http://localhost";
const bcsServerPort = process.env.BCS_SERVER_PORT || 8051;
const bcsServerUrl = process.env.BCS_SERVER_URL || `${bcsServerHost}:${bcsServerPort}`;
const enableFileLogger: boolean = parseInt(process.env.BCS_FILE_LOG || "0") === 1;
const fileLogPath: string = process.env.BCS_FILE_LOG_PATH || "logs";
const enableCombinedFileLogger: boolean = parseInt(process.env.BCS_FILE_LOG_COMBINED || "0") === 1;
// BAPI
const bApiServerHost = process.env.BAPI_SERVER_HOST || "http://localhost";
const bApiServerPort = process.env.BAPI_SERVER_PORT || 8051;
const bApiServerUrl = process.env.BAPI_SERVER_URL || `${bApiServerHost}:${bApiServerPort}`;

export default registerAs("app", () => ({
  // Environment
  devEnv: devEnv,
  localEnv: localEnv,
  devOrLocalEnv: devOrLocalEnv,
  prodEnv: prodEnv,
  // BCS
  bcsServerHost: bcsServerHost,
  bcsServerPort: bcsServerPort,
  bcsServerUrl: bcsServerUrl,
  enableFileLogger: enableFileLogger,
  fileLogPath: fileLogPath,
  enableCombinedFileLogger: enableCombinedFileLogger,
  // BAPI
  bApiServerHost: bApiServerHost,
  bApiServerPort: bApiServerPort,
  bApiServerUrl: bApiServerUrl,
  // Smart contracts
  account: {
    deployerMemonic: process.env.MNEMONIC || "",
    deployerAddress: process.env.DEPLOYER_ADDRESS || "",
    deployerPrivateKey: process.env.PRIVATE_KEY || "",
  },
  contracts: {
    ballot: {
      sepolia: process.env.BALLOT_SEPOLIA || "",
    },
  },
  integrations: {
    alchemy: {
      apiKey: process.env.ALCHEMY_API_KEY || "",
      sepolia: `https://eth-sepolia.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY || ""}`,
    },
    etherscan: {
      apiKey: process.env.ETHERSCAN_API_KEY || "",
    },
    infura: {
      apiKey: process.env.INFURA_API_KEY || "",
      apiSecret: process.env.INFURA_API_SECRET || "",
    },
    pokt: {
      apiKey: process.env.POKT_API_KEY || "",
    },
  },
  // Shared keys
  jwtKey: process.env.JWT_KEY || "T#k!^2PmQ!3@5wS8rYp",
  jwtRefreshKey: process.env.JWT_REFRESH_KEY || "PoP0zOLUt2ln8tE16tp1V+HRm3eoBnUNSfuYXX+4QzB3ICTImhYbQSmKlp1",
  jwtExpires: process.env.JWT_EXPIRES || "12h",
  jwtRefreshExpires: process.env.JWT_REFRESH_EXPIRES || "7d",
  // Misc
  ymdDateFormat: "y-MM-dd",
}));
