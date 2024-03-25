import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { SentMessageInfo } from 'nodemailer';


import {ConfigService} from "../config";



@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly config: ConfigService,
  ) {}

  public async sendMail(
    receivers: string,
    subject: string,
    text?: string,
    template?: string,
    context?: Record<string, any>,
  ): Promise<SentMessageInfo> {
    console.log('receiver: ' + receivers);
    return await this.mailerService
      .sendMail({
        to: receivers,
        from: this.config.EMAIL_USER,
        subject,
        text,
        template,
        context,
      })
      .catch((err) => {
        throw err;
      });
      
  }

    public async sendMailWithToken(
        receivers: string,
        subject: string,
        token: string,
        template?: string,
        context?: Record<string, any>,
    ): Promise<SentMessageInfo> {
        console.log('receiver: ' + receivers);
        return await this.mailerService
            .sendMail({
                to: receivers,
                from: this.config.EMAIL_USER,
                subject,
                template,
                context: {
                    token: token
                },
            })
            .catch((err) => {
                throw err;
            });

    }
}
