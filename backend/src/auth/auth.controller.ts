import {Controller, Post, Body, BadRequestException, NotFoundException, Get, Req} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

// SRC
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import * as bcrypt from 'bcrypt';


// CORE
import {ApiCreateOperation} from "@core/docs/swagger.decorator";
import {LoginAuthDto} from "@shared/dtos/users/login.dto";
import {MailService} from "@core/mail/mail.service";
import {UsersService} from "../users/users.service";
import {ForgotPasswordDto} from "./dtos/forgot-password.dto";
import {ResetPasswordDto} from "./dtos/reset-password.dto";
import {Password} from "./entities/password.entity";
import { Request } from 'express';

// SHARED


@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
      private authService: AuthService,
      private mailService: MailService,
      private userService: UsersService
  ) {}

  @Post('login')
  @ApiCreateOperation({
    summary: 'Login',
  })
  async login(@Body() body: LoginAuthDto) {
    return this.authService.login(body);
  }

  @Post('register')
  @ApiCreateOperation({
    summary: 'Create new user',
  })
  create(@Body() createUserDto: CreateUserDto) {
    return this.authService.createUser(createUserDto);
  }

  @Post('forgot')
  async forgot(@Body() forgotPasswordDto: ForgotPasswordDto){
    const email = forgotPasswordDto.email;
    const token = Math.random().toString().substring(2, 8);
    await this.authService.createForgotToken({
      email,
      token
    })
    await this.mailService.sendMailWithToken(email, 'Verify password change', token, './confirm');
  }

  @Post('reset')
  async reset(
      @Body() resetPasswordDto: ResetPasswordDto
  ){
    if(resetPasswordDto.passwordConfirm != resetPasswordDto.password){
      throw new BadRequestException('Passwords do not match')
    }
    const token = resetPasswordDto.token;
    const passwordReset: Password = await this.authService.findForgotToken(token);
 
    const user = await this.userService.findOneEmail(passwordReset.email);
    if(!user){
      throw new NotFoundException('User not found');
    }

    const hashedPassword = await bcrypt.hash(resetPasswordDto.password, 12);
    await this.userService.updatePassword(user.id, {password: hashedPassword});
    return{
      message: 'change success'
    }
  }

  @Get('/getUserNow')
  async getUserNow(@Req() req: Request){
    return this.authService.getUserNow(req);
  }

}
