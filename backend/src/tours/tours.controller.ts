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

import { ToursService } from './tours.service';
import { CreateTourDto } from './dto/create-tour.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

// CORE
import { UpdateTourDto } from './dto/update-tour.dto';
import { ApiDeleteOperation, ApiTagsAndBearer } from "@core/docs/swagger.decorator";

@ApiTagsAndBearer('Tours')
@Controller('tours')
export class ToursController {
  constructor(private readonly toursService: ToursService) { }

  @Post('create-new-tour')
  // @UseGuards(JwtAuthGuard)
  create(@Body() createTourDto: CreateTourDto) {
    return this.toursService.create(createTourDto);
  }

  @Get('get-all-tours')
  findAll() {
    return this.toursService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.toursService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTourDto: UpdateTourDto,
  ) {
    return this.toursService.update(+id, updateTourDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.toursService.remove(+id);
  }
}
