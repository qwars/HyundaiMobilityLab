import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'hotels' })
export class Item extends BaseEntity {

  @ApiProperty({ description: 'Position number of storeys element in the table'})
  @Column({ type: 'smallint', default: 0 })
  storeys: number;
    
  @ApiProperty({ description: 'Name element in the table'})
  @Column({ type: 'varchar', length: 300 })
  name: string;

  @ApiProperty({ description: 'Description for element in the table'})
  @Column({ type: 'varchar', length: 300, default: '' })
  description: string;

  @ApiProperty({ description: 'Is booked element in the table'})
  @Column({ type: 'smallint', default: 0 })
  isBooked: number;

  @ApiProperty({ description: 'Attributes for element in the table'})
  @Column({ type: 'json', default: [], nullable: false })
  attributes: string;
    
  @ApiProperty({ description: 'Points plan-scheme for element in the table'})
  @Column({ type: 'json', default: [], nullable: false })
  points: string;

  @ApiProperty({ description: 'Plan-Scheme for element in the table'})
  @Column({ type: 'text', default: ''  })
  plan: string;

}
