import { MigrationInterface, QueryRunner } from "typeorm";

export class FixPhotoForeignKey1715752299586 implements MigrationInterface {
    name = 'FixPhotoForeignKey1715752299586'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`photo\` DROP FOREIGN KEY \`FK_045600141e2ae5f96c95c92a764\``);
        await queryRunner.query(`ALTER TABLE \`photo\` DROP COLUMN \`folderId\``);
        await queryRunner.query(`ALTER TABLE \`photo\` DROP COLUMN \`group_id\``);
        await queryRunner.query(`ALTER TABLE \`photo\` ADD \`folder_id\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`photo\` ADD CONSTRAINT \`FK_c35a3ac0b51e2437b9a545018b0\` FOREIGN KEY (\`folder_id\`) REFERENCES \`folder\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`photo\` DROP FOREIGN KEY \`FK_c35a3ac0b51e2437b9a545018b0\``);
        await queryRunner.query(`ALTER TABLE \`photo\` DROP COLUMN \`folder_id\``);
        await queryRunner.query(`ALTER TABLE \`photo\` ADD \`group_id\` int NOT NULL COMMENT '이미지가 업로드된 그룹 아이디'`);
        await queryRunner.query(`ALTER TABLE \`photo\` ADD \`folderId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`photo\` ADD CONSTRAINT \`FK_045600141e2ae5f96c95c92a764\` FOREIGN KEY (\`folderId\`) REFERENCES \`folder\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
