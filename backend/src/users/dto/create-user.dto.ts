import { IsString, IsNotEmpty, IsObject, IsOptional, IsDate, IsDateString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

// SRC
// import { Cart } from '../../carts/entities/cart.entity';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  username?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  email?: string;

  @ApiProperty()
  @IsNotEmpty()
  phoneNumber?: string;
}