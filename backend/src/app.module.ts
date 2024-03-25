import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { UsersModule } from './users/users.module';
import { configEnvPath } from './common/helper/env.helper';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigSerivce } from './common/shared/typeorm/typeorm.service';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { MulterModule } from '@nestjs/platform-express';
import { InvoicesModule } from './invoices/invoices.module';
import { AuthModule } from './auth/auth.module';
import { JwtStrategy } from './auth/strategies/jwt.strategy';
import { DestinationsModule } from './destinations/destinations.module';
import { TourTypesModule } from './tour-types/tour-types.module';
import { TravelTipsModule } from './travel-tips/travel-tips.module';
import { ToursModule } from "./tours/tours.module";
import { MailModule } from "@core/mail/mail.module";

@Module({
  imports: [
    ConfigModule.forRoot(configEnvPath),
    TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigSerivce }),
    EventEmitterModule.forRoot(),
    MulterModule.register({
      dest: './files',
    }),
    ToursModule,
    UsersModule,
    InvoicesModule,
    AuthModule,
    DestinationsModule,
    TourTypesModule,
    TravelTipsModule,
    MailModule,
  ],
  controllers: [AppController],
  providers: [AppService, JwtStrategy],
})
export class AppModule { }
