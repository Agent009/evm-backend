import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "@app/app.module";
import { ConstantsService } from "@lib/constants";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const constants: ConstantsService = app.get(ConstantsService);
  app.enableCors({
    origin: [constants.bcsServerUrl, constants.bApiServerUrl, constants.fAppServerUrl],
  });

  // Setup OpenAPI
  const openApiConfig = new DocumentBuilder()
    .setTitle("EVM Backend API")
    .setDescription("EVM Backend REST API")
    .setVersion("1.0")
    // .addTag("tracker")
    // .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, openApiConfig);
  SwaggerModule.setup("api", app, document);

  await app.listen(constants.bcsServerPort);
}

bootstrap();
