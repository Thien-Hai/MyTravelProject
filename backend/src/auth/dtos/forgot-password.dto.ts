import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, IsObject, IsOptional, IsString} from "class-validator";

export class ForgotPasswordDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    email: string;
}