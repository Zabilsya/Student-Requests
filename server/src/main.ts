import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ValidationPipe} from "./pipes/validation.pipe";

async function start() {
  const port = process.env.PORT || 5000
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(new ValidationPipe())
  app.enableCors();

  await app.listen(port, () => console.log('START SERVER'))
}

start()
