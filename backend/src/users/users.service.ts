import {
  Injectable,
  HttpException,
  HttpStatus,
  Inject,
  forwardRef,
} from '@nestjs/common';

import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

// SRC
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserCredentialDto } from './dto/UserCredentialDto';
// import { CartsService } from '../carts/carts.service';
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    // @Inject(forwardRef(() => CartsService))
    // private cartsService: CartsService,
  ) { }
  async create(createUserDto: CreateUserDto) {
    createUserDto.email = createUserDto.email.toLowerCase();
    const exitsUser = await this.userRepository.findOneBy({
      email: createUserDto.email,
    });
    if (exitsUser) {
      throw new HttpException('User already exists', HttpStatus.CONFLICT);
    }
    // createUserDto.cart = await this.cartsService.create();
    createUserDto.password = bcrypt.hashSync(
      createUserDto.password,
      bcrypt.genSaltSync(),
    );
    return await this.userRepository.save(createUserDto);
  }

  async login(userCredentialDto: UserCredentialDto): Promise<{
    id: number;
    email: string;
    username: string;
    password: string;
    // cartId: number;
    isAdmin: boolean;
  }> {
    const { email, password } = userCredentialDto;

    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      throw new HttpException('Not found user', HttpStatus.NOT_FOUND);
    }

    if (password != user.password) {
      throw new HttpException('Wrong password', HttpStatus.NOT_FOUND);
    }

    if (user && password == user.password) {
      return {
        id: user.id,
        email: user.email,
        username: user.username,
        password: user.password,
        // cartId: user.cart.id,
        isAdmin: user.isAdmin,
      };
    }
  }
  create_with_out_check(createUserDto: CreateUserDto) {
    // TODO document why this method 'create_with_out_check' is empty

    return this.userRepository.save(createUserDto);
  }

  async checkUser(email: string) {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new HttpException('No user found', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async validateUser(email: string, password: string) {
    const user = await this.userRepository.findOne({
      where: { email, password },
    });
    if (user) {
      return { ...user, password: undefined };
    }
    return undefined;
  }

  findAll() {
    return this.userRepository.find();
  }

  findOne(id: number) {
    return this.userRepository.findOneBy({ id });
  }

  findOneEmail(email: string) {
    return this.userRepository.findOneBy({ email });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.userRepository.update({ id }, updateUserDto);
  }

  updatePassword(id: number, data: any) {
    return this.userRepository.update({ id }, data);
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
