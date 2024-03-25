import { PartialType } from '@nestjs/mapped-types';

// SRC
import { CreateInvoiceDto } from './create-invoice.dto';

export class UpdateInvoiceDto extends PartialType(CreateInvoiceDto) {}
