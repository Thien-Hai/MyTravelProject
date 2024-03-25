import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// SRC
import { CreateDestinationDto } from './dto/create-destination.dto';
import { UpdateDestinationDto } from './dto/update-destination.dto';
import { Destination } from './entities/destination.entity';

@Injectable()
export class DestinationsService {
  constructor(
    @InjectRepository(Destination)
    private readonly destinationRepository: Repository<Destination>,
  ) { }
  create(createDestinationDto: CreateDestinationDto) {
    return this.destinationRepository.save(createDestinationDto);
  }

  findAll() {
    return this.destinationRepository.find({
      relations: {
        tours: true,
        travelTips: true,
      },
    });
  }

  async findOne(id: number) {
    const destination = await this.destinationRepository.findOne({
      where: { id },
      relations: {
        tours: true,
        travelTips: true,
      },
    });
    if (!destination) {
      throw new HttpException('Not found destination', HttpStatus.NOT_FOUND);
    }
    return destination;
  }

  // async getDestinationByName(name: string) {
  //   const tour = await this.destinationRepository.findOneBy({ name });
  //   if (!tour) {
  //     throw new HttpException('Not found destination', HttpStatus.NOT_FOUND);
  //   }
  //   return tour;
  // }

  update(id: number, updateDestinationDto: UpdateDestinationDto) {
    return this.destinationRepository.update(id, updateDestinationDto);
  }

  remove(id: number) {
    return this.destinationRepository.delete(id);
  }

  getDestinationByTourType() {

  }
}
