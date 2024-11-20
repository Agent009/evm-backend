import { Module } from "@nestjs/common";
import { AppController } from "@app/app.controller";
import { AppService } from "@app/app.service";
import { ConstantsModule } from "@lib/constants";

@Module({
  imports: [
    // Global modules
    ConstantsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
