import * as customEnv from 'custom-env';
import * as ms from 'ms';
import * as ip from 'ip';
import * as path from 'path';
import { Injectable } from '@nestjs/common';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

import { DEFAULT_CACHE_LONG_TIMEOUT, DEFAULT_CACHE_TIMEOUT } from './config.constants';

process.env.NODE_ENV = process.env.NODE_ENV ?? 'dev';
const customEnvName = process.env.DOT_ENV_SUFFIX ?? process.env.NODE_ENV;
console.log('Using NODE_ENV: ' + process.env.NODE_ENV);
console.log('Using customEnvName: ' + customEnvName);
customEnv.env(customEnvName);
const _process = { env: process.env };
process.env = {};


@Injectable()
export class ConfigService {
  // COMMON


  // MAIL
  EMAIL_USE_TLS = (_process.env.EMAIL_USE_TLS ?? 'true').toLowerCase() === 'true';
  EMAIL_HOST = _process.env.EMAIL_HOST ?? 'smtp.gmail.com';
  EMAIL_USER = _process.env.EMAIL_USER ?? 'nhtqung17@gmail.com';
  EMAIL_PASSWORD = _process.env.EMAIL_PASSWORD ?? 'cvapgzaxlxgzgmeq';
  
  EMAIL_PORT = parseInt(_process.env.EMAIL_PORT ?? '465', 10);

  extractlog(){
    console.log('email user: ' + this.EMAIL_USER);
  }
  // SCHEDULE
  SCHEDULE_ENABLE = (_process.env.SCHEDULE_ENABLE ?? 'true').toLowerCase() === 'true';
}


export const config = new ConfigService();
