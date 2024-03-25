import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

// SRC
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { Invoice } from './entities/invoice.entity';
import { UsersService } from '../users/users.service';
import { ToursService } from '../tours/tours.service';

@Injectable()
export class InvoicesService {
  constructor(
    @InjectRepository(Invoice)
    private readonly invoiceRepository: Repository<Invoice>,
    @Inject(forwardRef(() => UsersService))
    private usersService: UsersService,
    @Inject(forwardRef(() => ToursService))
    private toursService: ToursService,
  ) { }
  async create(createInvoiceDto: CreateInvoiceDto) {
    const user = await this.usersService.findOne(createInvoiceDto.userId);
    const tour = await this.toursService.findOne(createInvoiceDto.tourId);

    const invoice = new Invoice();
    invoice.user = user;
    invoice.tour = tour;
    invoice.totalPrice = createInvoiceDto.totalPrice;
    invoice.isPurchased = false;
    invoice.paymentMethod = createInvoiceDto.paymentMethod;
    invoice.adultCount = createInvoiceDto.adultCount;
    invoice.olderChildrenCount = createInvoiceDto.olderChildrenCount;
    invoice.childrenCount = createInvoiceDto.childrenCount;
    invoice.babyCount = createInvoiceDto.babyCount;
    return await this.invoiceRepository.save(invoice);
  }

  findAll() {
    return this.invoiceRepository.find({
      relations: {
        user: true,
        tour: true,
      },
    });
  }
  findAllInvoicesByUserId(userId: number) {
    return this.invoiceRepository.find({
      where: {
        user: {
          id: userId,
        },
      },
      relations: {
        user: true,
        tour: true,
      },
    });
  }

  findOne(id: number) {
    return this.invoiceRepository.findOne({
      where: {
        id,
      },
      relations: {
        user: true,
        tour: true,
      },
    });
  }

  update(id: number, updateInvoiceDto: UpdateInvoiceDto) {
    return this.invoiceRepository.update(id, updateInvoiceDto);
  }

  remove(id: number) {
    return this.invoiceRepository.delete(id);
  }
}
