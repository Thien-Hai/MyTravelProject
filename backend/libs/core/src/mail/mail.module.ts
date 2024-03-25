// import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { join } from 'path';


import { MailService } from './mail.service';
import {ConfigModule, ConfigService} from "../config";

import {EjsAdapter} from "@nestjs-modules/mailer/dist/adapters/ejs.adapter";



@Module({
  imports: [
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        transport: { 
          host: config.EMAIL_HOST,
          port: config.EMAIL_PORT,
          requireTLS: config.EMAIL_USE_TLS,
          auth: {
            user: config.EMAIL_USER,
            pass: config.EMAIL_PASSWORD,
          },
          service: 'gmail',
          secure: false,
        },
        template: {
          dir: join(process.cwd(), 'libs', 'core', 'src', 'mail', 'templates'),
          adapter: new EjsAdapter(),
          options: {
            strict: false,
          },
        },
      }),
    }),
    ConfigModule,
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
