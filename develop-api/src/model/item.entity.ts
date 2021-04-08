import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity({ name: 'hotels' })
export class Item extends BaseEntity {

  @Column({ type: 'varchar', length: 300 })
  name: string;

  @Column({ type: 'varchar', length: 300 })
  description: string;

  @Column({ type: 'smallint', default: 0 })
  isBooked: number;

  @Column({ type: 'json', default: {}, nullable: false })
  attributes: string;
}
