import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// SRC
import { CreateTravelTipDto } from './dto/create-travel-tip.dto';
import { UpdateTravelTipDto } from './dto/update-travel-tip.dto';
import { TravelTip } from './entities/travel-tip.entity';

@Injectable()
export class TravelTipsService {
  constructor(
    @InjectRepository(TravelTip)
    private readonly travelTipRepository: Repository<TravelTip>,
  ) { }
  create(createTravelTipDto: CreateTravelTipDto) {
    return this.travelTipRepository.save(createTravelTipDto);
  }

  findAll() {
    return this.travelTipRepository.find({
      relations: {
        destination: true,
      },
    });
  }

  async findOne(id: number) {
    const travelTip = await this.travelTipRepository.findOne({
      where: { id },
      relations: {
        destination: true,
      },
    });
    if (!travelTip) {
      throw new HttpException('Not found travel-tip', HttpStatus.NOT_FOUND);
    }
    return travelTip;
  }

  update(id: number, updateTravelTipDto: UpdateTravelTipDto) {
    return this.travelTipRepository.update(id, updateTravelTipDto);
  }

  remove(id: number) {
    return this.travelTipRepository.delete(id);
  }
}
