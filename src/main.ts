import { NestFactory } from "@nestjs/core";
import { AppModule } from "@app/app.module";
import { ConstantsService } from "@lib/constants";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const constants: ConstantsService = app.get(ConstantsService);
  app.enableCors({
    origin: [constants.bcsServerUrl, constants.bApiServerUrl],
  });
  await app.listen(constants.bcsServerPort);
}

bootstrap();
