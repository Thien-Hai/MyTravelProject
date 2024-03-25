import { Module, forwardRef } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { InvoicesModule } from '../invoices/invoices.module';
import { TokenService } from './services/token.service';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    forwardRef(() => InvoicesModule),
    JwtModule,
  ],
  controllers: [UsersController],
  providers: [UsersService, TokenService],
  exports: [UsersService, TokenService],
})
export class UsersModule { }
