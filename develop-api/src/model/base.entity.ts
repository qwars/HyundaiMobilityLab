import { PrimaryGeneratedColumn, Index, Column, UpdateDateColumn, CreateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

export abstract class BaseEntity {
    
    @ApiProperty({ description: 'UUID element table'})
    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @ApiProperty({ description: 'Parent UUID element table'})
    @Index()
    @Column({ type: 'varchar', length: 300, default: '' })
    pid: string;

    @ApiProperty({ description: 'Is active element table'})
    @Column({ type: 'boolean', default: true })
    isActive: boolean;

    @ApiProperty({ description: 'Is archived element table'})
    @Column({ type: 'boolean', default: false })
    isArchived: boolean;

    @ApiProperty({ description: 'Date create element element table'})
    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    createDateTime: Date;

    @ApiProperty({ description: 'UUID user created element in the table'})
    @Column({ type: 'varchar', length: 300, default: '' })
    createdBy: string;

    @ApiProperty({ description: 'Date changed element in the table'})
    @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    lastChangedDateTime: Date;

    @ApiProperty({ description: 'UUID user updated element in the table'})
    @Column({ type: 'varchar', length: 300, default: '' })
    lastChangedBy: string;

    @ApiProperty({ description: 'Comments for element in the table'})
    @Column({ type: 'json', nullable: true })
    internalComment: string | null;

}
