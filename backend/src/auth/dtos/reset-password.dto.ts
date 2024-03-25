import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, IsObject, IsOptional, IsString} from "class-validator";
import {IsPassword} from "@core/validator/custom/password.validator";

export class ResetPasswordDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    token: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    password: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    passwordConfirm: string;
}