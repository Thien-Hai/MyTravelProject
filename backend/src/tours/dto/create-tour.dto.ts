import { IsDate, IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString, IsArray } from 'class-validator';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { IProductType } from "@shared/interfaces/product-type/product-type.interface";
import { IBrand } from "@shared/interfaces/brand/brand.interface";
import { Transform } from 'class-transformer';

export class CreateTourDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  schedule?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  detailedSchedule?: string;

  // @ApiProperty({ type: [Date], isArray: true })
  // @Transform(({ value }) => value ?? value.split(',')?.map((date) => new Date(date)))
  // @IsDate({ each: true })
  // @IsOptional()
  // departureDay?: Date[];

  @ApiProperty()
  @IsDate()
  @IsOptional()
  departureDay?: Date;

  @ApiProperty()
  @IsString()
  @IsOptional()
  departureLocation?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  transport?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  hotel?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  suitableUser?: string;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  tourTypeId?: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  destinationIds: number[];

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  price?: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  discountedPrice?: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  remainingSeats?: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  tourCode?: string;

  @ApiProperty({ type: [String] })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  imageLinks?: string[];
}
