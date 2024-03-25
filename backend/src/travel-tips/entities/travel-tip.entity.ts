import {
  Column,
  CreateDateColumn,
  Entity, JoinTable, ManyToMany, ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Tour } from '../../tours/entities/tour.entity';
import { TourType } from '../../tour-types/entities/tour-type.entity';
import { Destination } from '../../destinations/entities/destination.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class TravelTip {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  @ApiProperty()
  mainImageLink: string;

  @Column({ nullable: true })
  @ApiProperty()
  category: string;

  @Column({ default: '', nullable: true })
  @ApiProperty()
  desc: string;

  @Column({ nullable: true })
  detail: string;

  @ManyToOne(() => Destination, (destination) => destination.travelTips)
  destination: Destination;

  @ManyToMany(() => Tour)
  tours: Tour[];

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;
}
