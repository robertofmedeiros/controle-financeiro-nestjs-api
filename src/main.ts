import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './frameWork/exceptions/exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: [
      'http://192.168.10.9:3000',
      'http://localhost:3000',
      /\.trycloudflare\.com$/, // Aceita qualquer subdomínio do trycloudflare.com
    ],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    credentials: true,
  });

  app.useGlobalFilters(new AllExceptionsFilter());

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
  
  await app.listen(3010, '0.0.0.0');
}
bootstrap();
