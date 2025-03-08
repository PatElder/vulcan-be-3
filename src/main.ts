import { Handler } from 'aws-lambda';
import serverless from '@vendia/serverless-express';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

let server: Handler;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.init();

  const expressApp = app.getHttpAdapter().getInstance();
  server = serverless({ app: expressApp });
}

export const handler: Handler = async (event, context, callback) => {
  if (!server) await bootstrap();
  return server(event, context, callback);
};
