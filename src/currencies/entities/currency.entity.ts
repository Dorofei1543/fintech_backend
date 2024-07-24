import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Currency {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ type: 'float' })
  price: number;

  @Column({ type: 'bytea' })
  icon: Buffer;

  @Column({ type: 'float' })
  priceChange: number;
}
