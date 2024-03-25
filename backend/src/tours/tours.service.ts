import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable, NotFoundException,
} from '@nestjs/common';

import { Repository } from 'typeorm';

import { CreateTourDto } from './dto/create-tour.dto';
import { Tour } from './entities/tour.entity';
import { TourTypesService } from '../tour-types/tour-types.service';
import { UpdateTourDto } from './dto/update-tour.dto';
import { InjectRepository } from "@nestjs/typeorm";
import { TourType } from "../tour-types/entities/tour-type.entity";
import { Destination } from "../destinations/entities/destination.entity";
import { DestinationsService } from '../destinations/destinations.service';

@Injectable()
export class ToursService {
  constructor(
    @InjectRepository(Tour)
    private readonly tourRepository: Repository<Tour>,
    @InjectRepository(Destination)
    private readonly destinationRepository: Repository<Destination>,
    @InjectRepository(TourType)
    private readonly tourTypeRepository: Repository<TourType>,
    private readonly destinationService: DestinationsService,
  ) { }
  async create(createTourDto: CreateTourDto) {
    if (createTourDto.tourCode) {
      const checkTour = await this.tourRepository.findOneBy({
        tourCode: createTourDto.tourCode,
      });

      if (checkTour) {
        throw new HttpException('Tour already exists', HttpStatus.CONFLICT);
      }
    }
    const maxIdTour = await this.tourRepository
      .createQueryBuilder('tour')
      .select('MAX(tour.id)', 'maxId')
      .getRawOne();

    const newTourId = maxIdTour.maxId ? maxIdTour.maxId + 1 : 1;

    const tour = new Tour();
    tour.id = newTourId;
    tour.name = createTourDto.name;
    tour.tourCode = createTourDto.tourCode;
    tour.departureDay = createTourDto.departureDay;
    tour.price = createTourDto.price;
    tour.discountedPrice = createTourDto.discountedPrice;
    tour.departureLocation = createTourDto.departureLocation;
    tour.schedule = createTourDto.schedule;
    tour.detailedSchedule = createTourDto.detailedSchedule;
    tour.remainingSeats = createTourDto.remainingSeats;
    tour.transport = createTourDto.transport;
    tour.hotel = createTourDto.hotel;
    tour.suitableUser = createTourDto.suitableUser;
    tour.tourType = await this.tourTypeRepository.findOne({ where: { id: createTourDto.tourTypeId } });
    await this.tourRepository.save(tour);

    if (createTourDto.destinationIds && createTourDto.destinationIds.length > 0) {
      for (const destinationId of createTourDto.destinationIds) {
        const destination = await this.destinationService.findOne(destinationId);
        if (destination) {
          await this.tourTypeRepository
            .createQueryBuilder()
            .relation(Tour, 'destinations')
            .of(tour)
            .add(destination);
        }
      }
    }
  }

  findAll() {
    return this.tourRepository.find({
      relations: {
        tourType: true,
        destinations: true,
        travelTip: true,
      },
    });
  }

  async findOne(id: number) {
    const tour = await this.tourRepository.findOne({
      where: { id },
      relations: {
        tourType: true,
        destinations: true,
      },
    });
    if (!tour) {
      throw new HttpException('Not found tour', HttpStatus.NOT_FOUND);
    }
    return tour;
  }

  async update(
    id: number,
    updateTourDto: UpdateTourDto,
  ) {
    const tour = await this.tourRepository.findOne({
      where: { id },
    });
    if (!tour) {
      throw new HttpException('Not found tour', HttpStatus.NOT_FOUND);
    }

    tour.name = updateTourDto.name;
    tour.price = updateTourDto.price;
    tour.discountedPrice = updateTourDto.discountedPrice;
    tour.tourCode = updateTourDto.tourCode;
    tour.schedule = updateTourDto.schedule;
    tour.detailedSchedule = updateTourDto.detailedSchedule;
    tour.departureDay = updateTourDto.departureDay;
    tour.departureLocation = updateTourDto.departureLocation;
    tour.transport = updateTourDto.transport;
    tour.hotel = updateTourDto.hotel;
    tour.remainingSeats = updateTourDto.remainingSeats;
    tour.suitableUser = updateTourDto.suitableUser;
    tour.tourType = await this.tourTypeRepository.findOne({ where: { id: updateTourDto.tourTypeId } });

    return this.tourRepository.save(tour);
  }

  async remove(id: number) {
    const tour = await this.tourRepository.findOneBy({ id });
    return await this.tourRepository.delete({ id });
  }
}
