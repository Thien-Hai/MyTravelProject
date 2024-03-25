import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateDestinationDto {
  @ApiProperty({ example: '' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: '' })
  @IsString()
  @IsNotEmpty()
  location?: string;

  @ApiProperty({ example: '' })
  @IsString()
  @IsOptional()
  desc?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  mainImageLink?: string;
}
