import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";

export class CreateInvoiceDto {
  @ApiProperty()
  @IsNumber()
  userId?: number;

  @ApiProperty()
  @IsNumber()
  tourId?: number;

  @ApiProperty()
  @IsNumber()
  totalPrice?: number;

  @ApiProperty()
  @IsBoolean()
  isPurchased?: boolean;

  @ApiProperty()
  @IsString()
  paymentMethod?: string;

  @ApiProperty()
  @IsNumber()
  adultCount?: number;

  @ApiProperty()
  @IsNumber()
  olderChildrenCount?: number;

  @ApiProperty()
  @IsNumber()
  childrenCount?: number;

  @ApiProperty()
  @IsNumber()
  babyCount?: number;
}
