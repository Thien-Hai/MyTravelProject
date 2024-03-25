import { Module, forwardRef } from '@nestjs/common';

import { ToursController } from './tours.controller';
import { Tour } from './entities/tour.entity';
// import { CartsModule } from '../carts/carts.module';
// import { CartItemsModule } from '../cart-items/cart-items.module';
import { TourTypesModule } from '../tour-types/tour-types.module';
import { ToursService } from './tours.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { DestinationsModule } from "../destinations/destinations.module";
import { InvoicesModule } from "../invoices/invoices.module";
import { TourType } from "../tour-types/entities/tour-type.entity";
import { Destination } from "../destinations/entities/destination.entity";
import { Invoice } from "../invoices/entities/invoice.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([Tour, TourType, Destination, Invoice]),
    forwardRef(() => InvoicesModule),
    TourTypesModule,
    DestinationsModule
  ],
  controllers: [ToursController],
  providers: [ToursService],
  exports: [ToursService],
})
export class ToursModule { }
