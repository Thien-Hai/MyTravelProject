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
import { DestinationsService } from './destinations.service';
import { CreateDestinationDto } from './dto/create-destination.dto';
import { UpdateDestinationDto } from './dto/update-destination.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';


import {
  ApiCreateOperation,
  ApiDeleteOperation,
  ApiListOperation,
  ApiRetrieveOperation,
  ApiTagsAndBearer,
  ApiUpdateOperation,
} from '../../libs/core/src/docs/swagger.decorator';

@ApiTagsAndBearer('Destinations')
// @UseGuards(JwtAuthGuard)
@Controller('destinations')
export class DestinationsController {
  constructor(private readonly destinationsService: DestinationsService) { }

  @Post()
  @ApiCreateOperation({
    summary: 'Create new destination',
  })
  create(@Body() createDestinationDto: CreateDestinationDto) {
    return this.destinationsService.create(createDestinationDto);
  }

  @Get()
  @ApiListOperation()
  findAll() {
    return this.destinationsService.findAll();
  }

  @Get(':id')
  @ApiRetrieveOperation()
  findOne(@Param('id') id: string) {
    return this.destinationsService.findOne(+id);
  }

  @Patch(':id')
  @ApiUpdateOperation()
  update(@Param('id') id: string, @Body() updateDestinationDto: UpdateDestinationDto) {
    return this.destinationsService.update(+id, updateDestinationDto);
  }

  @Delete(':id')
  @ApiDeleteOperation()
  remove(@Param('id') id: string) {
    return this.destinationsService.remove(+id);
  }

  // @Get()
  // @ApiRetrieveOperation({
  //   summary: 'List destination by tour types'
  // })
  // getDestinationByTourType(@Param('id') id: string) {
  //   return this.destinationsService.getDestinationByTourType();
  // }
}
