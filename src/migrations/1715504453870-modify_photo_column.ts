import { MigrationInterface, QueryRunner } from "typeorm";

export class ModifyPhotoColumn1715504453870 implements MigrationInterface {
    name = 'ModifyPhotoColumn1715504453870'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`photo\` DROP COLUMN \`image_data\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`photo\` ADD \`image_data\` datetime NOT NULL COMMENT '이미지 생성 일자'`);
    }

}
