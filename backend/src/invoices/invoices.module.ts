import { Module, forwardRef } from '@nestjs/common';
import { InvoicesService } from './invoices.service';
import { InvoicesController } from './invoices.controller';
import { Invoice } from './entities/invoice.entity';

import { UsersModule } from '../users/users.module';
import { ToursModule } from '../tours/tours.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Invoice]),
  forwardRef(() => UsersModule),
  forwardRef(() => ToursModule),
  ],
  controllers: [InvoicesController],
  providers: [InvoicesService],
})
export class InvoicesModule { }
