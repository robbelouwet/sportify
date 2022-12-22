import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger("Bootstrapper");


  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });

  let ip = "127.0.0.1"
  let port = "4000"

  if (process.env.NODE_ENV !== null && process.env.NODE_ENV === "production") {
    ip = "0.0.0.0"
    port = process.env.PORT // gcloud runtime provides a port for us
  }
  logger.log(`Running on ${ip}:${port}`)
  await app.listen(port, ip);
}

bootstrap();
