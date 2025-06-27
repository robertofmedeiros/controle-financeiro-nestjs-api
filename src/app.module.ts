import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LancamentosModule } from './useCases/lancamentos/lancamentos.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './useCases/auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Deixa disponível em toda a aplicação
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: 5432,
        username: configService.get('DB_USERNAME'),
        database: 'postgres',
        password: configService.get('DB_PASSWORD'),
        autoLoadEntities: true, // Carrega entidades sem precisar especifica-las
        synchronize: configService.get('DB_SYNCHRONIZE'), // Sincroniza com o BD. Não deve ser usado em produção
        logging: true,
      }),
      inject: [ConfigService],
    }),
    LancamentosModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
