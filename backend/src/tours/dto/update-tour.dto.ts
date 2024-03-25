import { PartialType } from '@nestjs/mapped-types';

// SRC
import { CreateTourDto } from './create-tour.dto';

export class UpdateTourDto extends PartialType(CreateTourDto) { }
