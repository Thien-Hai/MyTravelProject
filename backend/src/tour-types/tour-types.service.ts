import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { Repository } from 'typeorm';

// SRC
import { CreateTourTypeDto } from './dto/create-tour-type.dto';
import { UpdateTourTypeDto } from './dto/update-tour-type.dto';
import { TourType } from './entities/tour-type.entity';
import { DestinationsService } from '../destinations/destinations.service';
import { InjectRepository } from "@nestjs/typeorm";
import { Destination } from 'src/destinations/entities/destination.entity';
import { STATUS_CODES } from 'http';

@Injectable()
export class TourTypesService {
  constructor(
    @InjectRepository(TourType)
    private readonly repository: Repository<TourType>,
    private readonly destinationService: DestinationsService,
  ) { }
  async create(createTourTypeDto: CreateTourTypeDto) {
    try {
      const tourType = new TourType();
      tourType.name = createTourTypeDto.name.toLowerCase();
      tourType.generalLocation = createTourTypeDto.generalLocation;
      tourType.desc = createTourTypeDto.desc;
      await this.repository.save(tourType);

      if (createTourTypeDto.destinations && createTourTypeDto.destinations.length > 0) {
        for (const destinations of createTourTypeDto.destinations) {
          const destination = await this.destinationService.findOne(destinations.id);
          if (destination) {

            await this.repository
              .createQueryBuilder()
              .relation(TourType, 'destinations')
              .of(tourType)
              .add(destination);
          }
        }
      }
    } catch (e) {
      throw new HttpException(e.message, 400);
    }
  }

  findAll() {
    return this.repository.find({
      relations: {
        destinations: true,
        tours: {
          destinations: true,
        },
      },
    });
  }

  async getTourTypeByName(name: string) {
    const tourType = await this.repository.findOneBy({
      name: name
    });
    if (!tourType) {
      throw new HttpException('Not found tour type', HttpStatus.NOT_FOUND);
    }
    return tourType;
  }

  async findOne(id: number) {
    const tourType = await this.repository.findOne({
      where: {
        id,
      },
      relations: {
        destinations: true,
        tours: {
          destinations: true,
        },
      },
    });
    if (!tourType) {
      throw new HttpException('Not found tour type', HttpStatus.NOT_FOUND);
    }
    return tourType;
  }

  update(id: number, updateTourTypeDto: UpdateTourTypeDto) {
    return this.repository.save({ id: id, ...updateTourTypeDto });
  }

  remove(id: number) {
    return this.repository.delete(id);
  }
}
