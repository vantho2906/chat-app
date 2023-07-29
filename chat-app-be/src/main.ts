import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import ChatAppConfig from "etc/config";
import cors from "cors";
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = ChatAppConfig.PORT;
  app.useGlobalPipes(new ValidationPipe());
  const config = new DocumentBuilder()
    .setTitle("TEST APP API")
    .setDescription("TEST APP API description")
    .setVersion("1.0")
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);
  app.enableCors({
    origin: process.env.CLIENT_URL ?? "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  });

  await app.listen(PORT, () => {
    console.log(`App is listening on PORT ${PORT}`);
  });
}
bootstrap();
