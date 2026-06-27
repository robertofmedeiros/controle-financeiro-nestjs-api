import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: ['http://192.168.10.9:3000'], // ou ['http://192.168.10.9:3000']
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: false,
  });
  
  await app.listen(process.env.PORT ?? 3000, '0.0.0.0');
}
bootstrap();
