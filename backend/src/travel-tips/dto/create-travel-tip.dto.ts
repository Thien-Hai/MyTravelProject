import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTravelTipDto {
  @ApiProperty({ example: '' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: '' })
  @IsString()
  @IsNotEmpty()
  category: string;

  @ApiProperty({ example: '' })
  @IsString()
  @IsOptional()
  desc?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  detail?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  mainImageLink?: string;
}
