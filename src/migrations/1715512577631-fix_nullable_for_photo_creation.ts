import { MigrationInterface, QueryRunner } from "typeorm";

export class FixNullableForPhotoCreation1715512577631 implements MigrationInterface {
    name = 'FixNullableForPhotoCreation1715512577631'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`photo\` DROP COLUMN \`image_data\``);
        await queryRunner.query(`ALTER TABLE \`photo\` CHANGE \`created_at\` \`created_at\` timestamp NULL COMMENT '파일 생성 일자'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`photo\` CHANGE \`created_at\` \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`photo\` ADD \`image_data\` datetime NOT NULL COMMENT '이미지 생성 일자'`);
    }

}
