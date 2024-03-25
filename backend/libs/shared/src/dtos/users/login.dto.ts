import {
  IsEmail,
  IsString,
  MinLength,
  MaxLength,
  IsNotEmpty,
} from 'class-validator';
import { ApiProperty, PickType } from '@nestjs/swagger';

// CORE

// SHARED
import { Trim } from '../../../../core/src/util/transformer/custom';
import { IsPassword } from '../../../../core/src/validator/custom/password.validator';

export class LoginAuthDto {
  @ApiProperty({ example: 'tranthienhai@gmail.com' })
  @IsNotEmpty({ message: 'Trường này không được để trống' })
  @IsEmail()
  @Trim()
  @MinLength(1, { message: 'Email phải ít nhất 1 ký tự' })
  @MaxLength(30, { message: 'Email tối đa 30 ký tự' })
  email: string;

  @ApiProperty({ example: '123123' })
  @IsNotEmpty({ message: 'Trường này không được để trống' })
  @IsString()
  // @IsPassword('HIGH')
  @MinLength(5, { message: 'Phải có ít nhất 5 ký tự' })
  @MaxLength(30, { message: 'Chỉ tối đa 30 ký tự' })
  password: string;
}

export class ForgotPasswordDto extends PickType(LoginAuthDto, ['email']) {
  @ApiProperty({ example: '123123aA!' })
  @IsNotEmpty({ message: 'Trường này không được để trống' })
  @IsString()
  @MinLength(5, { message: 'Phải có ít nhất 5 ký tự' })
  @MaxLength(30, { message: 'Chỉ tối đa 30 ký tự' })
  @IsPassword('HIGH')
  newPassword: string;

  @ApiProperty({ example: '8888' })
  @IsNotEmpty()
  @IsString()
  code: string;
}

export class ChangePasswordDto extends PickType(LoginAuthDto, ['email']) {
  @ApiProperty({ example: '123123aA!' })
  @IsNotEmpty({ message: 'Trường này không được để trống' })
  @IsString()
  @MinLength(5, { message: 'Phải có ít nhất 5 ký tự' })
  @MaxLength(30, { message: 'Chỉ tối đa 30 ký tự' })
  oldPassword: string;

  @ApiProperty({ example: '123123aA!' })
  @IsNotEmpty({ message: 'Trường này không được để trống' })
  @IsString()
  @MinLength(5, { message: 'Phải có ít nhất 5 ký tự' })
  @MaxLength(30, { message: 'Chỉ tối đa 30 ký tự' })
  @IsPassword('HIGH')
  newPassword: string;
}

// export class ResponseLoginDto extends CreateUserResponseDto {}
