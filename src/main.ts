import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import { parse } from 'yaml';
import { AppModule } from './app.module';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  const port = process.env.PORT;
  const rootDirname = dirname(__dirname);
  const DOC_API = await readFileSync(join(rootDirname, 'doc', 'api.yaml'), 'utf-8');
  const data = parse(DOC_API);
  SwaggerModule.setup('doc', app, data);
  await app.listen(port);
}
bootstrap();


