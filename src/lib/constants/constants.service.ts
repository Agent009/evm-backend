import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ConstantsInterface, ConstantsOptions, ConstantsOptionsTypes } from "./interface";

@Injectable()
export class ConstantsService {
  //region Constructor and init
  constructor(private configService: ConfigService) {}

  //endregion
  //region Getters
  //region Generic

  /**
   * Get the entire nested configuration by type.
   * @param {ConstantsOptions} options
   */
  get<T extends ConstantsInterface>(options: ConstantsOptions): T | null {
    switch (options.type) {
      case ConstantsOptionsTypes.APP:
        return this.configService.get<T>("app")!;
      case ConstantsOptionsTypes.DB:
        return this.configService.get<T>("db")!;
      default:
        return null;
    }
  }

  //endregion
  //region APP constants

  get bcsServerHost(): string {
    return this.configService.get("app.bcsServerHost") || "http://localhost";
  }

  get bcsServerPort(): number {
    return this.configService.get<number>("app.bcsServerPort") || 8000;
  }

  get bcsServerUrl(): string {
    return this.configService.get<string>("app.bcsServerUrl") || "http://localhost:8000";
  }

  get fileLoggerEnabled(): boolean {
    return this.configService.get<boolean>("app.enableFileLogger") || false;
  }

  get fileLogPath(): string {
    return this.configService.get<string>("app.fileLogPath") || "logs";
  }

  get combinedFileLoggerEnabled(): boolean {
    return this.fileLoggerEnabled && (this.configService.get<boolean>("app.enableCombinedFileLogger") || false);
  }

  get bApiServerHost(): string {
    return this.configService.get("app.bApiServerHost") || "http://localhost";
  }

  get bApiServerPort(): number {
    return this.configService.get<number>("app.bApiServerPort") || 8000;
  }

  get bApiServerUrl(): string {
    return this.configService.get<string>("app.bApiServerUrl") || "http://localhost:8000";
  }

  get jwtKey(): string | null | undefined {
    return this.configService.get<string>("app.jwtKey");
  }

  get jwtRefreshKey(): string | null | undefined {
    return this.configService.get<string>("app.jwtRefreshKey");
  }

  get jwtExpires(): string | null | undefined {
    return this.configService.get<string>("app.jwtExpires");
  }

  get jwtRefreshExpires(): string | null | undefined {
    return this.configService.get<string>("app.jwtRefreshExpires");
  }

  get ymdDateFormat(): string {
    return this.configService.get<string>("app.ymdDateFormat") || "y-MM-dd";
  }

  //endregion

  // region DB constants

  get mongodbHost(): string {
    return this.configService.get<string>("db.mongodbHost") || "localhost";
  }

  get mongodbPort(): number {
    return this.configService.get<number>("db.mongodbPort") || 27017;
  }

  get mongodbDb(): string {
    return this.configService.get<string>("db.mongodbDb") || "evm_backend";
  }

  get mongodbUsername(): string {
    return this.configService.get<string>("db.mongodbUsername") || "";
  }

  get mongodbPassword(): string {
    return this.configService.get<string>("db.mongodbPassword") || "";
  }

  get mongodbUri(): string {
    return (
      this.configService.get<string>("db.mongodbUri") ||
      `mongodb://${this.mongodbUsername}:${this.mongodbPassword}@${this.mongodbHost}:${this.mongodbPort}/${this.mongodbDb}`
    );
  }

  get redisHost(): string {
    return this.configService.get<string>("db.redisHost") || "localhost";
  }

  get redisPort(): number {
    return this.configService.get<number>("db.redisPort") || 6379;
  }

  get redisDb(): number {
    return this.configService.get<number>("db.redisDb") || 0;
  }

  get redisUsername(): string {
    return this.configService.get<string>("db.redisUsername") || "";
  }

  get redisPassword(): string {
    return this.configService.get<string>("db.redisPassword") || "";
  }

  get redisUri(): string {
    return (
      this.configService.get<string>("db.redisUri") ||
      `redis://${this.redisUsername}:${this.redisPassword}@${this.redisHost}:${this.redisPort}/${this.redisDb}`
    );
  }

  //endregion
  //endregion
}
