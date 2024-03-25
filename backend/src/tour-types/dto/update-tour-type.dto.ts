import { PartialType } from '@nestjs/swagger';

// SRC
import { CreateTourTypeDto } from './create-tour-type.dto';

export class UpdateTourTypeDto extends PartialType(CreateTourTypeDto) { }
