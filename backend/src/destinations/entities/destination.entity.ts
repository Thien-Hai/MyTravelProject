import {
  Column,
  CreateDateColumn,
  Entity, JoinTable, ManyToMany, OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Tour } from '../../tours/entities/tour.entity';
import { TourType } from '../../tour-types/entities/tour-type.entity';
import { TravelTip } from '../../travel-tips/entities/travel-tip.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Destination {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column()
  @ApiProperty()
  name: string;

  @Column({ nullable: true })
  @ApiProperty()
  location: string;

  @Column({ default: '', nullable: true })
  @ApiProperty()
  desc: string;

  @Column({ nullable: true })
  @ApiProperty()
  mainImageLink: string;

  @ManyToMany(() => TourType, tourType => tourType.destinations)
  tourTypes: TourType[];

  @ManyToMany(() => Tour, (tour) => tour.destinations)
  tours: Tour[];

  @OneToMany(() => TravelTip, (travelTip) => travelTip.destination)
  travelTips: TravelTip[];

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;
}
