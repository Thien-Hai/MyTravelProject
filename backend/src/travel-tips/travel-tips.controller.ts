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
import { TravelTipsService } from './travel-tips.service';
import { CreateTravelTipDto } from './dto/create-travel-tip.dto';
import { UpdateTravelTipDto } from './dto/update-travel-tip.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';


import {
  ApiCreateOperation,
  ApiDeleteOperation,
  ApiListOperation,
  ApiRetrieveOperation,
  ApiTagsAndBearer,
  ApiUpdateOperation,
} from '../../libs/core/src/docs/swagger.decorator';

@ApiTagsAndBearer('TravelTips')
// @UseGuards(JwtAuthGuard)
@Controller('travelTips')
export class TravelTipsController {
  constructor(private readonly travelTipsService: TravelTipsService) { }

  @Post()
  @ApiCreateOperation({
    summary: 'Create new travel-tip',
  })
  create(@Body() createTravelTipDto: CreateTravelTipDto) {
    return this.travelTipsService.create(createTravelTipDto);
  }

  @Get()
  @ApiListOperation()
  findAll() {
    return this.travelTipsService.findAll();
  }

  @Get(':id')
  @ApiRetrieveOperation()
  findOne(@Param('id') id: string) {
    return this.travelTipsService.findOne(+id);
  }

  @Patch(':id')
  @ApiUpdateOperation()
  update(@Param('id') id: string, @Body() updateTravelTipDto: UpdateTravelTipDto) {
    return this.travelTipsService.update(+id, updateTravelTipDto);
  }

  @Delete(':id')
  @ApiDeleteOperation()
  remove(@Param('id') id: string) {
    return this.travelTipsService.remove(+id);
  }
}
