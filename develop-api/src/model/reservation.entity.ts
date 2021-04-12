import { Entity, Index, UpdateDateColumn, CreateDateColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'reservation' })
export class Reservation extends BaseEntity {

    @ApiProperty({ description: 'Date beginning for reservation element in the table'})
    @Index()
    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    beginning: Date;

    @ApiProperty({ description: 'Date completion for reservation element in the table'})
    @Index()
    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    completion: Date;

}
