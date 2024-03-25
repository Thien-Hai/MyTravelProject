import { Module } from '@nestjs/common';


// SRC
import { TourTypesService } from './tour-types.service';
import { TourTypesController } from './tour-types.controller';
import { TourType } from './entities/tour-type.entity';
import { DestinationsModule } from '../destinations/destinations.module';
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [TypeOrmModule.forFeature([TourType]), DestinationsModule],
  controllers: [TourTypesController],
  providers: [TourTypesService],
  exports: [TourTypesService],
})
export class TourTypesModule { }
