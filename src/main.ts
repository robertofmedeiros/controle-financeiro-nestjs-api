import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use((req, res, next) => {
    console.log(req.method, req.url);
    console.log('Origin:', req.headers.origin);
    next();
  });

  app.use((req, res, next) => {
    res.on('finish', () => {
      console.log(
        'Access-Control-Allow-Origin:',
        res.getHeader('Access-Control-Allow-Origin'),
      );
    });
  
    next();
  });

  app.enableCors({
    origin: ['http://192.168.10.9:3000'],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    credentials: true,
  });
  
  await app.listen(3010, '0.0.0.0');
}
bootstrap();
