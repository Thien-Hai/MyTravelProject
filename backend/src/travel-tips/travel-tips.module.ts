import { Module } from '@nestjs/common';
import { TravelTipsService } from './travel-tips.service';
import { TravelTipsController } from './travel-tips.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TravelTip } from './entities/travel-tip.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TravelTip])],
  controllers: [TravelTipsController],
  providers: [TravelTipsService],
  exports: [TravelTipsService],
})
export class TravelTipsModule { }
