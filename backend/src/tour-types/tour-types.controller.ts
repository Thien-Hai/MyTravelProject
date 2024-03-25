import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';

// SRC
import { TourTypesService } from './tour-types.service';
import { CreateTourTypeDto } from './dto/create-tour-type.dto';
import { UpdateTourTypeDto } from './dto/update-tour-type.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiTagsAndBearer } from "@core/docs/swagger.decorator";

// CORE
@ApiTagsAndBearer('Tour Types')

@Controller('tour-types')
export class TourTypesController {
  constructor(private readonly tourTypesService: TourTypesService) { }

  @Post('create-new-tour-type')
  create(@Body() createTourTypeDto: CreateTourTypeDto) {
    return this.tourTypesService.create(createTourTypeDto);
  }

  @Get('get-all-tour-types')
  findAll() {
    return this.tourTypesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tourTypesService.findOne(+id);
  }

  @UseGuards()
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTourTypeDto: UpdateTourTypeDto,
  ) {
    return this.tourTypesService.update(+id, updateTourTypeDto);
  }

  @UseGuards()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tourTypesService.remove(+id);
  }
}
