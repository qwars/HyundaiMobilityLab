import {MigrationInterface, QueryRunner} from "typeorm";

export class dbinit1617929547400 implements MigrationInterface {
    name = 'dbinit1617929547400'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "reservation" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "pid" character varying(300) NOT NULL DEFAULT '', "isActive" boolean NOT NULL DEFAULT true, "isArchived" boolean NOT NULL DEFAULT false, "createDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "createdBy" character varying(300) NOT NULL DEFAULT '', "lastChangedDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "lastChangedBy" character varying(300) NOT NULL DEFAULT '', "internalComment" character varying(300), "beginning" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "completion" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, CONSTRAINT "PK_48b1f9922368359ab88e8bfa525" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_9a54bf5b2a68f4510382ce0cf7" ON "reservation" ("pid") `);
        await queryRunner.query(`CREATE INDEX "IDX_6c54c7f1eae3044c472b959441" ON "reservation" ("beginning") `);
        await queryRunner.query(`CREATE INDEX "IDX_2e992038e1aa519bb20f5052f0" ON "reservation" ("completion") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "IDX_2e992038e1aa519bb20f5052f0"`);
        await queryRunner.query(`DROP INDEX "IDX_6c54c7f1eae3044c472b959441"`);
        await queryRunner.query(`DROP INDEX "IDX_9a54bf5b2a68f4510382ce0cf7"`);
        await queryRunner.query(`DROP TABLE "reservation"`);
    }

}
