import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

// SRC
import { User } from '../../users/entities/user.entity';
import { Tour } from '../../tours/entities/tour.entity';

@Entity()
export class Invoice {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.invoices)
  user: User;

  @ManyToOne(() => Tour, (tour) => tour.invoices)
  tour: Tour;

  @Column({ nullable: true })
  totalPrice: number;

  @Column({ nullable: true })
  isPurchased: boolean;

  @Column({ nullable: true })
  paymentMethod: string;

  @Column({ nullable: true })
  adultCount: number;

  @Column({ nullable: true })
  olderChildrenCount: number;

  @Column({ nullable: true })
  childrenCount: number;

  @Column({ nullable: true })
  babyCount: number;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;
}
