import { Global, Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import appConstants from "./app.constants";
import dbConstants from "./db.constants";
import { ConstantsService } from "./constants.service";

/**
 * Import and provide configuration related classes.
 *
 * @module
 */
@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      expandVariables: true,
      load: [appConstants, dbConstants],
    }),
  ],
  providers: [ConfigService, ConstantsService],
  exports: [ConfigService, ConstantsService],
})
export class ConstantsModule {}
