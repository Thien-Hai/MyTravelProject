import {
  Column,
  CreateDateColumn,
  Entity, JoinTable, ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

// SRC
import { Destination } from '../../destinations/entities/destination.entity';
import { Tour } from '../../tours/entities/tour.entity';

@Entity()
export class TourType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ nullable: true })
  generalLocation: string;

  @Column()
  desc: string;

  @ManyToMany(() => Destination, destination => destination.tourTypes, { cascade: true })
  @JoinTable()
  destinations: Destination[];

  @OneToMany(() => Tour, (tour) => tour.tourType)
  tours: Tour[];

  @CreateDateColumn({ type: 'timestamptz', nullable: true })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', nullable: true })
  updatedAt: Date;
}
