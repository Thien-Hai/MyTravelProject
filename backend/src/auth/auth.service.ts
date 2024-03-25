import { HttpException, HttpStatus, Injectable, Req, UnauthorizedException, } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as schedule from 'node-schedule';

// SRC
import { User } from '../users/entities/user.entity';
import { TokenService } from '../users/services/token.service';
import { CreateUserDto } from '../users/dto/create-user.dto';

import * as bcrypt from 'bcrypt';
import { LoginAuthDto } from "@shared/dtos/users/login.dto";
import { IResponseLogin } from "@shared/interfaces/user/user.interface";
import { InjectRepository } from "@nestjs/typeorm";
import { Password } from "./entities/password.entity";
import { Repository } from "typeorm";
import { Request } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    @InjectRepository(Password) private readonly passwordRepository: Repository<Password>
  ) { }

  async validateUser(email: string, password: string) {
    return await this.usersService.validateUser(email, password);
  }
  async login(loginDto: LoginAuthDto) {
    const { email, password } = loginDto;
    const user = await this.usersService.checkUser(email.toLowerCase());
    if (!user || !user.comparePassword(password))
      throw new UnauthorizedException('Invalid username or password');
    const isPasswordValid: boolean = await this.isPasswordValid(
      loginDto.password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new HttpException('Wrong password', HttpStatus.NOT_FOUND);
    }
    if (user && isPasswordValid) {
      return this.getToken(user);
    } else {
      throw new UnauthorizedException();
    }
  }

  async createUser(createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  async getToken(user: User): Promise<IResponseLogin> {
    const accessToken = this.jwtService.sign({
      userId: user.id,
      email: user.email,
    });
    return {
      tokenType: 'Bearer',
      accessToken,
      user: user,
    };
  }

  async isPasswordValid(password: string, userPassword: string) {
    return bcrypt.compareSync(password, userPassword);
  }

  async createForgotToken(body: any) {
    const tokenData = await this.passwordRepository.save(body);

    const deleteJob = schedule.scheduleJob(new Date(Date.now() + 5 * 60 * 1000), async () => {
      await this.passwordRepository.delete(tokenData.id);
    });

    return tokenData;
  }

  async findForgotToken(token: string) {
    return this.passwordRepository.findOne({ where: { token: token } });
  }

  async getUserNow(@Req() req: Request) {
    const token = req.headers.authorization;
    if (!token) {
      throw new UnauthorizedException('Token not found');
    }
    console.log("token: " + token);
    try {
      const decodedToken = this.jwtService.verify(token.replace('Bearer ', ''));
      const userId = decodedToken.userId;
  
      const user = await this.usersService.findOne(userId); // Replace with your user finding logic
      if (!user) {
        throw new UnauthorizedException('User not found');
      }
      return user;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }



}
