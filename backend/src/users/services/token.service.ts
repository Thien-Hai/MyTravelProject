import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()
export class TokenService {
  constructor(
    @InjectRepository(User)
    protected readonly repositoryUser: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}
}
