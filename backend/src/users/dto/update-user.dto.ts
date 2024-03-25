import { PartialType } from '@nestjs/mapped-types';

// SRC
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {}
