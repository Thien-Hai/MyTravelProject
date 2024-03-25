import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';
import { Destination } from 'src/destinations/entities/destination.entity';

export class CreateTourTypeDto {
  @ApiProperty({ example: '' })
  @IsString()
  name: string;

  @ApiProperty({ example: '' })
  @IsString()
  @IsOptional()
  generalLocation?: string; // vị trí tổng quan: trong nước hoặc nước ngoài

  @ApiProperty({ example: '' })
  @IsString()
  @IsOptional()
  desc?: string;

  @ApiProperty()
  @IsArray()
  @IsOptional()
  destinations: Destination[];
}
