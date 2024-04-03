import { MigrationInterface, QueryRunner } from "typeorm";

export class AddColumnUsername1712047829697 implements MigrationInterface {
    name = 'AddColumnUsername1712047829697'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`username\` varchar(255) NULL COMMENT '닉네임'`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`email\` \`email\` varchar(20) NOT NULL COMMENT '이메일'`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`password\` \`password\` varchar(255) NULL COMMENT '비밀번호, SNS의 경우 Null'`);
        await queryRunner.query(`ALTER TABLE \`group\` CHANGE \`name\` \`name\` varchar(20) NOT NULL COMMENT '그룹 이름'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`group\` CHANGE \`name\` \`name\` varchar(20) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`password\` \`password\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`email\` \`email\` varchar(20) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`username\``);
    }

}
