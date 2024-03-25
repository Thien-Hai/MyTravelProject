import {
  Column,
  Entity,
  OneToMany,
  ManyToMany,
  JoinTable,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn, PrimaryColumn,
} from 'typeorm';

import { TourType } from '../../tour-types/entities/tour-type.entity';
import { Destination } from "../../destinations/entities/destination.entity";
import { TravelTip } from "../../travel-tips/entities/travel-tip.entity";
import { Invoice } from '../../invoices/entities/invoice.entity';

@Entity()
export class Tour {
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  price: number;

  @Column({ nullable: true })
  discountedPrice: number;

  @Column({ nullable: true })
  tourCode: string;

  @Column({ nullable: true })
  schedule: string;

  @Column({ nullable: true })
  detailedSchedule: string;

  @Column({ type: 'timestamptz', nullable: true })
  departureDay: Date;

  @Column({ nullable: true })
  departureLocation: string;

  @Column({ nullable: true })
  transport: string;

  @Column({ nullable: true })
  hotel: string;

  @Column({ nullable: true })
  suitableUser: string;

  @Column({ nullable: true })
  remainingSeats: number;

  @Column('text', { array: true, nullable: true })
  imageLinks: string[];

  @OneToMany(() => Invoice, (invoice) => invoice.tour)
  invoices: Invoice[];

  @ManyToOne(() => TourType, (tourType) => tourType.tours)
  tourType: TourType;

  @ManyToMany(() => Destination, (destination) => destination.tours)
  @JoinTable()
  destinations: Destination[];

  @ManyToMany(() => TravelTip, (travelTip) => travelTip.tours)
  @JoinTable()
  travelTip: TravelTip[];

  @CreateDateColumn({ type: 'timestamptz', nullable: true })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', nullable: true })
  updatedAt: Date;
}
