import { Entity, Column, Index, UpdateDateColumn, CreateDateColumn } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity({ name: 'reservation' })
export class Reservation extends BaseEntity {

    @Index()
    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    beginning: Date;

    @Index()
    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    completion: Date;

}
